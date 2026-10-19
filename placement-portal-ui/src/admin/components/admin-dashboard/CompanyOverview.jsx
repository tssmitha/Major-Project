const companyMetrics = [
  {
    id: 1,
    label: "Companies visited",
    value: 76,
    trend: "19% vs. 2024–25",
  },
  {
    id: 2,
    label: "New companies",
    value: 18,
    trend: "50% vs. 2024–25",
  },
  {
    id: 3,
    label: "Recurring companies",
    value: 58,
    trend: "12% vs. 2024–25",
  },
];

const topRecruiters = [
  { id: 1, company: "Infosys", hires: 42 },
  { id: 2, company: "Deloitte", hires: 31 },
  { id: 3, company: "Bosch", hires: 24 },
  { id: 4, company: "Accenture", hires: 21 },
];

export default function CompanyOverview() {
  return (
    <section className="admin-dashboard-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Company overview</h2>
          <p>
            Recruiter participation and hiring contribution.
          </p>
        </div>
      </div>

     <div className="company-overview-content">
  <div className="company-overview-metrics">
    {companyMetrics.map((metric) => (
      <article className="company-overview-metric" key={metric.id}>
        <div>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </div>

        <small>↑ {metric.trend}</small>
      </article>
    ))}
  </div>

  <div className="top-recruiters">
    <div className="top-recruiters-heading">
      <div>
        <h3>Top recruiters</h3>
        <p>Companies with the highest number of hires.</p>
      </div>

      <span>Hires</span>
    </div>

    <div className="top-recruiters-list">
      {topRecruiters.map((recruiter, index) => {
        const maximumHires = topRecruiters[0].hires;
        const width = (recruiter.hires / maximumHires) * 100;

        return (
          <div className="top-recruiter-row" key={recruiter.id}>
            <span className="recruiter-rank">{index + 1}</span>

            <strong>{recruiter.company}</strong>

            <div className="recruiter-progress">
              <div
                className="recruiter-progress-fill"
                style={{ width: `${width}%` }}
              />
            </div>

            <span className="recruiter-hires">
              {recruiter.hires}
            </span>
          </div>
        );
      })}
    </div>
  </div>
</div>
    </section>
  );
}