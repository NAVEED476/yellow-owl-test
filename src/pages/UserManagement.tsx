import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "./style.css";
interface Student {
    _id: string;
    name: string;
    email: string;
    phone: string;
    enrollNumber: string;
    dateOfAdmission: string;
  }
  

const UserManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newStudent, setNewStudent] = useState<Student>({
    _id: "",
    name: "",
    email: "",
    phone: "",
    enrollNumber: "",
    dateOfAdmission: "",
  });
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loader, setLoader] = useState(false);

  const handleAddNewStudent = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setNewStudent({
      _id: "",
      name: "",
      email: "",
      phone: "",
      enrollNumber: "",
      dateOfAdmission: "",
    });
    setEditStudent(null);
  };

  const fetchStudents = async () => {
    setLoader(true)
    try {
      const response = await fetch("https://yellow-owl-backend.vercel.app/api/students/");
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        setLoader(false)
      } else {
        console.log("Fetching students failed");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async () => {
    setLoader(true)
    try {
      const response = await fetch(
        "https://yellow-owl-backend.vercel.app/api/students/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setStudents([...students, data]);
        setLoader(false);
        handleCloseModal();
       
      } else {
        console.log("Submission to create new student failed");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleEditStudent = (student: Student) => {
    setNewStudent(student);
    setShowEditModal(true);
  };

  const handleUpdateStudent = async () => {
    setLoader(true);
    try {
      if (newStudent) {
        const response = await fetch(
          `https://yellow-owl-backend.vercel.app/api/students/update/${newStudent._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const updatedStudents = students.map((student) =>
            student._id === newStudent._id ? data : student
          );
          setStudents(updatedStudents);
          handleCloseModal();
          setLoader(false);
        } else {
          console.log("Update operation failed");
        }
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteStudent = (student: Student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setLoader(true);
    try {
      if (studentToDelete) {
        const response = await fetch(
          `https://yellow-owl-backend.vercel.app/api/students/delete/${studentToDelete._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          const updatedStudents = students.filter(
            (student) => student._id !== studentToDelete._id
          );
          setStudents(updatedStudents);
          setShowDeleteModal(false);
          setStudentToDelete(null);
          setLoader(false);
        } else {
          console.log("Error during delete:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchStudents();
    console.log(editStudent)
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="yellow-admin">
          <div className="admin-profile">
            <img src="" alt="" />
          </div>
          <div>
            <p className="admin-name">Yello Owl</p>
            <p className="desig">Admin</p>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="navbar">
          <h4>Students</h4>
        </div>
        <div className="search-cont">
          <div>
            <h2>Students</h2>
          </div>
          <div>
          <input
              className="search-bar"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="add-new-btn" onClick={handleAddNewStudent}>
              ADD NEW STUDENT
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ENROLL NUMBER</th>
              <th>DATE OF ADMISSION</th>
              <th></th>
            </tr>
          </thead>
         {loader ? <div className="loader">
          <h1 >loading...!</h1>
         </div> : <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div className="admin-profile">
                    <img src="" alt="" />
                  </div>
                  {student.name}
                </td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.enrollNumber}</td>
                <td>{student.dateOfAdmission}</td>
                <td>
                  <button
                    className="edit"
                    onClick={() => handleEditStudent(student)}
                  >
                    <FaEdit className="edit" />
                  </button>
                  <button onClick={() => handleDeleteStudent(student)}>
                    <MdDelete className="delete-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </main>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Student</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newStudent.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newStudent.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newStudent.phone}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="enrollNumber"
              placeholder="Enroll Number"
              value={newStudent.enrollNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="dateOfAdmission"
              placeholder="Date of Admission"
              value={newStudent.dateOfAdmission}
              onChange={handleInputChange}
            />
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
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Student</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newStudent.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newStudent.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newStudent.phone}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="enrollNumber"
              placeholder="Enroll Number"
              value={newStudent.enrollNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="dateOfAdmission"
              placeholder="Date of Admission"
              value={newStudent.dateOfAdmission}
              onChange={handleInputChange}
            />
            <div className="modal-buttons">
              <button className="submit" onClick={handleUpdateStudent}>
                Submit
              </button>
              <button className="cancel" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure to delete this student?</h2>
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
      )}
    </div>
  );
};

export default UserManagement;
