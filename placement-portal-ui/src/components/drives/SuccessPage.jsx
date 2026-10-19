import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/ApplicationSuccess.css";

export default function ApplicationSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    company = "the company",
    role = "the role",
  } = location.state?.drive || {};

  const submittedOn = new Date().toLocaleString();

  const applicationId = `APP-${String(company)
    .slice(0, 3)
    .toUpperCase()}-${Date.now().toString().slice(-6)}`;

  const resumeUsed = "Student_Resume.pdf";

  const handleDrives = () => {
    navigate("/drives");
  };

  const viewApplications = () => {
    navigate("/applications");
  };

  return (
    <main className="application-success-page">
      <section className="application-success-container">
        <header className="success-header-strip">
          Application Submitted — Success
        </header>

        <div className="success-content-layout">
          <div className="success-left-column">
            <div className="success-message-row">
              <div className="success-check-icon">✓</div>

              <div>
                <h1>Application Submitted!</h1>

                <p>
                  Your application for <strong>{role}</strong> at{" "}
                  <strong>{company}</strong> has been submitted
                  successfully.
                </p>
              </div>
            </div>

            <div className="success-wish-box">
              🍀 All the best for the selection process!
            </div>

            <section className="submission-details-card">
              <h2>Submission Details</h2>

              <div className="submission-detail-row">
                <span>Submitted on</span>
                <strong>{submittedOn}</strong>
              </div>

              <div className="submission-detail-row">
                <span>Application ID</span>
                <strong>{applicationId}</strong>
              </div>

              <div className="submission-detail-row">
                <span>Resume Used</span>
                <strong>{resumeUsed}</strong>
              </div>
            </section>
          </div>

          <aside className="next-steps-card">
            <h2>What happens next?</h2>

            <div className="next-step">
              <span>1</span>
              <p>
                Your application will be reviewed by the placement team.
              </p>
            </div>

            <div className="next-step">
              <span>2</span>
              <p>
                Shortlisted students will be notified through the portal.
              </p>
            </div>

            <div className="next-step">
              <span>3</span>
              <p>
                Keep checking your dashboard for application updates.
              </p>
            </div>
          </aside>
        </div>

        <div className="success-action-buttons">
          <button
            className="success-primary-button"
            type="button"
            onClick={viewApplications}
          >
            View My Applications
          </button>

          <button
            className="success-secondary-button"
            type="button"
            onClick={handleDrives}
          >
            Back to Drives
          </button>
        </div>
      </section>
    </main>
  );
}