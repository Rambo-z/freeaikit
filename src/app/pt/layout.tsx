import type { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "content-language": "pt",
  },
};

export default function PortugueseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="pt">{children}</div>;
}
