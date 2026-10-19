function DashboardSidebar() {
  const menuItems = [
    {
      label: "Dashboard",
      icon: "🏠",
      active: true,
    },
    {
      label: "Drives",
      icon: "💼",
    },
    {
      label: "My Applications",
      icon: "📋",
    },
    {
      label: "Offers",
      icon: "🎯",
    },
    {
      label: "My Profile",
      icon: "👤",
    },
    {
      label: "Resume",
      icon: "📄",
    },
    {
      label: "TPO Queries",
      icon: "💬",
    },
    {
      label: "Announcements",
      icon: "📢",
    },
    {
      label: "Help & Support",
      icon: "❓",
    },
  ];

  return (
    <aside className="dashboard-sidebar">
      <nav className="dashboard-menu">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`dashboard-menu-item ${item.active ? "active" : ""}`}
          >
            <span className="dashboard-menu-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <button className="dashboard-menu-item logout">
          <span className="dashboard-menu-icon">↪</span>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default DashboardSidebar;