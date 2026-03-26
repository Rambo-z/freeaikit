import type { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "content-language": "es",
  },
};

export default function SpanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="es">{children}</div>;
}
