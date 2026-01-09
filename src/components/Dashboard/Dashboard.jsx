import React, { useState, useEffect } from "react";
import SummaryCards from "./SummaryCards";
import EmployeeTable from "./EmployeeTable";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <div className="dashboard-container">
      <h1>Employee Management Dashboard</h1>
      <SummaryCards employees={employees} />
      <EmployeeTable employees={employees} setEmployees={setEmployees} />
    </div>
  );
};

export default Dashboard;
