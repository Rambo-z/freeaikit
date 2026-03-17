import type { Metadata } from "next";
import RegexTesterClient from "./RegexTesterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Regex Tester - Free Online Regular Expression Tester",
  description:
    "Test and debug regular expressions online. Real-time match highlighting, groups, flags support. Free regex tester with no signup.",
  keywords: [
    "regex tester",
    "regular expression tester",
    "online regex",
    "regex debugger",
    "regex online free",
  ],
  openGraph: {
    title: "Regex Tester - Free Online Regular Expression Tester",
    description:
      "Test and debug regular expressions online. Real-time match highlighting and groups.",
    url: "https://freeaikit.app/regex-tester",
  },
};

export default function RegexTesterPage() {
  return (
    <>
      <ToolJsonLd name="Regex Tester" description="Test and debug regular expressions online. Real-time match highlighting, groups, flags support. Free regex tester with no signup." slug="regex-tester" />
      <RegexTesterClient />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <RelatedTools currentSlug="regex-tester" />
      </div>
    </>
  );
}
