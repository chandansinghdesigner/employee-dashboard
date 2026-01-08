import React from "react";

const SummaryCards = ({ employees }) => {
  const total = employees.length;
  const active = employees.filter((e) => e.active).length;
  const inactive = total - active;

  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Total Employees</h3>
        <p>{total}</p>
      </div>
      <div className="card">
        <h3>Active</h3>
        <p>{active}</p>
      </div>
      <div className="card">
        <h3>Inactive</h3>
        <p>{inactive}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
