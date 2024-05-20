import React from "react";
import "../pages/style.css";

interface StudentFormProps {
  student: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    enrollNumber: string;
    dateOfAdmission: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleCloseModal: () => void;
  isFormComplete: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  handleInputChange,
  handleSubmit,
  handleCloseModal,
  isFormComplete,
}) => (
  <div className="modal">
    <div className="modal-content">
      <h2>{student._id ? "Edit Student" : "Add New Student"}</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="phone"
        placeholder="Phone"
        value={student.phone}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="enrollNumber"
        placeholder="Enroll Number"
        value={student.enrollNumber}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="dateOfAdmission"
        placeholder="Date of Admission"
        value={student.dateOfAdmission}
        onChange={handleInputChange}
        required
      />
      <div className="modal-buttons">
        <button className="submit" onClick={handleSubmit} disabled={!isFormComplete}>
          Submit
        </button>
        <button className="cancel" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default StudentForm;
