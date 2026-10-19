function TpoAnnouncements() {
  const announcements = [
    {
      title: "Resume submission deadline",
      date: "12 Jul",
      type: "Deadline",
    },
    {
      title: "Accenture pre-placement talk tomorrow",
      date: "09 Jul",
      type: "PPT",
    },
    {
      title: "Update CGPA before applying",
      date: "07 Jul",
      type: "Profile",
    },
  ];

  return (
    <section className="dashboard-side-card announcements-card">
      <div className="side-card-header">
        <h2>TPO Announcements</h2>
        <a href="#">View All</a>
      </div>

      <div className="announcement-list">
        {announcements.map((item) => (
          <article className="announcement-item" key={item.title}>
            <div>
              <span className="announcement-type">{item.type}</span>
              <p>{item.title}</p>
            </div>

            <small>{item.date}</small>
          </article>
        ))}
      </div>

      <a className="side-card-link" href="#">
        All announcements →
      </a>
    </section>
  );
}

export default TpoAnnouncements;