import type { Metadata } from "next";
import RegexTesterClient from "./RegexTesterClient";

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
  return <RegexTesterClient />;
}
