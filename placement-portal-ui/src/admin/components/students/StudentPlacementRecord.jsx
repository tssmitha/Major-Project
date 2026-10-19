import { Link, useParams } from "react-router-dom";
import { students } from "./StudentsData";
import "./StudentPlacementRecord.css";

export default function AdminStudentPlacementRecord() {
  const { studentId } = useParams();

  const student = students.find(
    (student) => student.id === Number(studentId)
  );

  if (!student) {
    return <p>Student not found.</p>;
  }
  
  const totalApplications = student.applications?.length ?? 0;

    const offers = student.applications?.filter(
    (application) =>
        application.currentStatus === "OFFER_ACCEPTED" ||
        application.currentStatus === "OFFERED"
    ).length ?? 0;

const interviews = student.applications?.filter((application) =>
  application.rounds?.some((round) =>
    round.round.toLowerCase().includes("interview") ||
    round.round.toLowerCase().includes("technical") ||
    round.round.toLowerCase().includes("hr")
  )
).length ?? 0;

    const placedApplication = student.applications?.find(
        (application) => application.currentStatus === "OFFER_ACCEPTED"
        );

    const otherApplications = student.applications?.filter(
        (application) => application.id !== placedApplication?.id
    ) ?? [];

  return (
    <main className="student-placement-record-page">
      <Link
        to="/admin/students"
        className="student-record-back"
      >
        ← Back to Students
      </Link>

      <header className="student-record-header">
        <div>
          <p className="student-record-label">PLACEMENT RECORD</p>

          <h1>{student.name}</h1>

          <p>
            {student.usn} · {student.branch} · CGPA{" "}
            {student.cgpa.toFixed(2)}
          </p>
        </div>

        <span
          className={
            student.placed
              ? "student-status placed"
              : "student-status unplaced"
          }
        >
          {student.placed ? "Placed" : "Unplaced"}
        </span>
      </header>

      <section className="student-record-summary">
        <article>
            <span>Total Applications</span>
            <strong>{totalApplications}</strong>
            <p>Placement drives applied</p>
        </article>

        <article>
            <span>Interview Processes</span>
            <strong>{interviews}</strong>
            <p>Reached interview rounds</p>
        </article>

        <article>
            <span>Offers</span>
            <strong>{offers}</strong>
            <p>Offers received</p>
        </article>
        </section>

        <section className="student-journey-section">
            <div className="student-journey-heading">
                <div>
                <h2>Placement Journey</h2>
                <p>Drive-wise recruitment progress and outcomes.</p>
                </div>
            </div>

    {placedApplication && (
        <article className="student-application-card">
            <div className="student-application-header">
            <div>
                <h3>{student.applications[0].company}</h3>
                <p>
                {student.applications[0].role} ·{" "}
                {student.applications[0].ctc}
                </p>
            </div>

            <span className="application-result-badge">
                {student.applications[0].currentStatus}
            </span>
            </div>

        <div className="student-application-meta">
        Applied on {student.applications[0].appliedOn}
        </div>
    </article>)}

    <div className="student-rounds">
        {placedApplication.rounds.map((round, index) => (
            <div className="student-round-item" key={index}>
            
            <div className="student-round-marker">
                <span className="student-round-dot" />

                {index !== placedApplication.rounds.length - 1 && (
                <span className="student-round-line" />
                )}
            </div>

            <div className="student-round-details">
                <div>
                <strong>{round.round}</strong>
                <span>{round.updatedOn}</span>
                </div>

                <span
                className={`student-round-result ${round.status.toLowerCase()}`}
                >
                {round.status.replaceAll("_", " ")}
                </span>
            </div>

            </div>
        ))}
    </div>

    {otherApplications.length > 0 && (
  <div className="student-other-applications">
    <div className="student-other-applications-heading">
      <h3>Other Applications</h3>
      <p>Previous and ongoing placement applications.</p>
    </div>

    <div className="student-other-applications-table-wrapper">
      <table className="student-other-applications-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>CTC</th>
            <th>Last Stage</th>
            <th>Outcome</th>
          </tr>
        </thead>

        <tbody>
          {otherApplications.map((application) => {
            const lastRound =
              application.rounds?.[application.rounds.length - 1];

            return (
              <tr key={application.id}>
                <td>
                  <strong>{application.company}</strong>
                </td>

                <td>{application.role}</td>

                <td>{application.ctc}</td>

                <td>
                  {lastRound?.round ?? "Applied"}
                </td>

               <td>
                    <span
                        className={`student-application-outcome ${application.currentStatus.toLowerCase()}`}
                    >
                        {application.currentStatus.replaceAll("_", " ")}
                    </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
)}
</section>


    </main>
  );
}