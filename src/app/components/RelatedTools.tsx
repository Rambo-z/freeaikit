import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ALL_TOOLS, CATEGORY_LABELS, type ToolInfo } from "./tools-data";

interface RelatedToolsProps {
  currentSlug: string;
  count?: number;
}

export default function RelatedTools({ currentSlug, count = 4 }: RelatedToolsProps) {
  const current = ALL_TOOLS.find((t) => t.slug === currentSlug);
  if (!current) return null;

  // Same category, exclude self, take first N (deterministic order)
  const related = ALL_TOOLS.filter(
    (t) => t.category === current.category && t.slug !== currentSlug
  ).slice(0, count);

  if (related.length === 0) return null;

  const categoryLabel = CATEGORY_LABELS[current.category] || "Tools";

  return (
    <section className="mt-16 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-6">
        More {categoryLabel} You May Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((tool: ToolInfo) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {tool.description}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 mt-1 shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
}
