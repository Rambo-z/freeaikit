import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | FreeAIKit",
  description:
    "FreeAIKit privacy policy. All tools run in your browser. No files are uploaded to our servers. No personal data collected.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Last updated: March 17, 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Overview
            </h2>
            <p>
              FreeAIKit (<Link href="/" className="text-blue-600 hover:underline">freeaikit.app</Link>) is committed to protecting your privacy. This policy explains what
              data we collect and how we use it. The short version: we collect
              almost nothing, and your files never leave your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Your Files Stay on Your Device
            </h2>
            <p>
              All FreeAIKit tools run entirely in your browser using
              client-side technologies such as JavaScript and WebAssembly (WASM).
              When you use any of our tools:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>No files are uploaded</strong> to our servers or any
                third-party servers.
              </li>
              <li>
                All processing happens locally on your device, in your browser.
              </li>
              <li>
                We have no access to the files you process. We cannot see, store,
                or share them.
              </li>
              <li>
                Once you close or refresh the page, processed data is gone.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Personal Data
            </h2>
            <p>
              We do not collect any personal information. FreeAIKit does not
              require you to create an account, log in, or provide your name,
              email address, or any other personally identifiable information to
              use our tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Analytics
            </h2>
            <p>
              We use Google Analytics to collect anonymous usage statistics such
              as page views, approximate geographic region, browser type, and
              device type. This helps us understand which tools are popular and
              how to improve the site.
            </p>
            <p className="mt-3">
              Google Analytics may set cookies on your browser. You can opt out
              of Google Analytics by using the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Cookies
            </h2>
            <p>
              FreeAIKit itself does not set any cookies. The only cookies that
              may be present on this site are those set by Google Analytics for
              anonymous usage tracking. No advertising cookies or tracking pixels
              are used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Third-Party Services
            </h2>
            <p>
              The only third-party service we use is Google Analytics. We do not
              integrate with any social media platforms, advertising networks, or
              other third-party data collectors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Children&apos;s Privacy
            </h2>
            <p>
              Our services are available to users of all ages. Since we do not
              collect any personal information, there are no special concerns
              regarding children&apos;s data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated date. Since we do not
              collect personal data, we have no way to notify you directly of
              changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
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
