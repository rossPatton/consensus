import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Categories, Groups, UserMemberships } from "@prisma/client";
import { Outlet, useLoaderData } from "@remix-run/react";
// import { cn } from '~/utils';
// import { useContext } from 'react';
// import { MediaContext } from '~/context';
import { GroupInfo, GroupTabs } from "./components";
import { db } from "~/utils/db.server";
import { Separator } from "~/components/ui/separator";
// import { TabsContent } from "@radix-ui/react-tabs";

export default function GroupPage() {
  const { group } = useLoaderData<LoaderData>();

  return (
    <div>
      <div className="space-y-4">
        <GroupInfo
          group={group}
        />
        <GroupTabs
          group={group}
        />
      </div>
      <Separator className="my-8" />
      <Outlet />
    </div>
  );
};

// Define a type for the data returned by the loader
type LoaderData = {
  group: Groups & {
    categories: Categories;
    memberships: UserMemberships[];
  };
};

export const loader: LoaderFunction = async (opts) => {
  const data = {
    group: await db.groups.findUnique({
      where: { uuid: opts.params.groupId },
      include: {
        categories: true,
        memberships: true,
      },
    }),
  };

  return data;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus: View Group" },
    { name: 'description', content: 'TODO' },
    { name: 'keywords', content: 'TODO' }
  ];
};
