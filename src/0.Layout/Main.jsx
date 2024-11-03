import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
  const location = useLocation();
  console.log("location", location);

  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("registration");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar will stick to the top */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* The content will stretch and take up remaining space between Navbar and Footer */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer will stick to the bottom unless noHeaderFooter is true */}
      {!noHeaderFooter && (
        <footer className="mt-auto">
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Main;
