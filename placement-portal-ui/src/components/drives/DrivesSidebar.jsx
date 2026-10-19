import {
  Bookmark,
  BriefcaseBusiness,
  ChevronRight,
  FileCheck2,
  SlidersHorizontal,
  Star,
} from "lucide-react";

function DrivesSidebar() {
  return (
    <aside className="drives-sidebar">
      <section className="drives-sidebar-card">
        <h2>Quick Actions</h2>

        <button type="button" className="sidebar-action">
          <span className="sidebar-action-icon">
            <Bookmark size={21} />
          </span>

          <span className="sidebar-action-text">
            <strong>Saved Drives</strong>
            <small>View your saved opportunities</small>
          </span>

          <ChevronRight size={18} />
        </button>

        <button type="button" className="sidebar-action">
          <span className="sidebar-action-icon">
            <FileCheck2 size={21} />
          </span>

          <span className="sidebar-action-text">
            <strong>Applied Drives</strong>
            <small>Track your applications</small>
          </span>

          <ChevronRight size={18} />
        </button>

        <button type="button" className="sidebar-action">
          <span className="sidebar-action-icon">
            <Star size={21} />
          </span>

          <span className="sidebar-action-text">
            <strong>Dream Companies</strong>
            <small>Companies you aspire to work with</small>
          </span>

          <ChevronRight size={18} />
        </button>
      </section>

      <section className="drives-sidebar-card">
        <h2>Drive Status Guide</h2>

        <div className="status-guide-item">
          <span className="status-guide-label eligible">
            <i />
            Eligible
          </span>

          <p>You can apply for this drive.</p>
        </div>

        <div className="status-guide-item">
          <span className="status-guide-label applied">
            <i />
            Applied
          </span>

          <p>You have already applied.</p>
        </div>

        <div className="status-guide-item">
          <span className="status-guide-label closing-soon">
            <i />
            Closing Soon
          </span>

          <p>Registration closes within two days.</p>
        </div>

        <div className="status-guide-item">
          <span className="status-guide-label closed">
            <i />
            Closed
          </span>

          <p>The registration deadline has passed.</p>
        </div>
      </section>

      <section className="drive-preference-card">
        <div>
          <h2>Can’t find a suitable drive?</h2>

          <p>
            Update your profile and preferences to get better
            recommendations.
          </p>

          <button type="button">
            <SlidersHorizontal size={17} />
            Update Preferences
          </button>
        </div>

        <BriefcaseBusiness
          className="preference-card-icon"
          size={70}
        />
      </section>
    </aside>
  );
}

export default DrivesSidebar;