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
    <div
      className="object-cover w-full h-full bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/k8TMY8m/Whats-App-Image-2024-01-04-at-09-52-59-8c3b2ad2.jpg")',
      }}
    >
      <Navbar></Navbar>
      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
