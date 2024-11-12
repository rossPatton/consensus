import type { MetaFunction } from "@remix-run/node";
import { TabsList, TabsContent, TabsTrigger, Tabs } from "~/components/ui/tabs";

export default function LandingPage() {
  return (
    <Tabs>
      <TabsList defaultValue="posts">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        posts
      </TabsContent>
      <TabsContent value="media">
        media
      </TabsContent>
    </Tabs>
  );
};

export const meta: MetaFunction = () => {
  return [
    { title: "Consensus" },
    { name: 'description', content: 'View group meetings' },
    { name: 'keywords', content: 'meetings,search,groups' }
  ];
};
