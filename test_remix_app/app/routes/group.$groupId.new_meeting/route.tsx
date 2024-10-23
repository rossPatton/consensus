import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Groups } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { PlanMeetingComponent } from "./_components";
import { db } from "~/utils/db.server";

export default function NewMeeting() {
  const { group } = useLoaderData<LoaderData>();

  return (
    <PlanMeetingComponent
      group={group}
    // router={props.location}
    />
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
    { title: "Consensus: New Meeting" },
    { name: 'description', content: 'Plan your next meeting' },
    { name: 'keywords', content: 'plan,meeting' }
  ];
};
