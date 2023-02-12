import { type NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";
import Header from "../components/Header";
import SideNav from "../components/SideNav";

// Router query params
const querySchema = z.object({
  dashboard: z.string().optional(),
});

const Home: NextPage = () => {
  const router = useRouter();
  const { dashboard } = querySchema.parse(router.query);

  return (
    <>
      <Header />
      <main>
        <SideNav selection={dashboard} />
      </main>
    </>
  );
};

export default Home;
