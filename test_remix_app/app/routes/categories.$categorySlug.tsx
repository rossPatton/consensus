import { Categories, Groups, Meetings } from "@prisma/client";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import cx from "classnames";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { GroupsList } from "~/components";
import { db } from "~/utils/db.server";

export default function CategoryPage() {
  const { category, groups } = useLoaderData<LoaderData>();
  console.log("🚀 ~ CategoryPage ~ category:", category)

  return (
    <>
      <h1>{category.display}</h1>
      <p>{category.description}</p>
      {groups.length > 0
        ? (
          <GroupsList
            groups={groups}
            pendingGroups={groups}
            showLocation={false}
            leaveGroup={() => { }}
            setHover={() => { }}
            roles={[{ groupId: 1, role: 'pending' }]}
          />
        )
        : 'No groups found for this category'}
      {/* <SearchFilter
        items={groupsThunk.data}
        searchKey="name"
        render={searchProps => (
          <Paginate
            count={9}
            items={searchProps.items}
            render={(groupsToRender: ts.group[]) => (
              <>
                <FilterPanel
                  onSearchChange={searchProps.onSearchChange}
                  placeholder="Filter groups by name"
                />
                {groupsToRender.length > 0
                  ? (
                    <Groups
                      groups={groupsToRender}
                      showLocation
                    />
                  )
                  : 'No groups found for this category'}
              </>
            )}
          />
        )}
      />*/}
    </>
  );
}

// Define a type for the data returned by the loader
type LoaderData = {
  category: Categories;
  groups: Groups[];
  meetings: Meetings[];
};

export const loader: LoaderFunction = async (opts) => {
  const category = await db.categories.findFirst({
    where: {
      slug: opts.params.categorySlug,
    }
  });

  if (!category) {
    return null;
  }

  const data = {
    category,
    groups: await db.groups.findMany({
      where: {
        category: category.uuid,
      },
    }),
    meetings: await db.meetings.findMany({
      where: {
        category: category.uuid,
      },
    }),
  };

  return data;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus: Category" },
    {
      name: "description",
      content: "Groups & Meetings for specific category",
    },
  ];
};