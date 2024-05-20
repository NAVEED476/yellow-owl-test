import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../pages/style.css";

interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  dateOfAdmission: string;
}

interface StudentTableProps {
  students: Student[];
  loader: boolean;
  handleEditStudent: (student: Student) => void;
  handleDeleteStudent: (student: Student) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  loader,
  handleEditStudent,
  handleDeleteStudent,
}) => (
  <table>
    <thead>
      <tr className="th-names">
        <th>NAME</th>
        <th className="hide-td ">EMAIL</th>
        <th className="hide-td">PHONE</th>
        <th className="hide-td hide-td1">ENROLL NUMBER</th>
        <th className="hide-td hide-td1">DATE OF ADMISSION</th>
        <th></th>
      </tr>
    </thead>
    {loader ? (
      <div className="loader">
        <h1>Loading...!</h1>
      </div>
    ) : (
      <tbody className="tbody-data">
        {students.map((student, index) => (
          <tr key={index} className="tr-data">
            <td
              className="td-data"
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
            <td className="hide-td">{student.email}</td>
            <td className="hide-td">{student.phone}</td>
            <td className="hide-td hide-td1">{student.enrollNumber}</td>
            <td className="hide-td hide-td1">
              {formatDate(student.dateOfAdmission)}
            </td>
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
    )}
  </table>
);

export default StudentTable;