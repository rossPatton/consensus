import { Categories } from "@prisma/client";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CategoriesList, Search } from "~/components";
import { db } from "~/utils/db.server";

export default function Index() {
  const { categories } = useLoaderData<LoaderData>();

  return (
    <>
      <div className="flex flex-col items-center mb-3 text-center">
        <h1 className="text-2 d:text-1 mb-2 text-gray-5 leading-tight d:max-w-6/12">
          Consensus is an independent meetings platform for leftist activists and local community groups.
        </h1>
        <div className="d:w-4/12">
          <Search
            className="w-full pl-3"
          // placeholder={`Search groups ${city ? `in ${city}` : ''}`}
          />
        </div>
      </div>
      <CategoriesList categories={categories} />
    </>
  );
}

// Define a type for the data returned by the loader
type LoaderData = {
  categories: Categories[];
};

export const loader = async () => {
  const data = {
    categories: await db.categories.findMany(),
  };

  return data;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus" },
    {
      name: "description",
      content: "For when you need to get organized",
    },
  ];
};
