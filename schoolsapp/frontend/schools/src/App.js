import React from "react";
import { Route, Routes } from "react-router-dom";
import ShowSchool from "./components/ShowSchool";
import AddSchool from "./components/AddSchool";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ShowSchool />} />
      <Route path="/register" element={<AddSchool />} />
    </Routes>
  );
};

export default App;
