import PageHero from "@/components/shared/PageHero";
import SolutionBlock from "@/components/solutions/SolutionBlock";
import solutionsData from "../../../content/pages/solutions.json";

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        title={solutionsData.pageTitle}
        backgroundImage={solutionsData.heroImage}
      />

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center">
        <p className="text-lg leading-relaxed text-navy-700">
          {solutionsData.intro}
        </p>
      </section>

      {/* Solution blocks */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {solutionsData.solutions.map((solution, index) => (
          <SolutionBlock
            key={solution.id}
            solution={solution}
            index={index}
          />
        ))}
      </section>
    </main>
  );
}
