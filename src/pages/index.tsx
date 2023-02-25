import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { z } from "zod";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Status from "./status";

// Router query params
const querySchema = z.object({
  dashboard: z.string().optional(),
});

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { dashboard } = querySchema.parse(router.query);

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/auth/login");
    }
  }, [router, status]);

  if (!session) {
    return null;
  }

  function renderSwitch() {
    switch (dashboard) {
      case "participants":
        return <p>Participants</p>
      case "checkins":
        return <p>Check-ins</p>
      default:
        return <Status />
    }
  }

  return (
    <>
      <Header />
      <SideNav selection={dashboard} />
      <main className="ml-60 p-5"> {
        renderSwitch()
      } </main>
    </>
  );
}
