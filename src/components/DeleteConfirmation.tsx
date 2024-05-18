import React from "react";

interface DeleteConfirmationProps {
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  handleConfirmDelete,
  handleCancelDelete,
}) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Are you sure you want to delete this student?</h2>
      <div className="modal-buttons">
        <button className="submit" onClick={handleConfirmDelete}>
          Yes
        </button>
        <button className="cancel" onClick={handleCancelDelete}>
          No
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmation;
