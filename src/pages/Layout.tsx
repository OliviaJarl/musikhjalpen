import { Outlet } from "react-router";
import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";
import TopBackground from "../components/Layout/TopBackground";

const Layout = () => {
  return (
    <>
      <TopBackground />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
