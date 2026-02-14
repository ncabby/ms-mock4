import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
}: CTAButtonProps) {
  const baseClasses =
    "inline-block rounded px-6 py-3 font-semibold transition-colors";

  const variantClasses =
    variant === "primary"
      ? "bg-navy-800 text-white hover:bg-navy-900"
      : "border-2 border-navy-800 text-navy-800 hover:bg-navy-50";

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </Link>
  );
}
