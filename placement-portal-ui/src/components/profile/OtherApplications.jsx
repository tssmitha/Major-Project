import { useState } from "react";
import { Search } from "lucide-react";
import "./OtherApplications.css";

const filters = [
  { label: "All", value: "ALL" },
  { label: "Applied", value: "APPLIED" },
  { label: "OA", value: "ONLINE_ASSESSMENT" },
  { label: "Technical", value: "TECHNICAL_ROUND" },
  { label: "HR", value: "HR_ROUND" },
  { label: "Selected", value: "SELECTED" },
  { label: "Rejected", value: "REJECTED" },
];

const stageLabels = {
  APPLIED: "Applied",
  ONLINE_ASSESSMENT: "Online Assessment",
  TECHNICAL_ROUND: "Technical Round",
  HR_ROUND: "HR Round",
  SELECTED: "Selected",
  REJECTED: "Rejected",
};

export default function OtherApplications({ applications = [] }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = applications.filter((application) => {
    const matchesFilter =
      activeFilter === "ALL" ||
      application.currentStage === activeFilter ||
      application.status === activeFilter;

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchesSearch =
      application.companyName.toLowerCase().includes(normalizedSearch) ||
      application.role.toLowerCase().includes(normalizedSearch);

    return matchesFilter && matchesSearch;
  });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="other-applications">
      <div className="other-applications-heading">
        <div>
          <h2>Other Applications</h2>
          <p>Track every company and your current recruitment stage.</p>
        </div>

        <span className="application-count">
          {filteredApplications.length} applications
        </span>
      </div>

      <div className="application-controls">
        <div className="application-filters">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={
                activeFilter === filter.value
                  ? "application-filter active"
                  : "application-filter"
              }
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <label className="application-search">
          <Search size={17} />

          <input
            type="search"
            placeholder="Search company or role"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </div>

      <div className="applications-table-wrapper">
        <table className="applications-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Applied on</th>
              <th>Current stage</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application.id}>
                <td>
                  <div className="application-company">
                    <span className="company-avatar">
                      {application.companyName.charAt(0)}
                    </span>

                    <strong>{application.companyName}</strong>
                  </div>
                </td>

                <td>{application.role}</td>

                <td>{formatDate(application.appliedDate)}</td>

                <td>
                  {stageLabels[application.currentStage] ??
                    application.currentStage}
                </td>

                <td>
                  <span
                    className={`application-status ${application.status.toLowerCase()}`}
                  >
                    {stageLabels[application.status] ??
                      application.status.replaceAll("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredApplications.length === 0 && (
          <div className="applications-empty-state">
            <h3>No applications found</h3>
            <p>Try selecting another stage or changing your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}