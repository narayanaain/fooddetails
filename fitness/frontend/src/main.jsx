import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./login/loginpage";
import Homepage from "./home/homepage";
import Registerpage from "./login/registerpage";
import PersonalDetailsForm from "./Pages/PersonalDetailsForm";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registerpage   />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/personal-details" element={<PersonalDetailsForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
