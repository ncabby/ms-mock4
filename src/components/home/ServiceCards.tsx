import Link from "next/link";
import homeData from "../../../content/pages/home.json";

export function ServiceCards() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold text-navy-900">
          {homeData.about.title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-navy-600">
          {homeData.about.text}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {homeData.serviceCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-navy-900">{card.title}</h3>
              <p className="mt-3 flex-1 text-navy-600">{card.description}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
