import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/ApplicationDetails.css";

function ApplicationDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const application = location.state?.application;

  if (!application) {
    return (
      <main className="application-details-page">
        <h1>Application not found</h1>
        <button type="button" onClick={() => navigate("/applications")}>
          Back to Applications
        </button>
      </main>
    );
  }

  const statusSteps =
  application.status === "REJECTED"
    ? ["APPLIED", "REJECTED"]
    : ["APPLIED", "SHORTLISTED", "SELECTED"];

const currentStatusIndex = statusSteps.indexOf(application.status);

  return (
    <main className="application-details-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/applications")}
      >
        ← Back to Applications
      </button>

      <h1>Application Details</h1>

      <section className="application-details-card">
        <h2>{application.role}</h2>
        <p>{application.company}</p>

        <p>
          <strong>Application ID :</strong> {application.id}
        </p>

        <p>
          <strong>Applied On :</strong> {application.appliedOn}
        </p>

        <p>
          <strong>Current Status :</strong> {application.status}
        </p>

        <p>
          <strong>CTC : </strong>{application.ctc}
        </p>

        <p>
          <strong>Location : </strong>{application.location}
        </p>

        <p>
          <strong>Deadline : </strong>{application.deadline}
        </p>

        <section className="application-status-section">
  <h3>Application Progress</h3>

  <div className="application-timeline details-timeline">
    {statusSteps.map((status, index) => {
      const isCompleted = index <= currentStatusIndex;
      const isRejected = status === "REJECTED";

      return (
        <div
          key={status}
          className={`timeline-step ${
            isCompleted ? "completed" : ""
          } ${isRejected ? "rejected" : ""}`}
        >
          <span className="timeline-marker">
            {isCompleted ? "✓" : index + 1}
          </span>

          <span className="step-label">{status}</span>
        </div>
      );
    })}
  </div>
</section>
      </section>
    </main>
  );
}

export default ApplicationDetails;