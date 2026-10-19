import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

export default function RoleSelection() {
  const navigate = useNavigate();

  function handleRoleSelection(role) {
    navigate(`/login?role=${role}`);
  }

  return (
    <main className="role-selection-page">
      <section className="role-selection-panel">
        <div className="role-brand">
          <div className="role-logo">NIE</div>

          <div>
            <p className="role-eyebrow">Placement Portal</p>
            <h1>Welcome to NIE Placements</h1>
            <p className="role-description">
              Choose how you would like to continue.
            </p>
          </div>
        </div>

        <div className="role-options">
          <button
            className="role-card student-role-card"
            onClick={() => handleRoleSelection("student")}
          >
            <span className="role-icon" aria-hidden="true">
              🎓
            </span>

            <span className="role-card-content">
              <strong>Student</strong>
              <small>
                Explore drives, submit applications and track your progress.
              </small>
            </span>

            <span className="role-arrow" aria-hidden="true">
              →
            </span>
          </button>

          <button
            className="role-card admin-role-card"
            onClick={() => handleRoleSelection("admin")}
          >
            <span className="role-icon admin-role-icon" aria-hidden="true">
              A
            </span>

            <span className="role-card-content">
              <strong>Administrator</strong>
              <small>
                Manage students, companies, drives and placement results.
              </small>
            </span>

            <span className="role-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>

        <p className="role-help-text">
          Use the account credentials provided by the placement department.
        </p>
      </section>

      <section className="role-visual-panel">
        <div className="role-visual-content">
          <p className="role-visual-eyebrow">NIE Placement Cell</p>

          <h2>
            Connecting talent with the
            <span> right opportunities.</span>
          </h2>

          <p>
            One platform for students and the placement team to manage the
            complete recruitment journey.
          </p>

          <div className="role-feature-list">
            <div>
              <span>01</span>
              Discover active placement drives
            </div>

            <div>
              <span>02</span>
              Track applications and results
            </div>

            <div>
              <span>03</span>
              Manage placement activities efficiently
            </div>
          </div>
        </div>

        <div className="role-decoration role-decoration-one" />
        <div className="role-decoration role-decoration-two" />
      </section>
    </main>
  );
}