import Image from "next/image";
import cyberData from "../../../content/pages/cybersecurity-news.json";

interface CyberSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  closingText?: string;
  image?: string;
  links?: { text: string; href: string }[];
}

export default function CybersecurityNewsPage() {
  const sections: CyberSection[] = cyberData.sections;

  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-10 flex items-center gap-4">
          <Image
            src={cyberData.icon}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16"
          />
          <h1 className="text-4xl font-bold text-navy-900">
            {cyberData.pageTitle}
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

            {section.bullets && section.bullets.length > 0 && (
              <ul className="mb-4 space-y-2 pl-5">
                {section.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="list-disc leading-relaxed text-navy-700"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {section.closingText && (
              <p className="mb-4 font-medium leading-relaxed text-navy-800">
                {section.closingText}
              </p>
            )}

            {section.image && (
              <div className="my-6">
                <Image
                  src={section.image}
                  alt={section.title}
                  width={800}
                  height={400}
                  className="h-auto w-full rounded"
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
