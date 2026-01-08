import React, { useState } from "react";
import EmployeeForm from "../Employee/EmployeeForm";
import Modal from "../Common/Modal";

const EmployeeTable = ({ employees, setEmployees }) => {
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Save Add/Edit Employee
  const handleSave = (emp) => {
    if (editEmployee) {
      setEmployees(
        employees.map((e) => (e.id === emp.id ? emp : e))
      );
    } else {
      setEmployees([...employees, { ...emp, id: Date.now() }]);
    }
    setShowForm(false);
    setEditEmployee(null);
  };

  // Delete Employee
  const handleDelete = () => {
    setEmployees(employees.filter((e) => e.id !== deleteEmployee.id));
    setDeleteEmployee(null);
  };

  // Combined Search + Filter
  const filteredEmployees = employees
    .filter((e) =>
      e.fullName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((e) => (filterGender ? e.gender === filterGender : true))
    .filter((e) =>
      filterStatus
        ? filterStatus === "active"
          ? e.active
          : !e.active
        : true
    );

  return (
    <div>
      {/* Search & Filters */}
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "5px", flex: "1" }}
        />

        <select onChange={(e) => setFilterGender(e.target.value)}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button onClick={() => setShowForm(true)}>Add Employee</button>
        <button onClick={() => window.print()}>Print</button>
      </div>

      {/* Employee Table */}
      <div className="print-area">
        <table
          border="1"
          cellPadding="5"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No employees found
                </td>
              </tr>
            )}
            {filteredEmployees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>
                  {e.profileImage && (
                    <img
                      src={e.profileImage}
                      alt={e.fullName}
                      width="50"
                    />
                  )}
                </td>
                <td>{e.fullName}</td>
                <td>{e.gender}</td>
                <td>{e.dob}</td>
                <td>{e.state}</td>
                <td>{e.active ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditEmployee(e);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => setDeleteEmployee(e)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          employee={editEmployee}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteEmployee && (
        <Modal
          message={`Are you sure you want to delete ${deleteEmployee.fullName}?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteEmployee(null)}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
