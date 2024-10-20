import type { MetaFunction } from "@remix-run/node";
import { Categories, Search } from "~/components";

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus" },
    {
      name: "description",
      content: "For when you need to get organized",
    },
  ];
};

export default function Index() {
  return (
    <>
      <div className="flex flex-col items-center mb-3 text-center">
        <h1 className="text-2 d:text-1 mb-2 text-gray-5 leading-tight d:max-w-6/12">
          Consensus is an independent meetings platform for leftist activists and local community groups.
        </h1>
        <div className="d:w-4/12">
          <Search
            className="w-full pl-3"
          // placeholder={`Search groups ${city ? `in ${city}` : ''}`}
          />
        </div>
      </div>
      {/* {props.meetings
        && props.meetings.length > 0
        && (
          <>
            <h2 className="text-3 mb-2 text-center">
              Upcoming Meetings
            </h2>
            <div className="mb-4 p-2 bg-gray-1 rounded">
              <Meetings
                horizontal
                showGroupName
                meetings={props.meetings}
              />
            </div>
          </>
        )
      } */}
      <Categories />
    </>
  );
}