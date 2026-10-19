import "../styles/Students.css";
import { useState } from "react";
import { students } from "../components/students/StudentsData";
import StudentDetailsDrawer from "../components/students/StudentDetailsDrawer";

function AdminStudents() {
    const [selectedBranch, setSelectedBranch] = useState("CSE");
    const [placementFilter, setPlacementFilter] = useState("ALL");
    const [studentSearch, setStudentSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);

    const branchStudents = students
        .filter((student) => student.branch === selectedBranch)
        .sort((a, b) => a.usn.localeCompare(b.usn));

    const placedStudents = branchStudents.filter(
        (student) => student.placed
        ).length;

    const filteredStudents = branchStudents.filter((student) => {
    const searchValue = studentSearch.trim().toLowerCase();

    const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.usn.toLowerCase().includes(searchValue);

    const matchesPlacement =
        placementFilter === "ALL" ||
        (placementFilter === "PLACED" && student.placed) ||
        (placementFilter === "UNPLACED" && !student.placed);

    return matchesSearch && matchesPlacement;
    });

    const unplacedStudents = branchStudents.length - placedStudents;

  return (
    <main className="admin-students-page">

      <header className="admin-students-header">
        <div>
          <p className="admin-students-label">STUDENT MANAGEMENT</p>
          <h1>Students</h1>
          <p>
            View registered students and track their placement status.
          </p>
        </div>
      </header>

      <div className="admin-students-branch">
        <label htmlFor="branch">Branch</label>

        <select
            id="branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
        >
            <option value="CSE">Computer Science & Engineering</option>
            <option value="ISE">Information Science & Engineering</option>
            <option value="ECE">Electronics & Communication</option>
            <option value="EEE">Electrical & Electronics</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="CV">Civil Engineering</option>
        </select>
    </div>

    <section className="admin-students-summary">
        <article className="student-summary-card">
            <span>Total Students</span>
            <strong>{branchStudents.length}</strong>
            <p>{selectedBranch} students</p>
        </article>

        <article className="student-summary-card">
            <span>Placed</span>
            <strong>{placedStudents}</strong>
            <p>Students placed</p>
        </article>

        <article className="student-summary-card">
            <span>Unplaced</span>
            <strong>{unplacedStudents}</strong>
            <p>Students currently unplaced</p>
        </article>
    </section>

    <section className="admin-students-filters">
        <div className="admin-students-search">
            <input
            type="text"
            placeholder="Search by name or USN..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            />
        </div>

        <div className="admin-students-status-filter">
            <button
            className={placementFilter === "ALL" ? "active" : ""}
            onClick={() => setPlacementFilter("ALL")}
            >
            All
            </button>

            <button
            className={placementFilter === "PLACED" ? "active" : ""}
            onClick={() => setPlacementFilter("PLACED")}
            >
            Placed
            </button>

            <button
            className={placementFilter === "UNPLACED" ? "active" : ""}
            onClick={() => setPlacementFilter("UNPLACED")}
            >
            Unplaced
            </button>
        </div>
    </section>

    <section className="admin-students-table-section">
        <div className="admin-students-table-header">
            <div>
            <h2>{selectedBranch} Students</h2>
            <p>{filteredStudents.length} students shown</p>
            </div>
        </div>

        <div className="admin-students-table-wrapper">
            <table className="admin-students-table">
            <thead>
                <tr>
                <th>USN</th>
                <th>Student</th>
                <th>CGPA</th>
                <th>Placement Status</th>
                <th>Company / Offer</th>
                <th></th>
                </tr>
            </thead>

            <tbody>
                {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                <tr key={student.id}>
                    <td className="student-usn">{student.usn}</td>

                    <td>
                    <strong>{student.name}</strong>
                    </td>

                    <td>{student.cgpa.toFixed(2)}</td>

                    <td>
                    <span
                        className={
                        student.placed
                            ? "student-status placed"
                            : "student-status unplaced"
                        }
                    >
                        {student.placed ? "Placed" : "Unplaced"}
                    </span>
                    </td>

                    <td>
                    {student.offer ? (
                        <strong>{student.offer.company}</strong>
                    ) : (
                        <span className="student-no-offer">—</span>
                    )}
                    </td>

                    <td>
                    <button
                        type="button"
                        className="student-view-button"
                        onClick={()=>setSelectedStudent(student)}
                    >
                        View
                    </button>
                    </td>
                </tr>
                ))):(
                <tr>
                    <td colSpan="6" className="students-empty-state">
                        No students found.
                    </td>
                </tr>
                )}
            </tbody>
            
            </table>
        </div>
    </section>

    {selectedStudent && (
        <StudentDetailsDrawer
            student={selectedStudent}
            onClose={()=>setSelectedStudent(null)}
        />
)}

    </main>
  );
}

export default AdminStudents;