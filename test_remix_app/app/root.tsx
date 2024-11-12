import "./tailwind.css";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { SidebarProvider, Sidebar, SidebarTrigger } from "~/components/ui/sidebar";
// import { AppSidebar } from "~/components/app-sidebar"
import { Header, Footer } from "~/components";
import { themeSessionResolver } from "./sessions.server";
import { LoaderFunctionArgs } from "@remix-run/node";
// import { Sidebar } from "./components/ui/sidebar";

export function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        {/* <Header /> */}
        {/* <ErrorBoundary status={geoStatus}> */}
        <SidebarProvider>
          <Sidebar />
          <main className="max-w-screen-lg mx-auto min-h-screen py-20">
            <SidebarTrigger />
            <Outlet />
          </main>
          {/* </ErrorBoundary> */}
          {/* <Footer /> */}
          <ScrollRestoration />
          <Scripts />
        </SidebarProvider>
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)
  return {
    theme: getTheme(),
  }
}
