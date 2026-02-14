import Image from "next/image";
import Link from "next/link";

interface SolutionLink {
  text: string;
  href: string;
}

interface BulletItem {
  text: string;
  subBullets?: string[];
  links?: SolutionLink[];
}

interface Subsection {
  heading: string;
  text?: string;
  image?: string;
  bullets?: string[];
  links?: SolutionLink[];
}

interface Solution {
  id: string;
  title: string;
  icon: string;
  description: string;
  image?: string;
  bullets?: (string | BulletItem)[];
  bulletIntro?: string;
  subsections?: Subsection[];
  additionalText?: string;
  closingText?: string;
  closingParagraphs?: string[];
  links?: SolutionLink[];
}

interface SolutionBlockProps {
  solution: Solution;
  index: number;
}

function renderLink(link: SolutionLink) {
  const isExternal = link.href.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-500 underline hover:text-accent-600"
      >
        {link.text}
      </a>
    );
  }
  return (
    <Link href={link.href} className="text-accent-500 underline hover:text-accent-600">
      {link.text}
    </Link>
  );
}

export default function SolutionBlock({ solution, index }: SolutionBlockProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={solution.id}
      className={`py-12 ${index > 0 ? "border-t border-navy-200" : ""}`}
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        {/* Icon column */}
        <div
          className={`flex justify-center ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <Image
            src={solution.icon}
            alt={solution.title}
            width={200}
            height={200}
            className="h-auto w-40 lg:w-48"
          />
        </div>

        {/* Text column */}
        <div className={isEven ? "lg:order-2" : "lg:order-1"}>
          <h2 className="mb-4 text-3xl font-bold text-navy-900">
            {solution.title}
          </h2>

          {solution.description && (
            <p className="mb-4 leading-relaxed text-navy-700">
              {solution.description}
            </p>
          )}

          {/* Solution-level image */}
          {solution.image && (
            <div className="my-6">
              <Image
                src={solution.image}
                alt={solution.title}
                width={600}
                height={300}
                className="h-auto w-full rounded"
              />
            </div>
          )}

          {/* Additional text (appears before bullets in some solutions) */}
          {solution.additionalText && (
            <p className="mb-4 leading-relaxed text-navy-700">
              {solution.additionalText}
            </p>
          )}

          {/* Bullet intro text */}
          {solution.bulletIntro && (
            <p className="mb-3 leading-relaxed text-navy-700">
              {solution.bulletIntro}
            </p>
          )}

          {/* Bullets — can be strings or objects with sub-bullets */}
          {solution.bullets && solution.bullets.length > 0 && (
            <ul className="mb-4 space-y-2 pl-5">
              {solution.bullets.map((bullet, i) => {
                if (typeof bullet === "string") {
                  return (
                    <li
                      key={i}
                      className="list-disc leading-relaxed text-navy-700"
                    >
                      {bullet}
                    </li>
                  );
                }
                return (
                  <li key={i} className="list-disc leading-relaxed text-navy-700">
                    <span>{bullet.text}</span>
                    {bullet.subBullets && bullet.subBullets.length > 0 && (
                      <ul className="mt-1 space-y-1 pl-5">
                        {bullet.subBullets.map((sub, j) => (
                          <li
                            key={j}
                            className="list-[circle] leading-relaxed text-navy-600"
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                    {bullet.links && bullet.links.length > 0 && (
                      <div className="mt-1 space-x-4">
                        {bullet.links.map((link, k) => (
                          <span key={k}>{renderLink(link)}</span>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {/* Subsections */}
          {solution.subsections &&
            solution.subsections.map((sub, i) => (
              <div key={i} className="mb-6">
                <h3 className="mb-2 text-xl font-semibold text-navy-800">
                  {sub.heading}
                </h3>
                {sub.text && (
                  <p className="mb-3 leading-relaxed text-navy-700">
                    {sub.text}
                  </p>
                )}
                {sub.image && (
                  <div className="my-4">
                    <Image
                      src={sub.image}
                      alt={sub.heading}
                      width={500}
                      height={250}
                      className="h-auto w-full rounded"
                    />
                  </div>
                )}
                {sub.bullets && sub.bullets.length > 0 && (
                  <ul className="space-y-1 pl-5">
                    {sub.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="list-disc leading-relaxed text-navy-700"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {sub.links && sub.links.length > 0 && (
                  <div className="mt-2 space-x-4">
                    {sub.links.map((link, k) => (
                      <span key={k}>{renderLink(link)}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}

          {/* Closing text */}
          {solution.closingText && (
            <p className="mb-4 font-medium leading-relaxed text-navy-800">
              {solution.closingText}
            </p>
          )}

          {/* Closing paragraphs */}
          {solution.closingParagraphs &&
            solution.closingParagraphs.map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed text-navy-700">
                {para}
              </p>
            ))}

          {/* Solution-level links */}
          {solution.links && solution.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {solution.links.map((link, i) => (
                <span key={i}>{renderLink(link)}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
