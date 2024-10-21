import type { MetaFunction } from "@remix-run/node";
// import { useLoaderData } from '@remix-run/react';

// import { Categories, Search } from "~/components";
// import SearchFilter from "~/containers/SearchFilter";
// import { db } from "~/utils/db.server";

export default function Index() {
  return null;
  // return (
  //   <>
  //     {/* <SearchFilter
  //       items={groupsThunk.data}
  //       searchKey="name"
  //       render={searchProps => (
  //         <Paginate
  //           count={9}
  //           items={searchProps.items}
  //           render={(groupsToRender: ts.group[]) => (
  //             <>
  //               <FilterPanel
  //                 onSearchChange={searchProps.onSearchChange}
  //                 placeholder="Filter groups by name"
  //               />
  //               {groupsToRender.length > 0
  //                 ? (
  //                   <Groups
  //                     groups={groupsToRender}
  //                     showLocation
  //                   />
  //                 )
  //                 : 'No groups found for this category'}
  //             </>
  //           )}
  //         />
  //       )} */}
  //     />
  //   </>
  // );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus" },
    {
      name: "description",
      content: "For when you need to get organized",
    },
  ];
};