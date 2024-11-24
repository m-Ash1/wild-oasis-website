"use client";

import { useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleFilter = (filter) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams);
    // Update the capacity parameter in the URL
    params.set("capacity", filter);

    // Push the new URL to the router (URL will be updated)
    router.push(`?${params.toString()}`);
  };

  const currentFilter = searchParams.get("capacity") ?? "all";
  return (
    <div className={`border border-primary-800 flex `}>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          currentFilter === "all" ? "bg-primary-700" : ""
        }`}
        onClick={() => {
          handleFilter("all");
        }}
      >
        All Cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          currentFilter === "small" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleFilter("small")}
      >
        1 - 3 Guests
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          currentFilter === "medium" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleFilter("medium")}
      >
        4 - 7 Guests
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          currentFilter === "large" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleFilter("large")}
      >
        8 - 12 Guests
      </button>
    </div>
  );
}

export default Filter;
