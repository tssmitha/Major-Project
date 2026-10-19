import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MyApplications.css";

const applications = [
  {
    id: 1,
    company: "Infosys",
    role: "Systems Engineer",
    appliedOn: "2026-07-18",
    status: "SHORTLISTED",
    ctc: "₹6.5 LPA",
    location: "Bengaluru",
    deadline: "2026-07-20",
  },
  {
    id: 2,
    company: "Bosch",
    role: "Software Intern",
    appliedOn: "2026-07-12",
    status: "APPLIED",
    ctc: "₹35,000/month",
    location: "Bengaluru",
    deadline: "2026-07-15",
  },
  {
    id: 3,
    company: "Deloitte",
    role: "Analyst",
    appliedOn: "2026-07-04",
    status: "REJECTED",
    ctc: "₹7 LPA",
    location: "Hyderabad",
    deadline: "2026-07-06",
  },
];

export default function MyApplications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ALL");

  const totalApplications = applications.length;

  const activeApplications = applications.filter(
    (application) =>
      application.status === "APPLIED" ||
      application.status === "SHORTLISTED"
  ).length;

  const shortlistedApplications = applications.filter(
    (application) => application.status === "SHORTLISTED"
  ).length;

  const selectedApplications = applications.filter(
    (application) => application.status === "SELECTED"
  ).length;

  const filteredApplications = applications.filter((application) => {
    if (activeTab === "ACTIVE") {
      return (
        application.status === "APPLIED" ||
        application.status === "SHORTLISTED"
      );
    }

    if (activeTab === "PREVIOUS") {
      return (
        application.status === "SELECTED" ||
        application.status === "REJECTED"
      );
    }

    return true;
  });

  const getStatusSteps = (status) => {
    if (status === "REJECTED") {
      return ["APPLIED", "REJECTED"];
    }

    return ["APPLIED", "SHORTLISTED", "SELECTED"];
  };

  return (
    <main className="applications-page">
      <header className="applications-header">
        <div>
          <h1>My Applications</h1>
          <p>Track the status and details of your placement applications.</p>
        </div>
      </header>

      <section className="applications-summary">
        <article className="application-summary-card">
          <p>Total Applications</p>
          <h2>{totalApplications}</h2>
        </article>

        <article className="application-summary-card">
          <p>Active Applications</p>
          <h2>{activeApplications}</h2>
        </article>

        <article className="application-summary-card">
          <p>Shortlisted</p>
          <h2>{shortlistedApplications}</h2>
        </article>

        <article className="application-summary-card">
          <p>Selected</p>
          <h2>{selectedApplications}</h2>
        </article>
      </section>

      <section className="applications-tabs" aria-label="Application filters">
        <button
          type="button"
          className={activeTab === "ALL" ? "active" : ""}
          onClick={() => setActiveTab("ALL")}
        >
          All
        </button>

        <button
          type="button"
          className={activeTab === "ACTIVE" ? "active" : ""}
          onClick={() => setActiveTab("ACTIVE")}
        >
          Active
        </button>

        <button
          type="button"
          className={activeTab === "PREVIOUS" ? "active" : ""}
          onClick={() => setActiveTab("PREVIOUS")}
        >
          Previous
        </button>
      </section>

      <section className="applications-list">
        <table className="applications-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Applied On</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.map((application) => {
              const statusSteps = getStatusSteps(application.status);
              const currentStatusIndex = statusSteps.indexOf(
                application.status
              );

              return (
                <tr key={application.id}>
                  <td>{application.company}</td>
                  <td>{application.role}</td>
                  <td>{application.appliedOn}</td>

                  <td>
                    <div className="application-timeline inline-timeline">
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
                  </td>

                  <td>
                    <button
                      type="button"
                      className="view-application-button"
                      onClick={() =>
                        navigate(`/applications/${application.id}`, {
                          state: { application },
                        })
                      }
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredApplications.length === 0 && (
          <p className="applications-empty-message">
            No applications found in this category.
          </p>
        )}
      </section>
    </main>
  );
}