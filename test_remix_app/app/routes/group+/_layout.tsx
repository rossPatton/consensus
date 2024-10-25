import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Groups } from "@prisma/client";
import { Outlet, useLoaderData } from "@remix-run/react";
import cx from 'classnames';
import { useContext } from 'react';
import { MediaContext } from '~/context';
import { GroupInfo, GroupTabs } from "./components";
import { db } from "~/utils/db.server";

export default function GroupPage() {
  const { group } = useLoaderData<LoaderData>();
  const { isDesktop } = useContext(MediaContext);

  return (
    <div
      className={cx({
        'flex items-start': isDesktop,
      })}>
      <GroupInfo
        group={group}
      />
      <div className="d:border d:shadow rounded w-full d:min-w-8/12">
        <GroupTabs
          group={group}
        />
        <Outlet />
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
