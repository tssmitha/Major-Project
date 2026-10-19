import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageDetails = {
  "/admin": {
    section: "Overview",
    title: "Dashboard",
  },
  "/admin/drives": {
    section: "Operations",
    title: "Drives",
  },
  "/admin/companies": {
    section: "Operations",
    title: "Companies",
  },
  "/admin/applications": {
    section: "Operations",
    title: "Applications",
  },
  "/admin/students": {
    section: "Operations",
    title: "Students",
  },
  "/admin/queries": {
    section: "Communication",
    title: "Queries",
  },
  "/admin/announcements": {
    section: "Communication",
    title: "Announcements",
  },
};

export default function AdminTopbar() {
  const { pathname } = useLocation();

  const currentPage = pageDetails[pathname] || {
    section: "Administration",
    title: "Admin Portal",
  };

  const currentDate = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-breadcrumb">
        <span>{currentPage.section}</span>
        <span className="admin-breadcrumb-divider">/</span>
        <strong>{currentPage.title}</strong>
      </div>

      <div className="admin-topbar-actions">
        <label className="admin-global-search">
          <Search size={18} strokeWidth={1.8} />

          <input
            type="search"
            placeholder="Search students, companies, drives..."
            aria-label="Search the admin portal"
          />
        </label>

        <span className="admin-topbar-date">{currentDate}</span>

        <button
          className="admin-notification-button"
          type="button"
          aria-label="View notifications"
        >
          <Bell size={20} strokeWidth={1.8} />
          <span className="admin-notification-dot" />
        </button>

        <div className="admin-topbar-profile">
          <div className="admin-topbar-avatar">PO</div>

          <div>
            <p>Placement Officer</p>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}