import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../pages/style.css";

interface Student {
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  dateOfAdmission: string;
}

interface Props {
  students: Student[];
  handleEditStudent: (student: Student) => void;
  handleDeleteStudent: (student: Student) => void;
}

const StudentList: React.FC<Props> = ({ students, handleEditStudent, handleDeleteStudent }) => {
  return (
    <tbody>
      {students.map((student, index) => (
        <tr key={index}>
          <td>{student.name}</td>
          <td>{student.email}</td>
          <td>{student.phone}</td>
          <td>{student.enrollNumber}</td>
          <td>{student.dateOfAdmission}</td>
          <td>
            <button className="edit" onClick={() => handleEditStudent(student)}>
              <FaEdit className="edit" />
            </button>
            <button onClick={() => handleDeleteStudent(student)}>
              <MdDelete className="delete-icon" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default StudentList;
