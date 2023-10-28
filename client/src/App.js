import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from "../src/components/LandingPage";
import { AfterLogin } from "../src/components/AfterLogin";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ExpenseProvider from "./context/ExpenseContext";
import { Grid } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

function App() {
  return (
    <>
      {/* Routing Tables  */}
      <ExpenseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user-logged" element={<AfterLogin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-in" element={<Signin />} />
            {/* <Route path="/*" element={<ErrorPage />} /> */}
          </Routes>
        </Router>
        <Grid
        style={{
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: "#2a234",
          color: "white",
          width: "100%",
          height: "100px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Karan Khatik <CopyrightIcon /> @2023
      </Grid>
      </ExpenseProvider>
      
    </>
  );
}

export default App;
