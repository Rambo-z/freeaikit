interface FaqItem {
  question: string;
  answer: string;
}

interface ItemListItem {
  position: number;
  name: string;
  url: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface ToolJsonLdProps {
  name: string;
  description: string;
  slug: string;
  faqItems?: FaqItem[];
  itemListItems?: ItemListItem[];
  howToSteps?: HowToStep[];
}

export default function ToolJsonLd({
  name,
  description,
  slug,
  faqItems,
  itemListItems,
  howToSteps,
}: ToolJsonLdProps) {
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

  const faqSchema =
    faqItems && faqItems.length > 0
      ? {
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
        }
      : null;

  const itemListSchema =
    itemListItems && itemListItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: itemListItems.map((item) => ({
            "@type": "ListItem",
            position: item.position,
            name: item.name,
            url: item.url,
          })),
        }
      : null;

  const howToSchema =
    howToSteps && howToSteps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to Use ${name}`,
          description,
          step: howToSteps.map((step, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: step.name,
            text: step.text,
          })),
        }
      : null;

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
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
    </>
  );
}
