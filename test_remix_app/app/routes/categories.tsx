import { Categories } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { CategoriesList } from "~/components";

export default function CategoriesPage() {
  const { categories } = useLoaderData<LoaderData>();

  return (
    <CategoriesList categories={categories} />
  );
};

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
    { title: "Consensus: View All Categories" },
    { name: 'description', content: 'Select a category.' },
    { name: 'keywords', content: 'category,search,groups' }
  ];
};
