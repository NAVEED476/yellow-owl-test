import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import StudentTable from "../components/StudentTable";
import SearchBar from "../components/SearchBar";
import StudentForm from "../components/StudentForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
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

  const fetchStudents = async (query: string) => {
    setLoader(true);
    try {
      const response = await fetch(`http://localhost:7000/api/students${query}`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.log("Fetching students failed");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchStudents("");
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    let query = '';

    if (searchValue) {
      query = `?name=${searchValue}`;
    }

    setSearchQuery(searchValue);
    fetchStudents(query);
  };

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

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        "http://localhost:7000/api/students/create",
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
        handleCloseModal();
      } else {
        console.log("Submission to create new student failed");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    } finally {
      setLoader(false);
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
          `http://localhost:7000/api/students/update/${newStudent._id}`,
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
        } else {
          console.log("Update operation failed");
        }
      }
    } catch (error) {
      console.error("Error updating student:", error);
    } finally {
      setLoader(false);
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
          `http://localhost:7000/api/students/delete/${studentToDelete._id}`,
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
        } else {
          console.log("Error during delete:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  const isFormComplete = () => {
    return (
      newStudent.name.trim().length !== 0 &&
      newStudent.email.trim().length !== 0 &&
      newStudent.phone.trim().length !== 0 &&
      newStudent.enrollNumber.trim().length !== 0 &&
      newStudent.dateOfAdmission.trim().length !== 0
    );
  };

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="navbar">
          <h4>Students</h4>
        </div>
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleAddNewStudent={handleAddNewStudent}
        />
        <StudentTable
          students={students}
          loader={loader}
          handleEditStudent={handleEditStudent}
          handleDeleteStudent={handleDeleteStudent}
        />
      </main>

      {(showAddModal || showEditModal) && (
        <StudentForm
          student={newStudent}
          handleInputChange={handleInputChange}
          handleSubmit={showAddModal ? handleSubmit : handleUpdateStudent}
          handleCloseModal={handleCloseModal}
          isFormComplete={isFormComplete()}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmation
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UserManagement;
