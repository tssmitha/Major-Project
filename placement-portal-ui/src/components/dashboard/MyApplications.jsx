function MyApplications() {
const applications = [
  {
    company: "TCS",
    role: "Ninja",
    status: "Applied",
    updated: "08 July 2026",
    logo: "https://logo.clearbit.com/tcs.com",
    statusClass: "applied",
  },
  {
    company: "Bosch",
    role: "GET",
    status: "Shortlisted",
    updated: "07 July 2026",
    logo: "https://logo.clearbit.com/bosch.com",
    statusClass: "shortlisted",
  },
  {
    company: "Accenture",
    role: "ASE",
    status: "In Progress",
    updated: "06 July 2026",
    logo: "https://logo.clearbit.com/accenture.com",
    statusClass: "progress",
  },
  {
    company: "Deloitte",
    role: "Analyst",
    status: "Rejected",
    updated: "04 July 2026",
    logo: "https://logo.clearbit.com/deloitte.com",
    statusClass: "rejected",
  },
];

  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel-header">
        <div>
          <h2>My Applications</h2>
          <p>Track your application status across placement drives.</p>
        </div>

        <a href="#">View All Applications →</a>
      </div>

      <div className="applications-table">
        <div className="applications-row applications-head">
          <span>Company</span>
          <span>Role</span>
          <span>Status</span>
          <span>Last Updated</span>
        </div>

        {applications.map((app) => (
          <div className="applications-row" key={`${app.company}-${app.role}`}>
            <span className="application-company">
                <span className="application-logo">
                    <img src={app.logo} alt={`${app.company} logo`} />
                </span>
                {app.company}
            </span>

            <span>{app.role}</span>

            <span>
              <em className={`application-status ${app.statusClass}`}>
                {app.status}
              </em>
            </span>

            <span className="application-date">{app.updated}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyApplications;