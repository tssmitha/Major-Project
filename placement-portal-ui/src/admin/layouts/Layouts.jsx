import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Sidebar";
import AdminTopbar from "../components/Topbar";
import "../styles/Layout.css";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`admin-layout ${isCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((current) => !current)}
      />

      <div className="admin-layout-main">
        <AdminTopbar />

        <div className="admin-layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}