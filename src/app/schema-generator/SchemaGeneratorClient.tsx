"use client";

import { useState, useCallback, useMemo } from "react";
import { Copy, Check, Plus, Trash2 } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);
  return (
    <button onClick={handleCopy} disabled={!text}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy Code"}
    </button>
  );
}

type SchemaType = "Article" | "Product" | "FAQ" | "LocalBusiness" | "Organization" | "Person" | "Recipe" | "Event" | "BreadcrumbList";

const SCHEMA_TYPES: { value: SchemaType; label: string; desc: string }[] = [
  { value: "Article", label: "Article", desc: "Blog posts, news articles" },
  { value: "Product", label: "Product", desc: "E-commerce product listings" },
  { value: "FAQ", label: "FAQ Page", desc: "Frequently asked questions" },
  { value: "LocalBusiness", label: "Local Business", desc: "Physical business with address" },
  { value: "Organization", label: "Organization", desc: "Company or organization" },
  { value: "Person", label: "Person", desc: "Individual person profile" },
  { value: "Recipe", label: "Recipe", desc: "Cooking recipes" },
  { value: "Event", label: "Event", desc: "Events with dates and location" },
  { value: "BreadcrumbList", label: "Breadcrumb", desc: "Site navigation breadcrumbs" },
];

interface FaqItem { question: string; answer: string }
interface BreadcrumbItem { name: string; url: string }

