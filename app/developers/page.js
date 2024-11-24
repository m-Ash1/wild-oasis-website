import { unstable_noStore } from "next/cache";
import DeveloperCard from "../_components/DeveloperCard";
import { getDevelopers } from "../_lib/data-service";

export const metadata = {
  title: "Developers",
};

// export const revalidate = 3600;

async function page() {
  unstable_noStore();
  const developers = await getDevelopers();
  return developers.map(
    (developer) =>
      developer.description && (
        <DeveloperCard key={developer.id} developer={developer} />
      )
  );
}

export default page;
