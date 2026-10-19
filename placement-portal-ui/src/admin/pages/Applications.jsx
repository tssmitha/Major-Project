import { useState } from "react";

import { companyDrives } from "../components/adminApplications/ApplicationsData";
import DriveApplicationsTable from "../components/adminApplications/DriveApplicationTable";

import "../styles/AdminApplications.css";

const applicationSummary = [
  {
    id: 1,
    label: "Total Drives Conducted",
    value: 48,
    helperText: "Across the 2025–26 placement cycle",
  },
  {
    id: 2,
    label: "Active Drives",
    value: 7,
    helperText: "Applications or rounds in progress",
  },
  {
    id: 3,
    label: "Total Offers Till Date",
    value: 126,
    helperText: "Across all completed and active drives",
  },
  {
    id: 4,
    label: "Pending Updates",
    value: 4,
    helperText: "Drives requiring result updates",
  },
];

 const ACADEMIC_YEAR_START_MONTH = 6; // July; January is 0

export default function AdminApplications() {
  const [driveSearch, setDriveSearch] = useState("");
  const [driveStatus, setDriveStatus] = useState("ALL");
  const [postedPeriod, setPostedPeriod] = useState("ALL");

  function handleResetFilters() {
    setDriveSearch("");
    setDriveStatus("ALL");
    setPostedPeriod("ALL");
  }

  const filteredDrives = companyDrives.filter((drive) => {
  const searchValue = driveSearch.trim().toLowerCase();

  const matchesSearch =
    drive.company.toLowerCase().includes(searchValue) ||
    drive.role.toLowerCase().includes(searchValue);

  const matchesStatus =
    driveStatus === "ALL" || drive.status === driveStatus;

  const matchesDate = matchesPostedPeriod(
    drive.postedDate,
    postedPeriod
  );

  return matchesSearch && matchesStatus && matchesDate;
});


    function matchesPostedPeriod(postedDate, period) {
    if (period === "ALL") {
        return true;
    }

    const date = new Date(`${postedDate}T00:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const daysSinceMonday = (today.getDay() + 6) % 7;

    const thisMonday = new Date(today);
    thisMonday.setDate(today.getDate() - daysSinceMonday);

    if (period === "TODAY") {
        return date.getTime() === today.getTime();
    }

    if (period === "THIS_WEEK") {
        return date >= thisMonday && date <= today;
    }

    if (period === "LAST_WEEK") {
        const lastMonday = new Date(thisMonday);
        lastMonday.setDate(thisMonday.getDate() - 7);

        const lastSunday = new Date(thisMonday);
        lastSunday.setDate(thisMonday.getDate() - 1);

        return date >= lastMonday && date <= lastSunday;
    }

    if (period === "THIS_MONTH") {
        return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
        );
    }

    if (period === "LAST_MONTH") {
        const lastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
        );

    return (
      date.getMonth() === lastMonth.getMonth() &&
      date.getFullYear() === lastMonth.getFullYear()
    );
  }

    if (period === "ACADEMIC_YEAR") {
        const academicYearStartYear =
        today.getMonth() >= ACADEMIC_YEAR_START_MONTH
            ? today.getFullYear()
            : today.getFullYear() - 1;

        const academicYearStart = new Date(
        academicYearStartYear,
        ACADEMIC_YEAR_START_MONTH,
        1
        );

    return date >= academicYearStart && date <= today;
  }

    return true;
}

  return (
    <main className="admin-applications-page">
      <header className="admin-applications-header">
        <div>
          <p className="admin-applications-label">PLACEMENT OPERATIONS</p>
          <h1>Applications</h1>
          <p>
            Track company drives, student applications and recruitment progress.
          </p>
        </div>
      </header>

      <section className="admin-applications-summary">
        {applicationSummary.map((item) => (
          <article className="admin-application-summary-card" key={item.id}>
            <p>{item.label}</p>
            <h2>{item.value}</h2>
            <span>{item.helperText}</span>
          </article>
        ))}
      </section>

      <section className="admin-drive-filters">
        <div className="admin-drive-filters-heading">
          <div>
            <h2>Company drives</h2>
            <p>
              Browse application activity and recruitment progress by company.
            </p>
          </div>

          <button
            type="button"
            className="admin-filter-reset"
            onClick={handleResetFilters}
          >
            Reset filters
          </button>
        </div>

        <div className="admin-drive-filter-grid">
          <div className="admin-filter-field admin-drive-search-field">
            <label htmlFor="driveSearch">Search drives</label>

            <input
              id="driveSearch"
              type="search"
              value={driveSearch}
              placeholder="Search by company or role"
              onChange={(event) => setDriveSearch(event.target.value)}
            />
          </div>

          <div className="admin-filter-field">
            <label htmlFor="driveStatus">Drive status</label>

            <select
              id="driveStatus"
              value={driveStatus}
              onChange={(event) => setDriveStatus(event.target.value)}
            >
              <option value="ALL">All statuses</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="admin-filter-field">
            <label htmlFor="postedPeriod">Date posted</label>

            <select
                id="postedPeriod"
                value={postedPeriod}
                onChange={(event) => setPostedPeriod(event.target.value)}
                >
                <option value="ALL">All time</option>
                <option value="TODAY">Today</option>
                <option value="THIS_WEEK">This week</option>
                <option value="LAST_WEEK">Last week</option>
                <option value="THIS_MONTH">This month</option>
                <option value="LAST_MONTH">Last month</option>
                <option value="ACADEMIC_YEAR">This academic year</option>
            </select>
          </div>
        </div>

         <section className="company-drive-application-list">
            <DriveApplicationsTable drives={filteredDrives} />
        </section>
      </section>    
    </main>
  );
}