import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDrives.css";

const drivesData = [
  {
    id: 1,
    company: "Bosch",
    role: "Software Engineer",
    batch: "2026",
    ctc: "₹10 LPA",
    deadline: "Aug 08, 2026",
    applications: 186,
    status: "Open",
  },
  {
    id: 2,
    company: "Deloitte",
    role: "Business Technology Analyst",
    batch: "2026",
    ctc: "₹7.6 LPA",
    deadline: "Aug 04, 2026",
    applications: 241,
    status: "Open",
  },
  {
    id: 3,
    company: "TCS",
    role: "Ninja",
    batch: "2026",
    ctc: "₹3.4 LPA",
    deadline: "Not published",
    applications: 0,
    status: "Draft",
  },
  {
    id: 4,
    company: "Infosys",
    role: "Specialist Programmer",
    batch: "2026",
    ctc: "₹9.5 LPA",
    deadline: "Jul 28, 2026",
    applications: 322,
    status: "Closed",
  },
  {
    id: 5,
    company: "Accenture",
    role: "Associate Software Engineer",
    batch: "2026",
    ctc: "₹6.5 LPA",
    deadline: "Jul 20, 2026",
    applications: 278,
    status: "In Progress",
  },
];

export default function AdminDrives() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [selectedCompany, setSelectedCompany] = useState("All companies");
  const [selectedBatch, setSelectedBatch] = useState("All batches");

  const companies = [...new Set(drivesData.map((drive) => drive.company))];
  const batches = [...new Set(drivesData.map((drive) => drive.batch))];

  const filteredDrives = useMemo(() => {
    return drivesData.filter((drive) => {
      const matchesSearch =
        drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drive.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "All statuses" ||
        drive.status === selectedStatus;

      const matchesCompany =
        selectedCompany === "All companies" ||
        drive.company === selectedCompany;

      const matchesBatch =
        selectedBatch === "All batches" ||
        drive.batch === selectedBatch;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCompany &&
        matchesBatch
      );
    });
  }, [searchTerm, selectedStatus, selectedCompany, selectedBatch]);

  const totalDrives = drivesData.length;
  const openDrives = drivesData.filter((drive) => drive.status === "Open").length;
  const draftDrives = drivesData.filter((drive) => drive.status === "Draft").length;
  const attentionDrives = drivesData.filter(
    (drive) => drive.status === "Draft" || drive.status === "Open"
  ).length;

  const navigate = useNavigate();

  return (
    <main className="admin-drives-page">
      <section className="admin-page-header">
        <div>
          <p className="admin-page-label">PLACEMENT OPERATIONS</p>
          <h1>Drive Management</h1>
          <p>
            Create, publish and monitor campus placement drives.
          </p>
        </div>

        <button className="admin-primary-button" type="button"  onClick={() => navigate("/admin/drives/create")}>
          + Create Drive
        </button>
      </section>

      <section className="admin-drive-summary">
        <article className="admin-drive-summary-card">
          <span>Total drives</span>
          <strong>{totalDrives}</strong>
          <p>Across current placement activity</p>
        </article>

        <article className="admin-drive-summary-card">
          <span>Open now</span>
          <strong>{openDrives}</strong>
          <p>Accepting student applications</p>
        </article>

        <article className="admin-drive-summary-card">
          <span>Drafts</span>
          <strong>{draftDrives}</strong>
          <p>Awaiting review or publishing</p>
        </article>

        <article className="admin-drive-summary-card attention-card">
          <span>Need attention</span>
          <strong>{attentionDrives}</strong>
          <p>Open or unfinished drive activity</p>
        </article>
      </section>

      <section className="admin-drives-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>All placement drives</h2>
            <p>{filteredDrives.length} drives shown</p>
          </div>
        </div>

        <div className="admin-drive-controls">
          <input
            type="search"
            placeholder="Search company or role"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
          >
            <option>All statuses</option>
            <option>Draft</option>
            <option>Open</option>
            <option>Closed</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <select
            value={selectedCompany}
            onChange={(event) => setSelectedCompany(event.target.value)}
          >
            <option>All companies</option>
            {companies.map((company) => (
              <option key={company}>{company}</option>
            ))}
          </select>

          <select
            value={selectedBatch}
            onChange={(event) => setSelectedBatch(event.target.value)}
          >
            <option>All batches</option>
            {batches.map((batch) => (
              <option key={batch}>{batch}</option>
            ))}
          </select>
        </div>

        <div className="admin-drives-table-wrap">
          <table className="admin-drives-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Batch</th>
                <th>CTC</th>
                <th>Deadline</th>
                <th>Applications</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>

            <tbody>
              {filteredDrives.map((drive) => (
                <tr key={drive.id}>
                  <td className="admin-company-name">{drive.company}</td>
                  <td>{drive.role}</td>
                  <td>{drive.batch}</td>
                  <td>{drive.ctc}</td>
                  <td>{drive.deadline}</td>
                  <td>{drive.applications || "—"}</td>
                  <td>
                    <span
                      className={`admin-drive-status ${drive.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {drive.status}
                    </span>
                  </td>
                  <td>
                    <button className="admin-manage-button" type="button">
                      {drive.status === "Draft"
                        ? "Continue editing"
                        : "Manage"}
                      <span>→</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDrives.length === 0 && (
            <p className="admin-empty-state">
              No drives match the selected filters.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}