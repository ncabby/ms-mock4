import Image from "next/image";

interface Logo {
  name: string;
  logo: string;
}

interface LogoGridProps {
  logos: Logo[];
  grayscale?: boolean;
}

export default function LogoGrid({ logos, grayscale = false }: LogoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {logos.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-center rounded border border-navy-100 bg-white p-4"
        >
          <Image
            src={item.logo}
            alt={item.name}
            width={120}
            height={60}
            className={
              grayscale
                ? "grayscale transition-[filter] duration-300 hover:grayscale-0"
                : ""
            }
          />
        </div>
      ))}
    </div>
  );
}
