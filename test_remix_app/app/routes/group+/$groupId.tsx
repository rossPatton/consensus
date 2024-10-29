import { Groups } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export default function LandingPage(props: any) {
  const { group } = useLoaderData<LoaderData>();

  return (
    <div className="d:pb-2 d:pl-2 d:pr-2">
      landing page
    </div>
  );
};

// Define a type for the data returned by the loader
type LoaderData = {
  group: Groups;
};

export const loader: LoaderFunction = async (opts) => {
  const data = {
    group: await db.groups.findUnique({
      where: { uuid: opts.params.groupId }
    }),
  };

  return data;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus" },
    { name: 'description', content: 'View group meetings' },
    { name: 'keywords', content: 'meetings,search,groups' }
  ];
};
