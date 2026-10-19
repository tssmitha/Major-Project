import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  GraduationCap,
  IndianRupee,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function formatDeadline(dateValue) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

function DriveCard({
  drive,
  onApply,
  onViewDetails,
}) {
  const statusClass = drive.status
    .toLowerCase()
    .replaceAll(" ", "-");

  const isClosed = drive.status === "Closed";
  const hasApplied = drive.status === "Applied";

  return (
    <article className="drive-card">
      <div className="drive-company-section">
        <img
          className="drive-company-logo"
          src={drive.logo}
          alt={`${drive.company} logo`}
        />

        <div className="drive-company-content">
          <div className="drive-company-heading">
            <h2>{drive.company}</h2>

            <span className="company-type-badge">
              {drive.companyType}
            </span>
          </div>

          <h3>{drive.role}</h3>

          <div className="drive-company-meta">
            <span>
              <MapPin size={16} />
              {drive.location}
            </span>

            <span>
              <BriefcaseBusiness size={16} />
              {drive.employmentType}
            </span>
          </div>
        </div>
      </div>

      <div className="drive-information-section">
        <div className="drive-detail-row">
          <span className="drive-detail-label">
            <IndianRupee size={17} />
            CTC
          </span>

          <strong>{drive.ctcDisplay}</strong>
        </div>

        <div className="drive-detail-row">
          <span className="drive-detail-label">
            <CalendarDays size={17} />
            Batch
          </span>

          <strong>{drive.batch}</strong>
        </div>

        <div className="drive-detail-row">
          <span className="drive-detail-label">
            <Star size={17} />
            Min CGPA
          </span>

          <strong>{drive.minCgpa}</strong>
        </div>

        <div className="drive-detail-row drive-branches-row">
          <span className="drive-detail-label">
            <GraduationCap size={17} />
            Eligible Branches
          </span>

          <strong>
            {drive.eligibleBranches.join(", ")}
          </strong>
        </div>
      </div>

      <div className="drive-action-section">
        <span
          className={`drive-status-badge ${statusClass}`}
        >
          {drive.status}
        </span>

        <div className="drive-deadline">
          <span>Registration Ends</span>

          <strong>
            {formatDeadline(drive.deadline)}
          </strong>
        </div>


        <div className="drive-card-buttons">
          <button
            type="button"
            className="drive-details-button"
            onClick={(handleViewDetails) => onViewDetails(drive.id)}
          >
            View Details
          </button>

          <button
            type="button"
            className="drive-apply-button"
            disabled={isClosed || hasApplied}
            onClick={() => onApply(drive.id)}
          >
            {hasApplied
              ? "Applied"
              : isClosed
                ? "Closed"
                : "Apply Now"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default DriveCard;