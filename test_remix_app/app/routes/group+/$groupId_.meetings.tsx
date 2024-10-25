import { Groups } from "@prisma/client";
import { noop } from "lodash-es";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FilterPanel, Meetings } from '~/components';
import { db } from "~/utils/db.server";

export default function MeetingsPage(props: any) {
  const { group } = useLoaderData<LoaderData>();
  console.log('group ? ', group);

  return (
    <div className="d:pb-2 d:pl-2 d:pr-2">
      <FilterPanel
        onSearchChange={props.onSearchChange ?? noop}
        onPublishedFilterChange={props.onPublishedFilterChange ?? noop}
        placeholder="Filter meetings by title"
        publishedFilter="upcoming"//{props.publishedFilter}
      />
      <Meetings
        showRSVPs
        publishedFilter="upcoming"//{props.publishedFilter}
        meetings={props.meetings ?? []}
      // sessionRole={props.role}
      // type={props.type}
      />
      {props.hideMeetings
        && (
          <h3>
            This is a private group. Only members can see upcoming meetings.
          </h3>
        )}
      {!props.hideMeetings
        && (
          <>
            <FilterPanel
              onSearchChange={props.onSearchChange}
              onPublishedFilterChange={props.onPublishedFilterChange}
              placeholder="Filter meetings by title"
              publishedFilter={props.publishedFilter}
            />
            <Meetings
              showRSVPs
              publishedFilter={props.publishedFilter}
              meetings={props.meetings}
              sessionRole={props.role}
              type={props.type}
            />
          </>
        )}
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
