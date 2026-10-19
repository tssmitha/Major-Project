import {
  BriefcaseBusiness,
  IndianRupee,
  MapPin,
  CalendarDays,
} from "lucide-react";
import "../../styles/Home/drive.css";

function DriveCard({ drive }) {
  return (
    <div className="home-drive-card">

      <div className="home-card-header">
        <span className="home-drive-status">{drive.status}</span>

        <div className="home-company-header">
          <img src={drive.logo} alt={drive.company} />
          <div>
            <h3>{drive.company}</h3>
            <p className="home-info-item role">
              <BriefcaseBusiness size={16} />
              <span>{drive.role}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Drive Info (Package & Location) */}
      <div className="home-drive-info">
        <div className="home-info-item">
          <IndianRupee size={16} />
          <span>{drive.package}</span>
        </div>

        <div className="home-info-item">
          <MapPin size={16} />
          <span>{drive.location}</span>
        </div>
      </div>

      {/* Deadline */}
      <div className="home-info-item home-deadline">
        <CalendarDays size={16} />
        <span>
          Applications close in <strong>{drive.deadline}</strong>
        </span>
      </div>

      <div className="home-divider"></div>

      {/* Branches & Action Button */}
      <div className="home-card-footer">
        <div className="home-branches-wrapper">
          <p className="home-branch-label">Eligible Branches</p>
          <div className="home-branches">
            {drive.branches.map((branch) => (
              <span key={branch}>{branch}</span>
            ))}
          </div>
        </div>

        <button className="home-details-btn">View Details →</button>
      </div>
    </div>
  );
}

export default DriveCard;