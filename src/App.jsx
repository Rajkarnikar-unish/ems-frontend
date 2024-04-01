import { useState } from "react";
import "./App.css";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path="/" element={<ListEmployeeComponent />} />

          {/* //http://localhost:3000/employees */}
          <Route path="/employees" element={<ListEmployeeComponent />} />

          {/* //http://localhost:3000/add-employee */}
          <Route path="/add-employee" element={<EmployeeComponent />} />

          {/* //http://localhost:3000/edit-employee */}
          <Route path="/update-employee/:id" element={<EmployeeComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
