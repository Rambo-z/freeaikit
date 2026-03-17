import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | FreeAIKit",
  description:
    "FreeAIKit terms of service. Free browser-based tools provided as-is. No account required.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Last updated: March 17, 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using FreeAIKit (<Link href="/" className="text-blue-600 hover:underline">freeaikit.app</Link>), you agree to be bound by these Terms of
              Service. If you do not agree with any part of these terms, please
              do not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Description of Service
            </h2>
            <p>
              FreeAIKit provides a collection of free, browser-based tools for
              image processing, PDF manipulation, developer utilities, and
              other tasks. All tools run entirely in your browser using
              client-side technologies. No account or registration is required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Free to Use
            </h2>
            <p>
              All tools on FreeAIKit are provided free of charge. There are no
              hidden fees, premium tiers, or usage limits. We reserve the right
              to introduce paid features in the future, but existing free tools
              will remain free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              No Warranty
            </h2>
            <p>
              All tools and services are provided <strong>&quot;as is&quot;</strong> and{" "}
              <strong>&quot;as available&quot;</strong> without warranty of any kind, express
              or implied. We do not guarantee that:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>The tools will meet your specific requirements.</li>
              <li>
                The tools will be uninterrupted, timely, secure, or error-free.
              </li>
              <li>
                The results obtained from using the tools will be accurate or
                reliable.
              </li>
              <li>
                Any errors in the tools will be corrected.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              User Responsibilities
            </h2>
            <p>When using FreeAIKit, you agree that:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                You are solely responsible for any files and content you process
                using our tools.
              </li>
              <li>
                You will not use the tools for any illegal, harmful, or
                unauthorized purpose.
              </li>
              <li>
                You have the necessary rights and permissions for any content
                you process.
              </li>
              <li>
                You are responsible for maintaining backups of your original
                files before processing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, FreeAIKit and its
              operators shall not be liable for any direct, indirect,
              incidental, special, consequential, or punitive damages arising
              from your use of, or inability to use, the tools and services. This
              includes but is not limited to damages for loss of data, loss of
              profits, or business interruption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Intellectual Property
            </h2>
            <p>
              The FreeAIKit website, its design, and branding are the property
              of FreeAIKit. The open-source libraries used by our tools retain
              their respective licenses. Your content remains yours -- we claim
              no ownership over any files you process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Modifications to Service
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part
              of the service at any time without prior notice. We are not liable
              to you or any third party for any modification, suspension, or
              discontinuation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Changes to These Terms
            </h2>
            <p>
              We may update these Terms of Service from time to time. Changes
              will be posted on this page with an updated date. Continued use
              of FreeAIKit after changes constitutes acceptance of the revised
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with
              applicable laws. Any disputes arising from these terms or your use
              of FreeAIKit shall be resolved through good-faith negotiation
              first.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at{" "}
              <a
                href="mailto:hello@freeaikit.app"
                className="text-blue-600 hover:underline"
              >
                hello@freeaikit.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
