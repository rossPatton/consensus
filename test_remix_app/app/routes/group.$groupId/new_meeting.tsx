import type { MetaFunction } from "@remix-run/node";

const CategoriesPage = () => null;
export default CategoriesPage;

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus: View All Categories" },
    { name: 'description', content: 'Select a category.' },
    { name: 'keywords', content: 'category,search,groups' }
  ];
};
