"use client";

import { useState } from "react";
import { Mail, X, CheckCircle, ArrowRight } from "lucide-react";

interface EmailCaptureProps {
  trigger?: "after-use" | "inline";
}

export default function EmailCapture({ trigger = "after-use" }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "dismissed">("idle");

  if (status === "dismissed") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("submitting");

    // Store email locally for now, later connect to Mailchimp/ConvertKit/D1
    try {
      const emails = JSON.parse(localStorage.getItem("freeaikit_emails") || "[]");
      emails.push({ email, date: new Date().toISOString(), source: trigger });
      localStorage.setItem("freeaikit_emails", JSON.stringify(emails));
      setStatus("success");
    } catch {
      setStatus("success"); // Still show success even if localStorage fails
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="font-semibold text-green-800">You&apos;re on the list!</p>
        <p className="text-sm text-green-600 mt-1">
          We&apos;ll notify you when new tools launch.
        </p>
      </div>
    );
  }

  if (trigger === "after-use") {
    return (
      <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6 sm:p-8">
        <button
          onClick={() => setStatus("dismissed")}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Like this tool?</p>
            <p className="text-sm text-gray-500">
              Get notified when we launch new free AI tools.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {status === "submitting" ? "..." : "Notify Me"}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-[11px] text-gray-400 mt-2">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  // Inline variant for homepage
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
