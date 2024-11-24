import { MoonIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function DeveloperCard({ developer }) {
  const { avatar_url, full_name, title, description } = developer;
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3 ">
          <Image
            fill
            className="object-cover"
            src={avatar_url}
            alt={`${full_name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            {full_name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <MoonIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg font-bold">{title}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DeveloperCard;
