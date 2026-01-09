import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onClose, onSave, employee }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    profileImage: "",
  });

  const [preview, setPreview] = useState("");

  // Edit mode: set existing employee data
  useEffect(() => {
    if (employee) {
      setFormData(employee);
      if (employee.profileImage instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(employee.profileImage);
      } else {
        setPreview(employee.profileImage || "");
      }
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "active" ? value === "true" : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      profileImage: file,
    });

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      profileImage: preview, 
    });
  };

  return (
    <div className="modal">
      <div className="employee-modal">
        <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit} className="employee-form">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <label>State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            <option value="Delhi">Delhi</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>

          <label>Status</label>
          <select
            name="active"
            value={formData.active}
            onChange={handleChange}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <label>Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="preview-img"
              style={{ width: "80px", marginTop: "10px" }}
            />
          )}

          <div className="form-buttons">
            <button type="submit">
              {employee ? "Update" : "Add"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
