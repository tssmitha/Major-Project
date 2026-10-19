import { useState } from "react";

import "./DriveStudentsTable.css";

export default function DriveStudentsTable({ students, rounds }) {
  const [search, setSearch] = useState("");
  const [selectedRound, setSelectedRound] = useState("ALL");
  const [selectedOutcome, setSelectedOutcome] = useState("ALL");

  const filteredStudents = students.filter((student) => {
    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchValue) ||
      student.usn.toLowerCase().includes(searchValue);

    const matchesRound =
      selectedRound === "ALL" ||
      student.currentStage === selectedRound;

    const matchesOutcome =
      selectedOutcome === "ALL" ||
      student.outcome === selectedOutcome;

    return matchesSearch && matchesRound && matchesOutcome;
  });

  return (
    <section className="drive-students-panel">
      <header className="drive-students-panel-header">
        <div>
          <h2>Students</h2>
          <p>
            View students by recruitment stage and application outcome.
          </p>
        </div>

        <strong>
          {filteredStudents.length} of {students.length} students
        </strong>
      </header>

      <div className="drive-student-filters">
        <div>
          <label htmlFor="studentSearch">Search student</label>
          <input
            id="studentSearch"
            type="search"
            value={search}
            placeholder="Search by name or USN"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="studentRound">Recruitment stage</label>
          <select
            id="studentRound"
            value={selectedRound}
            onChange={(event) => setSelectedRound(event.target.value)}
          >
            <option value="ALL">All stages</option>

            {rounds.map((round) => (
              <option key={round.id} value={round.name}>
                {round.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="studentOutcome">Outcome</label>
          <select
            id="studentOutcome"
            value={selectedOutcome}
            onChange={(event) => setSelectedOutcome(event.target.value)}
          >
            <option value="ALL">All outcomes</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="SELECTED">Selected</option>
            <option value="ELIMINATED">Eliminated</option>
          </select>
        </div>
      </div>

      <div className="drive-students-table-wrapper">
        <table className="drive-students-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>USN</th>
              <th>Branch</th>
              <th>Current stage</th>
              <th>Outcome</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <strong>{student.name}</strong>
                  </td>
                  <td>{student.usn}</td>
                  <td>{student.branch}</td>
                  <td>{student.currentStage}</td>
                  <td>
                    <span
                      className={`drive-student-outcome ${student.outcome
                        .toLowerCase()
                        .replace("_", "-")}`}
                    >
                      {student.outcome.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    <button type="button">View profile</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="drive-students-empty" colSpan="6">
                  No students match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}