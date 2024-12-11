"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavigationLink({ link, session }) {
  const pathname = usePathname();
  if (link.href === "/account" && session) {
    return (
      <li className="flex gap-4 items-center">
        <Link href={link.href}>
          <Image
            alt="User profile image"
            src={session.user.image}
            width={40}
            height={40}
            className="rounded-full"
            referrerPolicy="no-referrer"
          />
        </Link>
      </li>
    );
  }
  return (
    <li>
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
}

export default NavigationLink;
