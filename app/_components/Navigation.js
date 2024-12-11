import { auth } from "../_lib/auth";
import NavigationLink from "./NavigationLink";
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
export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-8 md:gap-16 items-center">
        {navLinks.map((link, i) => {
          return <NavigationLink key={i} link={link} session={session} />;
        })}
      </ul>
    </nav>
  );
}
