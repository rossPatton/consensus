import type { MetaFunction } from "@remix-run/node";

const MembersPage = () => (
  <h1>members page</h1>
);
export default MembersPage;

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus: View All Categories" },
    { name: 'description', content: 'Select a category.' },
    { name: 'keywords', content: 'category,search,groups' }
  ];
};
