import type { MetaFunction } from "@remix-run/node";
import { Categories } from "~/components";

const CategoriesPage = () => <Categories />;
export default CategoriesPage;

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus: View All Categories" },
    { name: 'description', content: 'Select a category.' },
    { name: 'keywords', content: 'category,search,groups' }
  ];
};