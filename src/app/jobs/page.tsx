import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import jobsData from "../../../content/pages/jobs.json";

export default function JobsPage() {
  return (
    <main>
      <PageHero
        title={jobsData.pageTitle}
        backgroundImage={jobsData.heroImage}
      />

      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="mb-6 text-3xl font-bold text-navy-900">
          {jobsData.heading}
        </h2>

        {/* Intro + JobDiva badge link */}
        <p className="mb-6 text-lg leading-relaxed text-navy-700">
          {jobsData.intro}
        </p>
        <div className="mb-8">
          <a
            href={jobsData.jobdivaLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={jobsData.jobdivaBadge}
              alt="View jobs on JobDiva"
              width={300}
              height={279}
              className="h-auto w-48 transition-opacity hover:opacity-80"
            />
          </a>
        </div>

        {/* Description paragraphs */}
        {jobsData.description.map((para, i) => (
          <p key={i} className="mb-4 leading-relaxed text-navy-700">
            {para}
          </p>
        ))}

        {/* Benefits section */}
        <div className="mt-10">
          <p className="mb-6 text-lg leading-relaxed text-navy-700">
            {jobsData.benefitsIntro}
          </p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {jobsData.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-accent-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-navy-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing text */}
        <div className="mt-10">
          <p className="leading-relaxed text-navy-700">
            {jobsData.closingText}{" "}
            <a
              href={`mailto:${jobsData.resumeEmail}`}
              className="font-medium text-accent-500 underline hover:text-accent-600"
            >
              {jobsData.resumeEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
