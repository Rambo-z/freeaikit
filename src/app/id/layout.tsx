import type { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "content-language": "id",
  },
};

export default function IndonesianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="id">{children}</div>;
}
