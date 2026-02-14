import Image from "next/image";
import cmmcData from "../../../content/pages/cmmc-2-0.json";

interface CmmcSection {
  title: string;
  paragraphs?: string[];
  image?: string;
  links?: { text: string; href: string }[];
}

export default function Cmmc20Page() {
  const sections: CmmcSection[] = cmmcData.sections;

  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-10 flex items-center gap-4">
          <Image
            src={cmmcData.icon}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16"
          />
          <h1 className="text-4xl font-bold text-navy-900">
            {cmmcData.pageTitle}
          </h1>
        </div>

        {sections.map((section, i) => (
          <section
            key={i}
            className={`pb-10 ${
              i > 0 ? "border-t border-navy-200 pt-10" : ""
            }`}
          >
            <h2 className="mb-4 text-2xl font-bold text-navy-900">
              {section.title}
            </h2>

            {section.paragraphs?.map((para, j) => (
              <p key={j} className="mb-4 leading-relaxed text-navy-700">
                {para}
              </p>
            ))}

            {section.image && (
              <div className="my-6">
                <Image
                  src={section.image}
                  alt={section.title}
                  width={400}
                  height={200}
                  className="h-auto w-64 rounded"
                />
              </div>
            )}

            {section.links && section.links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-4">
                {section.links.map((link, k) => (
                  <a
                    key={k}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-500 underline hover:text-accent-600"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
