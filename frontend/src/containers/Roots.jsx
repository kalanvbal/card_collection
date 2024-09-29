import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainNavigation from "../pages/navigation/MainNavigation";

export default function RootLayout() {
  const location = useLocation();
  const cacherPages = ["/", "/inscription", "/cartePrimeur"];
  const afficherNavigation = !cacherPages.includes(location.pathname);

  return (
    <>
      {afficherNavigation && <MainNavigation />}
      <main>
        <Outlet />
      </main>
    </>
  );
}
