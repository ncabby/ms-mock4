import Image from "next/image";
import Link from "next/link";
import homeData from "../../../content/pages/home.json";

export function NewsCards() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {homeData.newsCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-navy-900">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-navy-600">{card.description}</p>
                <Link
                  href={card.href}
                  className="mt-4 inline-flex items-center font-semibold text-accent-500 hover:text-accent-600"
                >
                  Find out more
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
