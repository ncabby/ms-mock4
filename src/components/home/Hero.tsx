import Image from "next/image";
import homeData from "../../../content/pages/home.json";

export function Hero() {
  return (
    <section className="relative flex h-[400px] w-full items-center justify-center md:h-[500px]">
      <Image
        src="/images/hero/Featured-Image-Homepage.jpg"
        alt="Main Sail homepage hero"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <h1 className="relative z-10 mx-auto max-w-4xl px-4 text-center text-3xl font-bold leading-snug text-white md:text-5xl">
        {homeData.hero.headline}
      </h1>
    </section>
  );
}
