import type { Metadata } from "next";
import TextToSpeechClient from "./TextToSpeechClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Text to Speech Online Free - TTS Tool | FreeAIKit",
  description:
    "Convert text to speech online for free. Listen to any text read aloud with adjustable speed, pitch, and voice. No signup, no upload, runs in your browser.",
  keywords: [
    "text to speech",
    "tts online",
    "text to speech free",
    "read text aloud",
    "tts generator",
  ],
  openGraph: {
    title: "Text to Speech Online Free - TTS Tool",
    description:
      "Convert text to speech online for free. Adjustable speed, pitch, and voice. Runs entirely in your browser.",
    url: "https://freeaikit.app/text-to-speech",
  },
  alternates: {
    canonical: "https://freeaikit.app/text-to-speech",
  },
};

export default function TextToSpeechPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Text to Speech Online Free"
        description="Convert text to speech online for free. Listen to any text read aloud with adjustable speed, pitch, and voice. No signup, no upload, runs in your browser."
        slug="text-to-speech"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Text to Speech Online Free
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert any text to speech instantly. Adjust voice, speed, and pitch.
          Free, private, runs entirely in your browser.
        </p>
      </div>
      <TextToSpeechClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "Is this really free?",
            a: "Yes, it uses your browser's built-in speech engine. There are no hidden costs, no signup required, and no usage limits.",
          },
          {
            q: "Which languages are supported?",
            a: "It depends on your browser and operating system. Most modern browsers support 20+ languages including English, Spanish, French, German, Chinese, Japanese, and more.",
          },
          {
            q: "Can I download the audio?",
            a: "Browser TTS doesn't support direct download. For downloadable audio, try dedicated TTS services.",
          },
          {
            q: "Does my text get sent to a server?",
            a: "No. Everything runs locally in your browser. Your text never leaves your device.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="text-to-speech" />
    </div>
  );
}
