import "./DriveApplicationTable.css";
import { useNavigate } from "react-router-dom";

export default function DriveApplicationsTable({ drives }) {
  const navigate = useNavigate();

  const latestDrives = [...drives].sort(
    (firstDrive, secondDrive) =>
      new Date(secondDrive.postedDate) - new Date(firstDrive.postedDate)
  );

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="drive-applications-table-wrapper">
      <table className="drive-applications-table">
        <thead>
          <tr>
            <th>Company and role</th>
            <th>Posted date</th>
            <th>Status</th>
            <th>Applicants</th>
            <th>Offers</th>
            <th>Latest round</th>
            <th>Action</th>
          </tr>
        </thead>

       <tbody>
  {latestDrives.length > 0 ? (
    latestDrives.map((drive) => (
      <tr key={drive.id}>
        <td>
          <div className="drive-table-company">
            <strong>{drive.company}</strong>
            <span>{drive.role}</span>
          </div>
        </td>

        <td>{formatDate(drive.postedDate)}</td>

        <td>
          <span
            className={`drive-table-status ${drive.status.toLowerCase()}`}
          >
            {drive.status}
          </span>
        </td>

        <td>{drive.aggregate.applicants}</td>
        <td>{drive.aggregate.offers}</td>
        <td>{drive.latestRound}</td>

        <td>
          <button type="button" className="drive-table-view-button" onClick={() => navigate(`/admin/applications/${drive.id}`)}>
            View details
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td className="drive-table-empty" colSpan="7">
        <strong>No company drives found</strong>
        <span>Try changing or resetting the selected filters.</span>
      </td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
}