function QuickActions() {
  const actions = [
    {
      label: "Upload Resume",
      icon: "⬆",
    },
    {
      label: "View Drives",
      icon: "💼",
    },
    {
      label: "My Profile",
      icon: "👤",
    },
    {
      label: "Raise Query",
      icon: "💬",
    },
  ];

  return (
    <section className="dashboard-side-card quick-actions-card">
      <h2>Quick Actions</h2>

      <div className="quick-actions-grid">
        {actions.map((action) => (
          <button className="quick-action-btn" key={action.label}>
            <span>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;