import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onClose, onSave, employee }) => {
  const [fullName, setFullName] = useState(employee ? employee.fullName : "");
  const [gender, setGender] = useState(employee ? employee.gender : "");
  const [dob, setDob] = useState(employee ? employee.dob : "");
  const [state, setState] = useState(employee ? employee.state : "");
  const [active, setActive] = useState(employee ? employee.active : true);
  const [profileImage, setProfileImage] = useState(
    employee ? employee.profileImage : ""
  );
  const [preview, setPreview] = useState(employee ? employee.profileImage : "");

  useEffect(() => {
    if (profileImage) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(profileImage);
    } else {
      setPreview(employee ? employee.profileImage : "");
    }
  }, [profileImage, employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !gender || !dob || !state) {
      alert("Please fill all required fields");
      return;
    }
    onSave({
      id: employee ? employee.id : Date.now(),
      fullName,
      gender,
      dob,
      state,
      active,
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <label>State</label>
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select State</option>
            <option value="Delhi">Delhi</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            {/* Add more states if needed */}
          </select>

          <label>Status</label>
          <select value={active} onChange={(e) => setActive(e.target.value === "true")}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <label>Profile Image</label>
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          {preview && <img src={preview} alt="Preview" className="preview-img" />}

          <div className="form-buttons">
            <button type="submit">{employee ? "Update" : "Add"}</button>
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
