import type { MetaFunction } from "@remix-run/node";

export default function LandingPage() {
  return (
    'posts'
  );
};

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus" },
    { name: 'description', content: 'View group meetings' },
    { name: 'keywords', content: 'meetings,search,groups' }
  ];
};
