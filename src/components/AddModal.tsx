import React from "react";
import "../pages/style.css";

interface AddModalProps {
  showAddModal: boolean;
  handleCloseModal: () => void;
  handleSubmit: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newStudent: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    enrollNumber: string;
    dateOfAdmission: string;
  };
}

const AddModal: React.FC<AddModalProps> = ({
  showAddModal,
  handleCloseModal,
  handleSubmit,
  handleInputChange,
  newStudent,
}) => {
  if (!showAddModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Student</h2>
        <div className="modal-buttons">
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cancel" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
