"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

export default function TextToSpeechClient() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load voices
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const available = speechSynthesis.getVoices();
      if (available.length > 0) {
        setVoices(available);
        // Default to first English voice or first available
        const englishVoice = available.find((v) => v.lang.startsWith("en"));
        setSelectedVoice((englishVoice || available[0]).name);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
      speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = useCallback(() => {
    trackToolEvent('text-to-speech', 'process');
    if (!text.trim()) return;

    if (status === "paused") {
      speechSynthesis.resume();
      setStatus("playing");
      return;
    }

    // Cancel any existing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = speed;
    utterance.pitch = pitch;

    utterance.onend = () => setStatus("idle");
    utterance.onerror = () => setStatus("idle");

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setStatus("playing");
  }, [text, voices, selectedVoice, speed, pitch, status]);

  const handlePause = useCallback(() => {
    speechSynthesis.pause();
    setStatus("paused");
  }, []);

  const handleStop = useCallback(() => {
    speechSynthesis.cancel();
    setStatus("idle");
  }, []);

  if (!supported) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <p className="text-gray-600">
          Sorry, your browser does not support the Web Speech API. Please try
          Chrome, Edge, or Safari.
        </p>
      </div>
    );
  }

  // Group voices by language for better UX
  const groupedVoices = voices.reduce(
    (acc, voice) => {
      const lang = voice.lang.split("-")[0];
      if (!acc[lang]) acc[lang] = [];
      acc[lang].push(voice);
      return acc;
    },
    {} as Record<string, SpeechSynthesisVoice[]>
  );

  return (
    <div className="space-y-5">
      {/* Main input card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        {/* Textarea */}
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            rows={8}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-400">
              {text.length.toLocaleString()} characters
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {/* Voice selector */}
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">
              Voice
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              disabled={status !== "idle"}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {Object.entries(groupedVoices)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([lang, langVoices]) => (
                  <optgroup key={lang} label={lang.toUpperCase()}>
                    {langVoices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </optgroup>
                ))}
            </select>
          </div>

          {/* Speed slider */}
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">
              Speed: {speed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={status !== "idle"}
              className="w-full accent-blue-600 disabled:opacity-50"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>0.5x</span>
              <span>2x</span>
            </div>
          </div>

          {/* Pitch slider */}
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              disabled={status !== "idle"}
              className="w-full accent-blue-600 disabled:opacity-50"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>0.5</span>
              <span>2</span>
            </div>
          </div>
        </div>

        {/* Playback buttons */}
        <div className="flex items-center gap-3">
          {status === "playing" ? (
            <button
              onClick={handlePause}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
            >
              <Pause className="w-4 h-4" />
              Pause
            </button>
          ) : (
            <button
              onClick={handlePlay}
              disabled={!text.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-500/25"
            >
              <Play className="w-4 h-4" />
              {status === "paused" ? "Resume" : "Play"}
            </button>
          )}

          {(status === "playing" || status === "paused") && (
            <button
              onClick={handleStop}
              className="inline-flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-sm font-semibold hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <Square className="w-4 h-4" />
              Stop
            </button>
          )}

          {status === "playing" && (
            <div className="flex items-center gap-1.5 ml-2">
              <Volume2 className="w-4 h-4 text-blue-500 animate-pulse" />
              <span className="text-xs text-gray-500">Speaking...</span>
            </div>
          )}
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          No upload to server
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          100% free
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Works offline
        </span>
      </div>

      {/* Browser note */}
      <p className="text-center text-xs text-gray-400">
        Powered by your browser&apos;s built-in speech engine
      </p>
    </div>
  );
}
