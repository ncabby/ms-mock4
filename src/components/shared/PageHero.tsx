import Image from "next/image";

interface PageHeroProps {
  title: string;
  backgroundImage?: string;
}

export default function PageHero({ title, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative flex h-48 w-full items-center justify-center md:h-64">
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800 to-navy-900" />
      )}
      <h1 className="relative z-10 px-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        {title}
      </h1>
    </section>
  );
}
