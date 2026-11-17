import { useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import Cursor from "./Cursor";
import { setNavLight, siteApi } from "../lib/motion";

export default function SiteFrame() {
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    siteApi.init();
    const intro =
      !siteApi.static && !document.documentElement.classList.contains("nointro");
    if (intro) siteApi.stopLenis();
    const path = location.pathname.replace(/\/+$/, "") || "/";
    if (path !== "/") {
      try {
        sessionStorage.setItem("ddec-from", "1");
      } catch (e) {
        /* ignore */
      }
    }
  }, []);

  useLayoutEffect(() => {
    siteApi.navigate = (href) => navigate(href);
    siteApi.location = location;
    const path = location.pathname.replace(/\/+$/, "") || "/";
    setNavLight(path === "/proyectos");
  }, [navigate, location]);

  return (
    <>
      <div className="curtain" id="curtain" aria-hidden="true">
        <div className="slice-row is-vertical" id="sliceRow" />
        <p className="curtain__label" id="curtainLabel" />
      </div>
      <Nav />
      <Outlet />
      <Footer />
      <Cursor />
    </>
  );
}
