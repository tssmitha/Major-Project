import "../styles/AdminDashboard.css";
import PlacementTrend from "../components/admin-dashboard/Placement-trends";
import PackageTrend from "../components/admin-dashboard/PackageTrends";
import BranchPlacement from "../components/admin-dashboard/BranchPlacement";
import OfferDistribution from "../components/admin-dashboard/OfferDistribution";
import RecruitmentFunnel from "../components/admin-dashboard/RecruitmentFunnel";
import CompanyOverview from "../components/admin-dashboard/CompanyOverview";

const summaryData = [
  {
    id: 1,
    label: "Eligible students",
    value: "612",
    trend: "6% vs. 2024–25",
    trendType: "positive",
  },
  {
    id: 2,
    label: "Students placed",
    value: "428",
    trend: "12% vs. 2024–25",
    trendType: "positive",
  },
  {
    id: 3,
    label: "Unplaced students",
    value: "184",
    trend: "18% vs. 2024–25",
    trendType: "negative",
  },
  {
    id: 4,
    label: "Placement rate",
    value: "69.9%",
    trend: "6.1 pp vs. 2024–25",
    trendType: "positive",
  },
  {
    id: 5,
    label: "Total offers",
    value: "493",
    trend: "14% vs. 2024–25",
    trendType: "positive",
  },
  {
    id: 6,
    label: "Companies visited",
    value: "76",
    trend: "19% vs. 2024–25",
    trendType: "positive",
  },
];

export default function AdminDashboard() {
  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard-header">
        <div>
          <p className="admin-dashboard-label">PLACEMENT OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="admin-dashboard-description">
            A complete view of placement performance for the current academic
            year.
          </p>
        </div>

        <select
          className="admin-dashboard-year"
          defaultValue="2025-26"
          aria-label="Select academic year"
        >
          <option value="2025-26">2025–26</option>
          <option value="2024-25">2024–25</option>
          <option value="2023-24">2023–24</option>
        </select>
      </header>

      <section
        className="admin-dashboard-summary"
        aria-label="Placement summary"
      >
        {summaryData.map((item) => (
          <article className="admin-summary-card" key={item.id}>
            <p className="admin-summary-label">{item.label}</p>

            <strong className="admin-summary-value">
              {item.value}
            </strong>

            <p className={`admin-summary-trend ${item.trendType}`}>
              <span aria-hidden="true">
                {item.trendType === "positive" ? "↑" : "↓"}
              </span>
              {item.trend}
            </p>
          </article>
        ))}
      </section>

      <div className="admin-dashboard-sections">
        <PlacementTrend />
        <PackageTrend />
        <BranchPlacement />
        <OfferDistribution />
        <RecruitmentFunnel />
        <CompanyOverview />
      </div>
    </main>
  );
}