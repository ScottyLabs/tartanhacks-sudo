import { type NextPage } from "next";
import Header from "../components/Header";
import SideNav from "../components/SideNav";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main>
        <SideNav />
      </main>
    </>
  );
};

export default Home;
