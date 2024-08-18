import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";
import TopBackground from "../components/Layout/TopBackground";

const Layout = () => {
  return (
    <>
      <TopBackground />
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
