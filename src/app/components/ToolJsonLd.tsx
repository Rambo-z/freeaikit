interface FaqItem {
  question: string;
  answer: string;
}

interface ToolJsonLdProps {
  name: string;
  description: string;
  slug: string;
  faqItems?: FaqItem[];
}

export default function ToolJsonLd({ name, description, slug, faqItems }: ToolJsonLdProps) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `https://freeaikit.app/${slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "FreeAIKit",
      url: "https://freeaikit.app",
    },
  };

  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
