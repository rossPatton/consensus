import type { MetaFunction } from "@remix-run/node";

export default function LandingPage() {
  return (
    <div className="d:pb-2 d:pl-2 d:pr-2">
      landing page
    </div>
  );
};

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus" },
    { name: 'description', content: 'View group meetings' },
    { name: 'keywords', content: 'meetings,search,groups' }
  ];
};
