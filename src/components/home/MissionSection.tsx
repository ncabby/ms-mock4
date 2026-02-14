import homeData from "../../../content/pages/home.json";

export function MissionSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ISO 9001:2015 Column */}
          <div className="rounded-lg bg-navy-900 p-8 text-white">
            <h2 className="text-2xl font-bold">{homeData.iso.title}</h2>
            {homeData.iso.text.map((paragraph, index) => (
              <p key={index} className="mt-4 leading-relaxed text-navy-200">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Mission Column */}
          <div className="rounded-lg border-l-4 border-accent-500 bg-navy-50 p-8">
            <h2 className="text-2xl font-bold text-navy-900">
              {homeData.mission.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-700">
              {homeData.mission.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
