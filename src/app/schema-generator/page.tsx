import type { Metadata } from "next";
import SchemaGeneratorClient from "./SchemaGeneratorClient";

export const metadata: Metadata = {
  title: "Schema Markup Generator (JSON-LD) - Free Online | FreeAIKit",
  description:
    "Generate structured data markup (JSON-LD) for Google rich results. Support for Article, Product, FAQ, LocalBusiness, Recipe, and more. Free, instant.",
  keywords: ["schema markup generator", "json-ld generator", "structured data", "schema.org", "rich snippets", "google rich results", "seo schema", "structured data generator"],
  openGraph: {
    title: "Schema Markup Generator (JSON-LD) - Free Online",
    description: "Generate JSON-LD structured data for Google rich results. Free and instant.",
    url: "https://freeaikit.app/schema-generator",
  },
};

export default function SchemaGeneratorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Schema Markup Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Generate JSON-LD structured data for Google rich results.
          Choose a schema type, fill in the fields, and copy the code.
        </p>
      </div>
      <SchemaGeneratorClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What is Schema Markup?",
            a: "Schema markup (structured data) is code you add to your HTML that helps search engines understand your content. It can enable rich results like star ratings, FAQ dropdowns, recipe cards, and product prices in Google search.",
          },
          {
            q: "What is JSON-LD?",
            a: "JSON-LD (JavaScript Object Notation for Linked Data) is Google's recommended format for structured data. It's a <script> tag added to your page's <head> or <body> that contains the schema in JSON format.",
          },
          {
            q: "Which schema types are supported?",
            a: "This tool supports the most common types: Article, Product, FAQ, LocalBusiness, Organization, Person, Recipe, Event, and BreadcrumbList. These cover the majority of rich result opportunities.",
          },
          {
            q: "How do I test my structured data?",
            a: "After generating the code, paste it into Google's Rich Results Test (search.google.com/test/rich-results) or Schema Markup Validator (validator.schema.org) to verify it's valid and eligible for rich results.",
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
