import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import DataTable from "@/components/shared/DataTable";
import contractsData from "../../../content/pages/contracts.json";

export default function ContractsPage() {
  const { seaport, gsa, bottomLinks } = contractsData;

  // Build task orders table
  const taskOrderHeaders = ["Solicitation", "TO Number"];
  const taskOrderRows = seaport.taskOrders.orders.map((o) => [
    o.solicitation,
    o.toNumber,
  ]);

  return (
    <main>
      <PageHero
        title={contractsData.pageTitle}
        backgroundImage={contractsData.heroImage}
      />

      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* SeaPort-NxG Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-navy-900 sm:text-3xl">
            {seaport.title}
          </h2>
          {seaport.description.map((para, i) => (
            <p key={i} className="mb-4 leading-relaxed text-navy-700">
              {para}
            </p>
          ))}

          {/* Team subsection */}
          <div className="mt-10">
            <h3 className="mb-4 text-2xl font-semibold text-navy-800">
              {seaport.team.title}
            </h3>
            {seaport.team.description.map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed text-navy-700">
                {para}
              </p>
            ))}

            {/* Team members table */}
            <h4 className="mb-3 mt-8 text-xl font-semibold text-navy-800">
              {seaport.team.membersTitle}
            </h4>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full min-w-[500px] border-collapse">
                <thead>
                  <tr className="bg-navy-800 text-white">
                    <th className="px-4 py-3 text-left font-semibold">
                      Partner
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Website
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {seaport.team.members.map((member, i) => (
                    <tr
                      key={i}
                      className={`border-b border-navy-100 ${
                        i % 2 === 0 ? "bg-white" : "bg-navy-50"
                      }`}
                    >
                      <td className="px-4 py-3 text-navy-700">
                        {member.partner}
                      </td>
                      <td className="px-4 py-3">
                        {member.website ? (
                          <a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-500 underline hover:text-accent-600"
                          >
                            {member.website}
                          </a>
                        ) : (
                          <span className="text-navy-400">&mdash;</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Task Orders */}
          <div className="mt-10">
            <h4 className="mb-3 text-xl font-semibold text-navy-800">
              {seaport.taskOrders.title}
            </h4>
            <DataTable headers={taskOrderHeaders} rows={taskOrderRows} />
          </div>

          {/* Technical Instructions */}
          <div className="mt-10">
            <h4 className="mb-2 text-xl font-semibold text-navy-800">
              {seaport.technicalInstructions.title}
            </h4>
            <p className="text-navy-700">
              {seaport.technicalInstructions.content}
            </p>
          </div>

          {/* QA Program */}
          <div className="mt-10">
            <h4 className="mb-3 text-xl font-semibold text-navy-800">
              {seaport.qaProgram.title}
            </h4>
            <p className="mb-4 leading-relaxed text-navy-700">
              {seaport.qaProgram.intro}
            </p>
            <ul className="space-y-3 pl-5">
              {seaport.qaProgram.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="list-disc leading-relaxed text-navy-700"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* GSA MAS Schedule Section */}
        <section className="mb-16 border-t border-navy-200 pt-12">
          <h2 className="mb-6 text-3xl font-bold text-navy-900">
            {gsa.title}
          </h2>
          <p className="mb-4 leading-relaxed text-navy-700">
            {gsa.description}
          </p>

          <div className="mb-6 rounded border border-navy-200 bg-navy-50 p-6">
            <p className="mb-2 text-navy-700">
              <span className="font-semibold">Contract Number:</span>{" "}
              {gsa.contractNumber}
            </p>
            <p className="mb-2 text-navy-700">
              <span className="font-semibold">Contract Period:</span>{" "}
              {gsa.contractPeriod}
            </p>
          </div>

          <h3 className="mb-3 text-xl font-semibold text-navy-800">
            {gsa.sinTitle}
          </h3>
          <p className="mb-4 leading-relaxed text-navy-700">{gsa.sinInfo}</p>
          <p className="mb-4 leading-relaxed text-navy-700">
            {gsa.sinDescription}
          </p>
          <p className="mb-6 font-medium text-navy-800">{gsa.sinClosing}</p>

          <div className="flex flex-wrap gap-4">
            {gsa.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-500 underline hover:text-accent-600"
              >
                {link.text}
              </a>
            ))}
          </div>
        </section>

        {/* Bottom Links */}
        <section className="border-t border-navy-200 pt-8">
          <div className="flex flex-wrap gap-6">
            {bottomLinks.map((link, i) => {
              const isExternal = link.href.startsWith("http");
              if (isExternal) {
                return (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent-500 underline hover:text-accent-600"
                  >
                    {link.text}
                  </a>
                );
              }
              return (
                <Link
                  key={i}
                  href={link.href}
                  className="font-medium text-accent-500 underline hover:text-accent-600"
                >
                  {link.text}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
