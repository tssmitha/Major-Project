function EligibleDrives() {
  const drives = [
    {
      id: 1,
      company: "Infosys",
      role: "Systems Engineer",
      ctc: "₹3.6 LPA",
      location: "Bangalore",
      deadline: "20 July 2026",
      eligibleBranches: "CSE, ISE, ECE",
      minCgpa: "7.0",
      logoText: "Infosys",
      logoClass: "infosys-logo",
      isNew: true,
    },
    {
      id: 2,
      company: "Bosch",
      role: "Graduate Engineer Trainee",
      ctc: "₹6.5 LPA",
      location: "Bengaluru",
      deadline: "24 July 2026",
      eligibleBranches: "CSE, ECE, EEE",
      minCgpa: "7.5",
      logoText: "BOSCH",
      logoClass: "bosch-logo",
      isNew: true,
    },
  ];

  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel-header">
        <div>
          <h2>Eligible Drives</h2>
          <p>Drives you can currently apply for based on your profile.</p>
        </div>

        <a href="#">View All Drives →</a>
      </div>

      <div className="eligible-drives-grid">
        {drives.map((drive) => (
          <article className="eligible-drive-card" key={drive.id}>
            <div className="drive-card-top">
              <div className={`drive-logo ${drive.logoClass}`}>
                {drive.logoText}
              </div>

              <div className="drive-title-block">
                <div className="drive-title-row">
                  <h3>{drive.role}</h3>
                  {drive.isNew && <span className="new-drive-badge">New</span>}
                </div>

                <p>{drive.company}</p>
              </div>

              <button className="drive-save-btn" title="Save drive">
                ♡
              </button>
            </div>

            <div className="drive-info-grid">
              <p>
                <span>💰</span>
                {drive.ctc}
              </p>

              <p>
                <span>📍</span>
                {drive.location}
              </p>

              <p className="drive-deadline">
                <span>📅</span>
                Deadline: {drive.deadline}
              </p>

              <p>
                <span>🎓</span>
                Eligible: {drive.eligibleBranches}
              </p>

              <p>
                <span>📊</span>
                Min CGPA: {drive.minCgpa}
              </p>
            </div>

            <button className="apply-now-btn">Apply Now</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EligibleDrives;