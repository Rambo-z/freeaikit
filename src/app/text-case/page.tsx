import type { Metadata } from "next";
import TextCaseClient from "./TextCaseClient";

export const metadata: Metadata = {
  title: "Text Case Converter - Free Online | FreeAIKit",
  description:
    "Convert text between UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case and more. Instant, free, runs in your browser.",
  keywords: ["text case converter", "camelcase converter", "snake case converter", "kebab case", "title case", "uppercase lowercase", "pascalcase", "text transform"],
  openGraph: {
    title: "Text Case Converter - Free Online",
    description: "Convert text between all common cases: camelCase, snake_case, Title Case, and more.",
    url: "https://freeaikit.app/text-case",
  },
};

export default function TextCasePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Text Case Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Instantly convert text between UPPER CASE, lower case, Title Case,
          camelCase, PascalCase, snake_case, kebab-case and more. One click to
          copy any result.
        </p>
      </div>
      <TextCaseClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What is camelCase?",
            a: "camelCase joins words with no spaces, capitalizing the first letter of each word except the first: helloWorld, myVariableName. Widely used in JavaScript and Java.",
          },
          {
            q: "What is snake_case?",
            a: "snake_case uses underscores to separate words, all lowercase: hello_world, my_variable_name. Common in Python, Ruby, and database column names.",
          },
          {
            q: "What is kebab-case?",
            a: "kebab-case uses hyphens to separate words, all lowercase: hello-world, my-class-name. Standard for CSS class names and URL slugs.",
          },
          {
            q: "What is PascalCase?",
            a: "PascalCase (also called UpperCamelCase) capitalizes the first letter of every word: HelloWorld, MyClassName. Common for class names in most programming languages.",
          },
          {
            q: "What is SCREAMING_SNAKE_CASE?",
            a: "SCREAMING_SNAKE_CASE is snake_case in all capitals: HELLO_WORLD, MAX_RETRIES. Typically used for constants and environment variable names.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
