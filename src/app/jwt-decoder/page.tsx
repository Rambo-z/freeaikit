import type { Metadata } from "next";
import JwtDecoderClient from "./JwtDecoderClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "JWT Decoder - Free Online | FreeAIKit",
  description:
    "Decode and inspect JSON Web Tokens (JWT) online. View header, payload, and signature. Check expiration. Free, instant, runs in your browser.",
  keywords: ["jwt decoder", "jwt parser", "decode jwt", "json web token", "jwt online", "jwt debugger", "jwt viewer", "jwt inspect"],
  openGraph: {
    title: "JWT Decoder - Free Online",
    description: "Decode and inspect JWT tokens instantly. Free and private — runs in your browser.",
    url: "https://freeaikit.app/jwt-decoder",
  },
};

export default function JwtDecoderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="JWT Decoder" description="Decode and inspect JSON Web Tokens (JWT) online. View header, payload, and signature. Check expiration. Free, instant, runs in your browser." slug="jwt-decoder" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          JWT Decoder
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Decode JSON Web Tokens to inspect header, payload, and signature.
          Check expiration and claims. Free, instant, in-browser.
        </p>
      </div>
      <JwtDecoderClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What is a JWT?",
            a: "A JSON Web Token (JWT) is a compact, URL-safe token format used for authentication and information exchange. It consists of three Base64-encoded parts separated by dots: header, payload, and signature.",
          },
          {
            q: "Is it safe to paste my JWT here?",
            a: "Yes! This tool runs entirely in your browser. Your JWT is never sent to any server. However, never share JWTs publicly as they may contain sensitive claims.",
          },
          {
            q: "Can this tool verify JWT signatures?",
            a: "This tool decodes and displays JWT contents but does not verify signatures, as that requires the secret key or public key which should remain on your server.",
          },
          {
            q: "What are common JWT claims?",
            a: "Common claims include: iss (issuer), sub (subject), aud (audience), exp (expiration), nbf (not before), iat (issued at), and jti (JWT ID). Custom claims can contain any application-specific data.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="jwt-decoder" />
    </div>
  );
}
