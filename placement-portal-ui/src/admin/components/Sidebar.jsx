import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Building2,
  FileText,
  GraduationCap,
  MessageSquare,
  Megaphone,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const adminNavigation = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Drives",
    path: "/admin/drives",
    icon: BriefcaseBusiness,
  },
  {
    label: "Companies",
    path: "/admin/companies",
    icon: Building2,
  },
  {
    label: "Applications",
    path: "/admin/applications",
    icon: FileText,
  },
  {
    label: "Students",
    path: "/admin/students",
    icon: GraduationCap,
  },
];

const communicationNavigation = [
  {
    label: "Queries",
    path: "/admin/queries",
    icon: MessageSquare,
  },
  {
    label: "Announcements",
    path: "/admin/announcements",
    icon: Megaphone,
  },
];

export default function AdminSidebar({ isCollapsed, onToggle }) {
  return (
    <aside className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="admin-sidebar-brand">
        <button
          className="admin-sidebar-toggle"
          type="button"
          onClick={onToggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight size={17} />
          ) : (
            <ChevronLeft size={17} />
          )}
        </button>

        <div className="admin-brand-text">
          <h2>NIE Placements</h2>
          <p>Administration</p>
        </div>
      </div>

      <nav className="admin-sidebar-navigation">
        <p className="admin-navigation-label">OPERATIONS</p>

        {adminNavigation.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={path}
            end={end}
            className={({ isActive }) =>
              `admin-navigation-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}

        <p className="admin-navigation-label communication-label">
          COMMUNICATION
        </p>

        {communicationNavigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `admin-navigation-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-profile">
          <div className="admin-profile-avatar">PO</div>

          <div>
            <p className="admin-profile-name">Placement Officer</p>
            <p className="admin-profile-role">Administrator</p>
          </div>
        </div>

        <button className="admin-logout-button" type="button">
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}