import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import cx from 'classnames';
import { useContext } from 'react';
import { MediaContext } from '~/context';
import { GroupInfo } from "./_components";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { Groups } from "@prisma/client";

export default function GroupPage() {
  const { group } = useLoaderData<LoaderData>();
  const { isDesktop } = useContext(MediaContext);

  return (
    <div
      className={cx({
        'flex items-start': isDesktop,
      })}>
      <GroupInfo
        // match={props.match}
        group={group}
      // params={props.match.params}
      // role={props.role}
      />
      <div className="d:border d:shadow rounded w-full d:min-w-8/12">
        {/* <GroupTabs
          match={props.match}
          role={props.role}
        />
        {typeof props.match.params.section === 'undefined' && (
          <Meetings
            match={props.match}
            group={props.group}
            role={props.role}
            session={props.session}
          />
        )}
        {props.match.params.section === 'drafts' && (
          <Meetings
            match={props.match}
            group={props.group}
            role={props.role}
            session={props.session}
          />
        )}
        {props.match.params.section === 'members' && (
          <Members
            match={props.match}
            group={props.group}
            role={props.role}
          />
        )}
        {props.match.params.section === 'pending' && (
          <Members
            match={props.match}
            group={props.group}
            role={props.role}
          />
        )}
        {props.match.params.section === 'planMeeting' && (
          <PlanMeeting
            group={props.group}
            router={props.location}
          />
        )} */}
      </div>
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
    { title: "Consensus: View Group" },
    { name: 'description', content: 'TODO' },
    { name: 'keywords', content: 'TODO' }
  ];
};
