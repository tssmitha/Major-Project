import { useMemo, useState } from "react";

const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Applied", value: "APPLIED" },
  { label: "OA Cleared", value: "OA_CLEARED" },
  { label: "Technical 1", value: "TECHNICAL_1" },
  { label: "Technical 2", value: "TECHNICAL_2" },
  { label: "HR", value: "HR" },
  { label: "Offered", value: "OFFERED" },
  { label: "Rejected", value: "REJECTED" },
];

function formatValue(value) {
  if (!value) {
    return "Not updated";
  }

  return value.replaceAll("_", " ");
}

function getApplicationStage(application) {
  if (
    application.currentStatus === "OFFERED" ||
    application.currentStatus === "OFFER_ACCEPTED" ||
    application.currentStatus === "SELECTED"
  ) {
    return "OFFERED";
  }

  if (
    application.currentStatus === "REJECTED" ||
    application.currentStatus === "ELIMINATED"
  ) {
    return "REJECTED";
  }

  return (
    application.currentStage ||
    application.currentStatus ||
    "APPLIED"
  );
}

function getBadgeClass(status) {
  const normalizedStatus = status?.toLowerCase();

  if (
    normalizedStatus === "offered" ||
    normalizedStatus === "selected" ||
    normalizedStatus === "offer_accepted" ||
    normalizedStatus === "qualified"
  ) {
    return "success";
  }

  if (
    normalizedStatus === "rejected" ||
    normalizedStatus === "eliminated"
  ) {
    return "danger";
  }

  return "progress";
}

function LatestApplication({ application }) {
  const rounds = application.rounds ?? [];

  return (
    <article className="latest-application-card">
      <div className="latest-application-header">
        <div>
          <span className="placement-eyebrow">
            Latest application
          </span>

          <h3>{application.company}</h3>

          <p>
            {application.role}
            {application.ctc && ` · ${application.ctc}`}
          </p>
        </div>

        <span
          className={`application-status-badge ${getBadgeClass(
            application.currentStatus
          )}`}
        >
          {formatValue(application.currentStatus)}
        </span>
      </div>

      <div className="latest-application-meta">
        <div>
          <span>Applied on</span>
          <strong>{application.appliedOn ?? "Not available"}</strong>
        </div>

        <div>
          <span>Current stage</span>
          <strong>
            {formatValue(getApplicationStage(application))}
          </strong>
        </div>

        <div>
          <span>Application ID</span>
          <strong>#{application.id}</strong>
        </div>
      </div>

      {rounds.length > 0 && (
        <div className="application-timeline">
          {rounds.map((round, index) => (
            <div className="application-timeline-item" key={round.id ?? index}>
              <div className="application-timeline-marker">
                <span className="application-timeline-dot" />

                {index !== rounds.length - 1 && (
                  <span className="application-timeline-line" />
                )}
              </div>

              <div className="application-timeline-content">
                <div>
                  <strong>{round.round}</strong>
                  <span>{round.updatedOn ?? "Date not available"}</span>
                </div>

                <span
                  className={`round-status ${getBadgeClass(round.status)}`}
                >
                  {formatValue(round.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default function PlacementJourney({ applications = [] }) {
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const sortedApplications = useMemo(() => {
    return [...applications].sort((first, second) => {
      const firstDate = new Date(first.appliedOn).getTime() || 0;
      const secondDate = new Date(second.appliedOn).getTime() || 0;

      return secondDate - firstDate;
    });
  }, [applications]);

  const latestApplication = sortedApplications[0];
  const otherApplications = sortedApplications.slice(1);

  const filteredApplications = useMemo(() => {
    if (selectedFilter === "ALL") {
      return otherApplications;
    }

    return otherApplications.filter(
      (application) =>
        getApplicationStage(application) === selectedFilter
    );
  }, [otherApplications, selectedFilter]);

  if (applications.length === 0) {
    return (
      <section className="placement-journey-section">
        <div className="placement-section-heading">
          <div>
            <h2>Placement Journey</h2>
            <p>Your applications, rounds and outcomes.</p>
          </div>
        </div>

        <div className="placement-empty-state">
          <h3>No applications yet</h3>
          <p>Your placement applications will appear here.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="placement-journey-section">
      <div className="placement-section-heading">
        <div>
          <h2>Placement Journey</h2>
          <p>Your applications, recruitment stages and outcomes.</p>
        </div>

        <span className="application-count">
          {applications.length} application
          {applications.length !== 1 ? "s" : ""}
        </span>
      </div>

      <LatestApplication application={latestApplication} />

      <div className="other-applications-section">
        <div className="other-applications-heading">
          <div>
            <h3>Other Applications</h3>
            <p>Previous and ongoing placement applications.</p>
          </div>
        </div>

        <div className="application-filters">
          {FILTERS.map((filter) => (
            <button
              type="button"
              key={filter.value}
              className={
                selectedFilter === filter.value ? "active" : ""
              }
              onClick={() => setSelectedFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {filteredApplications.length > 0 ? (
          <div className="applications-table-wrapper">
            <table className="profile-applications-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>CTC</th>
                  <th>Applied On</th>
                  <th>Current Stage</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <strong>{application.company}</strong>
                    </td>

                    <td>{application.role}</td>
                    <td>{application.ctc ?? "Not disclosed"}</td>
                    <td>{application.appliedOn ?? "Not available"}</td>

                    <td>
                      {formatValue(getApplicationStage(application))}
                    </td>

                    <td>
                      <span
                        className={`application-status-badge ${getBadgeClass(
                          application.currentStatus
                        )}`}
                      >
                        {formatValue(application.currentStatus)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="filtered-empty-state">
            No applications match this filter.
          </div>
        )}
      </div>
    </section>
  );
}