import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
  const location = useLocation();

  // Paths where Navbar and Footer should be hidden
  const noHeaderFooter =
    location.pathname === "/login" || location.pathname === "/registration";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally render Navbar */}
      {!noHeaderFooter && (
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
      )}

      {/* Dynamic content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Conditionally render Footer */}
      {!noHeaderFooter && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Main;