function Input({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 block mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
}

export default function SchemaGeneratorClient() {
  const [schemaType, setSchemaType] = useState<SchemaType>("Article");

  // Shared fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  // Article
  const [authorName, setAuthorName] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [dateModified, setDateModified] = useState("");
  const [publisher, setPublisher] = useState("");

  // Product
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [availability, setAvailability] = useState("InStock");
  const [brand, setBrand] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [reviewCount, setReviewCount] = useState("");

  // LocalBusiness / Organization
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  // Person
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");

  // Recipe
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [calories, setCalories] = useState("");
  const [ingredients, setIngredients] = useState("");

  // Event
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");

  // FAQ
  const [faqItems, setFaqItems] = useState<FaqItem[]>([{ question: "", answer: "" }]);

  // Breadcrumb
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([{ name: "", url: "" }]);

  const addFaq = () => setFaqItems([...faqItems, { question: "", answer: "" }]);
  const removeFaq = (i: number) => setFaqItems(faqItems.filter((_, idx) => idx !== i));
  const updateFaq = (i: number, field: "question" | "answer", value: string) => {
    const items = [...faqItems];
    items[i][field] = value;
    setFaqItems(items);
  };

  const addBreadcrumb = () => setBreadcrumbs([...breadcrumbs, { name: "", url: "" }]);
  const removeBreadcrumb = (i: number) => setBreadcrumbs(breadcrumbs.filter((_, idx) => idx !== i));
  const updateBreadcrumb = (i: number, field: "name" | "url", value: string) => {
    const items = [...breadcrumbs];
    items[i][field] = value;
    setBreadcrumbs(items);
  };

  const jsonLd = useMemo(() => {
    const base: Record<string, unknown> = { "@context": "https://schema.org" };

    switch (schemaType) {
      case "Article":
        Object.assign(base, {
          "@type": "Article",
          ...(name && { headline: name }),
          ...(description && { description }),
          ...(image && { image }),
          ...(url && { url }),
          ...(authorName && { author: { "@type": "Person", name: authorName } }),
          ...(publisher && { publisher: { "@type": "Organization", name: publisher } }),
          ...(datePublished && { datePublished }),
          ...(dateModified && { dateModified }),
        });
        break;

      case "Product":
        Object.assign(base, {
          "@type": "Product",
          ...(name && { name }),
          ...(description && { description }),
          ...(image && { image }),
          ...(brand && { brand: { "@type": "Brand", name: brand } }),
          ...(price && {
            offers: {
              "@type": "Offer",
              price,
              priceCurrency: currency,
              availability: `https://schema.org/${availability}`,
              ...(url && { url }),
            },
          }),
          ...(ratingValue && reviewCount && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue,
              reviewCount,
            },
          }),
        });
        break;

      case "FAQ": {
        const validFaqs = faqItems.filter((f) => f.question && f.answer);
        Object.assign(base, {
          "@type": "FAQPage",
          mainEntity: validFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        });
        break;
      }

      case "LocalBusiness":
        Object.assign(base, {
          "@type": "LocalBusiness",
          ...(name && { name }),
          ...(description && { description }),
          ...(image && { image }),
          ...(url && { url }),
          ...(phone && { telephone: phone }),
          ...((street || city) && {
            address: {
              "@type": "PostalAddress",
              ...(street && { streetAddress: street }),
              ...(city && { addressLocality: city }),
              ...(state && { addressRegion: state }),
              ...(zip && { postalCode: zip }),
              ...(country && { addressCountry: country }),
            },
          }),
        });
        break;

      case "Organization":
        Object.assign(base, {
          "@type": "Organization",
          ...(name && { name }),
          ...(description && { description }),
          ...(url && { url }),
          ...(image && { logo: image }),
          ...(phone && { telephone: phone }),
        });
        break;

      case "Person":
        Object.assign(base, {
          "@type": "Person",
          ...(name && { name }),
          ...(description && { description }),
          ...(url && { url }),
          ...(image && { image }),
          ...(jobTitle && { jobTitle }),
          ...(email && { email }),
        });
        break;

      case "Recipe":
        Object.assign(base, {
          "@type": "Recipe",
          ...(name && { name }),
          ...(description && { description }),
          ...(image && { image }),
          ...(authorName && { author: { "@type": "Person", name: authorName } }),
          ...(prepTime && { prepTime: `PT${prepTime}M` }),
          ...(cookTime && { cookTime: `PT${cookTime}M` }),
          ...(servings && { recipeYield: servings }),
          ...(calories && { nutrition: { "@type": "NutritionInformation", calories: `${calories} calories` } }),
          ...(ingredients && { recipeIngredient: ingredients.split("\n").filter(Boolean) }),
        });
        break;

      case "Event":
        Object.assign(base, {
          "@type": "Event",
          ...(name && { name }),
          ...(description && { description }),
          ...(image && { image }),
          ...(url && { url }),
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
          ...(location && {
            location: { "@type": "Place", name: location },
          }),
        });
        break;

      case "BreadcrumbList": {
        const validCrumbs = breadcrumbs.filter((b) => b.name);
        Object.assign(base, {
          "@type": "BreadcrumbList",
          itemListElement: validCrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            ...(b.url && { item: b.url }),
          })),
        });
        break;
      }
    }

    return JSON.stringify(base, null, 2);
  }, [schemaType, name, description, url, image, authorName, datePublished, dateModified, publisher, price, currency, availability, brand, ratingValue, reviewCount, phone, street, city, state, zip, country, jobTitle, email, prepTime, cookTime, servings, calories, ingredients, startDate, endDate, location, faqItems, breadcrumbs]);

  const scriptTag = `<script type="application/ld+json">\n${jsonLd}\n</script>`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Type selector + Form */}
        <div className="space-y-4">
          {/* Type selector */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-700">Schema Type</h2>
            <div className="grid grid-cols-3 gap-2">
              {SCHEMA_TYPES.map((t) => (
                <button key={t.value} onClick={() => setSchemaType(t.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${schemaType === t.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                  <div>{t.label}</div>
                  <div className="font-normal text-[10px] text-gray-400 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-700">Fields</h2>

            {/* Common fields (not for FAQ/Breadcrumb) */}
            {schemaType !== "FAQ" && schemaType !== "BreadcrumbList" && (
              <>
                <Input label={schemaType === "Article" ? "Headline" : "Name"} value={name} onChange={setName} placeholder="Enter name or title" />
                <Input label="Description" value={description} onChange={setDescription} placeholder="Short description" />
                {schemaType !== "Person" && (
                  <Input label="URL" value={url} onChange={setUrl} placeholder="https://example.com/page" type="url" />
                )}
                <Input label={schemaType === "Organization" ? "Logo URL" : "Image URL"} value={image} onChange={setImage} placeholder="https://example.com/image.jpg" type="url" />
              </>
            )}

            {/* Article fields */}
            {schemaType === "Article" && (
              <>
                <Input label="Author Name" value={authorName} onChange={setAuthorName} placeholder="John Doe" />
                <Input label="Publisher Name" value={publisher} onChange={setPublisher} placeholder="Company Name" />
                <Input label="Date Published" value={datePublished} onChange={setDatePublished} placeholder="2026-01-15" type="date" />
                <Input label="Date Modified" value={dateModified} onChange={setDateModified} placeholder="2026-03-17" type="date" />
              </>
            )}

            {/* Product fields */}
            {schemaType === "Product" && (
              <>
                <Input label="Brand" value={brand} onChange={setBrand} placeholder="Brand Name" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Price" value={price} onChange={setPrice} placeholder="29.99" />
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Currency</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option>
                      <option value="CNY">CNY</option><option value="JPY">JPY</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Availability</label>
                  <select value={availability} onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="InStock">In Stock</option><option value="OutOfStock">Out of Stock</option>
                    <option value="PreOrder">Pre-Order</option><option value="LimitedAvailability">Limited</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Rating (1-5)" value={ratingValue} onChange={setRatingValue} placeholder="4.5" />
                  <Input label="Review Count" value={reviewCount} onChange={setReviewCount} placeholder="128" />
                </div>
              </>
            )}

            {/* LocalBusiness / Organization */}
            {(schemaType === "LocalBusiness" || schemaType === "Organization") && (
              <Input label="Phone" value={phone} onChange={setPhone} placeholder="+1-555-123-4567" type="tel" />
            )}
            {schemaType === "LocalBusiness" && (
              <>
                <Input label="Street Address" value={street} onChange={setStreet} placeholder="123 Main St" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="City" value={city} onChange={setCity} placeholder="New York" />
                  <Input label="State / Region" value={state} onChange={setState} placeholder="NY" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Zip / Postal Code" value={zip} onChange={setZip} placeholder="10001" />
                  <Input label="Country" value={country} onChange={setCountry} placeholder="US" />
                </div>
              </>
            )}

            {/* Person */}
            {schemaType === "Person" && (
              <>
                <Input label="URL" value={url} onChange={setUrl} placeholder="https://example.com" type="url" />
                <Input label="Job Title" value={jobTitle} onChange={setJobTitle} placeholder="Software Engineer" />
                <Input label="Email" value={email} onChange={setEmail} placeholder="john@example.com" type="email" />
              </>
            )}

            {/* Recipe */}
            {schemaType === "Recipe" && (
              <>
                <Input label="Author" value={authorName} onChange={setAuthorName} placeholder="Chef Name" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Prep Time (minutes)" value={prepTime} onChange={setPrepTime} placeholder="15" />
                  <Input label="Cook Time (minutes)" value={cookTime} onChange={setCookTime} placeholder="30" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Servings" value={servings} onChange={setServings} placeholder="4 servings" />
                  <Input label="Calories" value={calories} onChange={setCalories} placeholder="350" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Ingredients (one per line)</label>
                  <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)}
                    placeholder={"2 cups flour\n1 cup sugar\n3 eggs"}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
              </>
            )}

            {/* Event */}
            {schemaType === "Event" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Start Date" value={startDate} onChange={setStartDate} type="datetime-local" />
                  <Input label="End Date" value={endDate} onChange={setEndDate} type="datetime-local" />
                </div>
                <Input label="Location / Venue" value={location} onChange={setLocation} placeholder="Convention Center" />
              </>
            )}

            {/* FAQ */}
            {schemaType === "FAQ" && (
              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <div key={i} className="p-3 border border-gray-100 rounded-xl space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400">Q&A #{i + 1}</span>
                      {faqItems.length > 1 && (
                        <button onClick={() => removeFaq(i)} className="text-gray-400 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <input value={item.question} onChange={(e) => updateFaq(i, "question", e.target.value)}
                      placeholder="Question" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <textarea value={item.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)}
                      placeholder="Answer" rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  </div>
                ))}
                <button onClick={addFaq} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add Question
                </button>
              </div>
            )}

            {/* Breadcrumb */}
            {schemaType === "BreadcrumbList" && (
              <div className="space-y-3">
                {breadcrumbs.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 shrink-0 w-5">{i + 1}.</span>
                    <input value={item.name} onChange={(e) => updateBreadcrumb(i, "name", e.target.value)}
                      placeholder="Label" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input value={item.url} onChange={(e) => updateBreadcrumb(i, "url", e.target.value)}
                      placeholder="https://..." className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {breadcrumbs.length > 1 && (
                      <button onClick={() => removeBreadcrumb(i)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={addBreadcrumb} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add Breadcrumb
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Output */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">JSON-LD Output</h2>
              <CopyButton text={scriptTag} />
            </div>
            <pre className="px-4 py-3 bg-gray-50 rounded-xl font-mono text-xs text-gray-700 overflow-auto max-h-[500px] whitespace-pre">{scriptTag}</pre>
            <p className="text-xs text-gray-400">
              Copy this code and paste it into your page&apos;s &lt;head&gt; or &lt;body&gt; section.
            </p>
          </div>

          {/* JSON only (for testing) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">JSON Only (for validation)</h2>
              <CopyButton text={jsonLd} />
            </div>
            <pre className="px-4 py-3 bg-blue-50 rounded-xl font-mono text-xs text-gray-700 overflow-auto max-h-[300px] whitespace-pre">{jsonLd}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
