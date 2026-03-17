import type { Metadata } from "next";
import PasswordGeneratorClient from "./PasswordGeneratorClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Password Generator - Free & Secure | FreeAIKit",
  description:
    "Generate strong, random passwords instantly. Choose length, uppercase, lowercase, numbers and symbols. Uses cryptographically secure randomness. Free, no data stored.",
  keywords: ["password generator", "random password generator", "strong password", "secure password generator", "online password generator", "password maker"],
  openGraph: {
    title: "Password Generator - Free & Secure Online",
    description: "Generate strong random passwords with custom options. Uses crypto.getRandomValues() — truly random.",
    url: "https://freeaikit.app/password-generator",
  },
};

export default function PasswordGeneratorPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Password Generator" description="Generate strong, random passwords instantly. Choose length, uppercase, lowercase, numbers and symbols. Uses cryptographically secure randomness. Free, no data stored." slug="password-generator" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Password Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Generate strong, random passwords instantly. Customize length and
          character types. Uses cryptographically secure randomness.
        </p>
      </div>
      <PasswordGeneratorClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "Is this password generator truly random?",
            a: "Yes. This tool uses window.crypto.getRandomValues(), a cryptographically secure pseudo-random number generator (CSPRNG) built into every modern browser. It's the same standard used by password managers.",
          },
          {
            q: "How long should my password be?",
            a: "Security experts recommend at least 16 characters for most accounts. For critical accounts (banking, email), use 20+ characters with a mix of all character types.",
          },
          {
            q: "Are the passwords saved anywhere?",
            a: "No. Passwords are generated in your browser using JavaScript and are never sent to any server. This page has no backend — everything runs locally.",
          },
          {
            q: "What is the 'Exclude ambiguous' option?",
            a: "Ambiguous characters (0, O, l, 1, I) look similar in many fonts and can be misread. Enabling this option removes them, which is useful if you need to type or read the password manually.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="password-generator" />
    </div>
  );
}
