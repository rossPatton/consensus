import { Groups, Meetings } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FilterPanel, MeetingsList } from '~/components';
import { Input } from "~/components/ui/input";
import { db } from "~/utils/db.server";

export default function MeetingsPage(props: any) {
  const { group, meetings } = useLoaderData<LoaderData>();
  console.log("meetings ? ", meetings);
  console.log('group ? ', group);

  return (
    <div className="space-y-4">
      {/* <FilterPanel
        onSearchChange={props.onSearchChange}
        onPublishedFilterChange={props.onPublishedFilterChange}
        placeholder="Filter meetings by title"
        publishedFilter={props.publishedFilter}
      /> */}
      <Input />
      <MeetingsList
        publishedFilter={props.publishedFilter}
        meetings={meetings}
        sessionRole={props.role}
        type={props.type}
      />
      {/* {props.hideMeetings
        && (
          <h3>
            This is a private group. Only members can see upcoming meetings.
          </h3>
        )} */}
      {/* {!props.hideMeetings
        && (
          <>
            <FilterPanel
              onSearchChange={props.onSearchChange}
              onPublishedFilterChange={props.onPublishedFilterChange}
              placeholder="Filter meetings by title"
              publishedFilter={props.publishedFilter}
            />
            <MeetingsList
              showRSVPs
              publishedFilter={props.publishedFilter}
              meetings={meetings}
              sessionRole={props.role}
              type={props.type}
            />
          </>
        )} */}
    </div>
  );
};

// Define a type for the data returned by the loader
type LoaderData = {
  group: Groups;
  meetings: Meetings[];
};

export const loader: LoaderFunction = async (opts) => {
  const data = {
    group: await db.groups.findUnique({
      where: { uuid: opts.params.groupId }
    }),
    meetings: await db.meetings.findMany({
      where: {
        group: opts.params.groupId,
        status: {
          not: "Draft",
        },
      },
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
