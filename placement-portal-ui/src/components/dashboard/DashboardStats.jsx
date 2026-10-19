function DashboardStats() {
  const stats = [
    {
      title: "Eligible Drives",
      value: "3",
      subtitle: "3 new this week",
      icon: "💼",
      tone: "gold",
    },
    {
      title: "My Applications",
      value: "4",
      subtitle: "2 in progress",
      icon: "📄",
      tone: "blue",
    },
    {
      title: "Shortlisted",
      value: "2",
      subtitle: "In next round",
      icon: "👥",
      tone: "green",
    },
    {
      title: "Offers",
      value: "0",
      subtitle: "No offers yet",
      icon: "🎁",
      tone: "purple",
    },
  ];

  return (
    <section className="dashboard-stats-grid">
      {stats.map((stat) => (
        <article className="dashboard-stat-card" key={stat.title}>
          <div className={`dashboard-stat-icon ${stat.tone}`}>
            {stat.icon}
          </div>

          <div>
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
            <span>{stat.subtitle}</span>
          </div>
        </article>
      ))}
    </section>
  );
}

export default DashboardStats;