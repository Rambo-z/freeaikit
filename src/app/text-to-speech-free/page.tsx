import type { Metadata } from "next";
import TextToSpeechClient from "../text-to-speech/TextToSpeechClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Text to Speech Online Free - TTS Reader | FreeAIKit",
  description: "Convert text to speech online for free. Natural-sounding TTS voices in 50+ languages. No signup, no limits, runs in your browser.",
  keywords: ["text to speech free", "text to speech online", "tts free", "tts online free", "read text aloud", "text to speech converter", "free tts reader"],
  openGraph: { title: "Text to Speech Online Free", description: "Convert text to speech for free. 50+ languages, natural voices. No signup.", url: "https://freeaikit.app/text-to-speech-free" },
  alternates: { canonical: "https://freeaikit.app/text-to-speech-free" },
};

export default function TextToSpeechFreePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Text to Speech Free" description="Convert text to speech online for free. Natural voices in 50+ languages. No signup." slug="text-to-speech-free" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Text to Speech Online Free</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">Convert any text to natural-sounding speech. 50+ languages, multiple voices. 100% free, no signup required.</p>
      </div>
      <TextToSpeechClient />
      <RelatedTools currentSlug="text-to-speech" />
    </div>
  );
}
