import "../styles/Dashboard.css";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import EligibleDrives from "../components/dashboard/EligibleDrives";
import ProfileCompletion from "../components/dashboard/ProfileCompletion";
import TpoAnnouncements from "../components/dashboard/TpoAnnouncements";
import QuickActions from "../components/dashboard/QuickActions";
import MyApplications from "../components/dashboard/MyApplications";

function Dashboard() {
  return (
    <main className="dashboard-page">
      <DashboardHeader />
      <DashboardStats />

      <div className="dashboard-content-grid">
        <div className="dashboard-left-column">
          <EligibleDrives />
          <MyApplications />
        </div>

        <div className="dashboard-right-column">
          <ProfileCompletion />
          <TpoAnnouncements />
          <QuickActions />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;