import { Groups, Users } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { UsersList } from "~/components";
import { db } from "~/utils/db.server";

export default function MembersPage() {
  const { group, users } = useLoaderData<LoaderData>();
  return (
    <>
      <h1>{group.memberName}</h1>
      <UsersList group={group} users={users} />
    </>
  );
};

// Define a type for the data returned by the loader
type LoaderData = {
  group: Groups,
  users: Users[];
};

export const loader: LoaderFunction = async (opts) => {
  const data = {
    group: await db.groups.findUnique({
      where: { uuid: opts.params.groupId }
    }),
    users: await db.userMemberships.findMany({
      where: {
        group: opts.params.groupId,
      },
      include: {
        users: true,
      },
    }).then((memberships) => memberships.map((membership) => ({
      role: membership.role,
      ...membership.users,
    }))),
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
