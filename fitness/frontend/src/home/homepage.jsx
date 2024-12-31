import React from "react";
import Navbar from "./navbar";
import Header from "./header";
import Components from "./components";
import Footer from "./footer";
import Imageslider from "./slider";
export default function Homepage() {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex flex-col">
          <Components />
          <Imageslider />
          <Footer />
        </div>
      </div>
    </>
  );
}
