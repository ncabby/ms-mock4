import Link from "next/link";
import complianceData from "../../../content/pages/corporate-compliance.json";

export default function CorporateCompliancePage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-10 text-3xl font-bold text-navy-900 sm:text-4xl">
          {complianceData.pageTitle}
        </h1>

        <div className="space-y-4">
          {complianceData.documents.map((doc, i) => {
            const isExternal = doc.href.startsWith("http");
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded border border-navy-200 bg-white p-4 transition-colors hover:bg-navy-50"
              >
                <svg
                  className="h-5 w-5 shrink-0 text-accent-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {isExternal ? (
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent-500 hover:text-accent-600"
                  >
                    {doc.text}
                  </a>
                ) : (
                  <Link
                    href={doc.href}
                    className="font-medium text-accent-500 hover:text-accent-600"
                  >
                    {doc.text}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
