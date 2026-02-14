import homeData from "../../../content/pages/home.json";

export function AboutSection() {
  return (
    <section className="bg-navy-50 py-16">
      <div className="mx-auto max-w-4xl px-4">
        {homeData.aboutExtended.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="mt-6 text-lg leading-relaxed text-navy-700 first:mt-0"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
