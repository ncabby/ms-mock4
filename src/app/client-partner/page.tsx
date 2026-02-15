import PageHero from "@/components/shared/PageHero";
import LogoGrid from "@/components/shared/LogoGrid";
import clientsData from "../../../content/pages/clients.json";

export default function ClientPartnerPage() {
  return (
    <main>
      <PageHero
        title={clientsData.pageTitle}
        backgroundImage={clientsData.heroImage}
      />

      {/* Clients Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-4 text-2xl font-bold text-navy-900 sm:text-3xl">
          {clientsData.clientsSection.title}
        </h2>
        <p className="mb-2 text-lg leading-relaxed text-navy-700">
          {clientsData.clientsSection.intro}
        </p>
        <p className="mb-8 leading-relaxed text-navy-600">
          {clientsData.clientsSection.description}
        </p>
        <LogoGrid logos={clientsData.clientsSection.clients} />
      </section>

      {/* Partners Section */}
      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-2xl font-bold text-navy-900 sm:text-3xl">
            {clientsData.partnersSection.title}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-navy-700">
            {clientsData.partnersSection.intro}
          </p>
          <LogoGrid logos={clientsData.partnersSection.partners} />
        </div>
      </section>
    </main>
  );
}
