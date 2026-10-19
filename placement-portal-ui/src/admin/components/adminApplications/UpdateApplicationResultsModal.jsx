import { useState } from "react";

import "./UpdateApplicationResultsModal.css";

export default function UpdateApplicationResultsModal({
  drive,
  onClose,
  onSubmit,
}) {
  const [updateMethod, setUpdateMethod] = useState(null);
  const [resultRound, setResultRound] = useState("");
  const [resultOutcome, setResultOutcome] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  function handleBack() {
    setUpdateMethod(null);
    setResultRound("");
    setResultOutcome("");
    setStudentSearch("");
    setSelectedStudentIds([]);
  }

  function handleManualSubmit() {
  onSubmit({
    studentIds: selectedStudentIds,
    resultRound,
    resultOutcome,
  });
}

  const availableStudents = drive.students.filter((student) => {
  const searchValue = studentSearch.trim().toLowerCase();

  const participatedInRound =
    resultRound && student.currentStage === resultRound;

  const matchesSearch =
    student.name.toLowerCase().includes(searchValue) ||
    student.usn.toLowerCase().includes(searchValue);

  return participatedInRound && matchesSearch;
});

function handleStudentSelection(studentId) {
  setSelectedStudentIds((currentIds) =>
    currentIds.includes(studentId)
      ? currentIds.filter((id) => id !== studentId)
      : [...currentIds, studentId]
  );
}

function handleSelectAllStudents() {
  const visibleStudentIds = availableStudents.map(
    (student) => student.id
  );

  const allVisibleSelected = visibleStudentIds.every((id) =>
    selectedStudentIds.includes(id)
  );

  if (allVisibleSelected) {
    setSelectedStudentIds((currentIds) =>
      currentIds.filter((id) => !visibleStudentIds.includes(id))
    );
  } else {
    setSelectedStudentIds((currentIds) => [
      ...new Set([...currentIds, ...visibleStudentIds]),
    ]);
  }
}

  return (
    <div
      className="application-results-modal-backdrop"
      onClick={onClose}
    >
      <section
        className="application-results-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <p>UPDATE APPLICATION RESULTS</p>
            <h2>{drive.company}</h2>
            <span>{drive.role}</span>
          </div>

          <button
            type="button"
            className="application-results-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        {updateMethod === null && (
          <div className="application-result-methods">
            <button
              type="button"
              onClick={() => setUpdateMethod("MANUAL")}
            >
              <strong>Select students manually</strong>
              <span>
                Choose students and update their round or outcome.
              </span>
            </button>

            <button
              type="button"
              onClick={() => setUpdateMethod("UPLOAD")}
            >
              <strong>Upload company results</strong>
              <span>
                Import a CSV or Excel shortlist received from the company.
              </span>
            </button>
          </div>
        )}

        {updateMethod === "MANUAL" && (
          <div className="application-result-workflow">
            <button
              type="button"
              className="application-result-back"
              onClick={handleBack}
            >
              ← Change update method
            </button>

            <h3>Manual result update</h3>
            <p>
              Select the completed round and the result being recorded.
            </p>

            <div className="manual-result-form">
              <div>
                <label htmlFor="resultRound">Result for round</label>

                <select
                  id="resultRound"
                  value={resultRound}
                  onChange={(event) =>
                    setResultRound(event.target.value)
                  }
                >
                  <option value="">Select round</option>

                  {drive.rounds.map((round) => (
                    <option key={round.id} value={round.name}>
                      {round.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="resultOutcome">Outcome</label>

                <select
                  id="resultOutcome"
                  value={resultOutcome}
                  onChange={(event) =>
                    setResultOutcome(event.target.value)
                  }
                >
                  <option value="">Select outcome</option>
                  <option value="QUALIFIED">
                    Qualified for next round
                  </option>
                  <option value="ELIMINATED">Eliminated</option>
                  <option value="SELECTED">Finally selected</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {updateMethod === "UPLOAD" && (
          <div className="application-result-workflow">
            <button
              type="button"
              className="application-result-back"
              onClick={handleBack}
            >
              ← Change update method
            </button>

            <h3>Upload company results</h3>
            <p>Upload the result file received from the company.</p>
          </div>
        )}

        {resultRound && resultOutcome && (
  <div className="manual-student-selection">
    <div className="manual-student-selection-header">
      <div>
        <h4>Select affected students</h4>
        <p>
          {selectedStudentIds.length} student
          {selectedStudentIds.length !== 1 ? "s" : ""} selected
        </p>
      </div>

      <input
        type="search"
        value={studentSearch}
        placeholder="Search name or USN"
        onChange={(event) => setStudentSearch(event.target.value)}
      />
    </div>

    {availableStudents.length > 0 ? (
      <>
        <label className="manual-select-all">
          <input
            type="checkbox"
            checked={availableStudents.every((student) =>
              selectedStudentIds.includes(student.id)
            )}
            onChange={handleSelectAllStudents}
          />

          Select all visible students
        </label>

        <div className="manual-student-list">
          {availableStudents.map((student) => (
            <label className="manual-student-item" key={student.id}>
              <input
                type="checkbox"
                checked={selectedStudentIds.includes(student.id)}
                onChange={() => handleStudentSelection(student.id)}
              />

              <span>
                <strong>{student.name}</strong>
                <small>
                  {student.usn} · {student.branch}
                </small>
              </span>
            </label>
          ))}
        </div>
      </>
    ) : (
      <p className="manual-student-empty">
        No students are currently recorded in this round.
      </p>
    )}

    <button
      type="button"
      className="manual-result-submit"
      disabled={selectedStudentIds.length === 0}
      onClick={handleManualSubmit}
    >
      Update {selectedStudentIds.length} student
      {selectedStudentIds.length !== 1 ? "s" : ""}
    </button>
  </div>
)}
      </section>

      
    </div>
  );
}