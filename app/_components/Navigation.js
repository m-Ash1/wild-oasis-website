"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navLinks = [
  {
    name: "Cabins",
    href: "/cabins",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Developers",
    href: "/developers",
  },
  {
    name: "Account",
    href: "/account",
  },
];
export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-8 md:gap-16 items-center">
        {navLinks.map((link) => {
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`hover:text-accent-400 transition-colors ${
                  pathname.includes(link.href) ? "text-accent-400" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
