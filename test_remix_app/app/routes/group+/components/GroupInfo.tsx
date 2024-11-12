import { Categories, Groups, UserMemberships } from "@prisma/client";
import { Link, useParams } from "@remix-run/react";
import pluralize from "pluralize";

import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Avatar, Description, ExternalLink } from "~/components";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { JoinForm, LeaveForm } from ".";
import { Badge } from "~/components/ui/badge";

type CompleteGroup = Groups & {
  categories: Categories;
  memberships: UserMemberships[];
}

export const GroupInfo = (props: { group: CompleteGroup }) => {
  // const params = useParams();
  const { group } = props;
  const { categories, description = "", name, privacyType, memberships } = group;

  return (
    <>
      <div className="grid grid-cols-12 auto-rows-fr gap-x-4">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>
              <div className="flex mb-4 space-x-1 capitalize items-center">
                <Badge>
                  {privacyType}
                </Badge>
                <Badge>
                  {categories.display}
                </Badge>
              </div>
              <Link
                className="block"
                to={`/group/${group.uuid}`}>
                {name}
              </Link>
            </CardTitle>
            <Link to={`/group/${group.uuid}/members`}>
              {memberships.length} {pluralize(group.memberName, memberships.length)}
            </Link>
          </CardHeader>
          <CardContent>
            {description}
          </CardContent>
        </Card>
        <div className="col-span-7 content-center flex-col">
          <AspectRatio ratio={16 / 9}>
            <img
              alt=""
              className="w-full mt-2"
              src={`/${group.categories.slug}_sm.svg`}
              height="256"
              width="480"
            />
          </AspectRatio>
        </div>
      </div>
      <div className="rounded d:border d:shadow mb-3 d:mb-0 d:mr-2 flex-grow-0 min-w-full d:min-w-4/12">
        <div className="flex">
          {group.facebook && (
            <div className="mr-1">
              <ExternalLink
                noFollow
                to={group.facebook}>
                <img
                  alt="Our Facebook"
                  src="/images/fb.svg"
                  width="25"
                />
              </ExternalLink>
            </div>
          )}
          {group.twitter && (
            <div className="mr-1">
              <ExternalLink
                noFollow
                to={group.twitter}>
                <img
                  alt="Our Twitter"
                  src="/images/twitter.svg"
                  width="25"
                />
              </ExternalLink>
            </div>
          )}
          {group.website && (
            <div className="mr-1">
              <ExternalLink
                noFollow
                to={group.website}>
                <img
                  alt="Our Website"
                  src="/images/website.svg"
                  width="25"
                />
              </ExternalLink>
            </div>
          )}
          {/* {group.showEmail && (
            <div>
              <img
                alt="Email Us!"
                src="/images/email.svg"
                width="25"
              />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};
