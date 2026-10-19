import "../../styles/Home/TopRecruiters.css";

const recruiters = [
  "Amazon",
  "SAP",
  "Microsoft",
  "Bosch",
  "Schneider Electric",
  "Mercedes-Benz",
  "Deloitte",
];

function TopRecruiters() {
  return (
    <section className="top-recruiters">
      <div className="section-header">
        <h2>Top Recruiters</h2>
        <a href="#">View All Recruiters →</a>
      </div>

      <div className="recruiter-row">
        {recruiters.map((name) => (
          <div className="recruiter-logo" key={name}>
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopRecruiters;