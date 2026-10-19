function DashboardHeader() {
  const student = {
    name: "Smitha",
    fullName: "Smitha T S",
    branch: "CSE",
    batch: "2025",
    isPlaced: false,
    placedCompany: null,
    placedRole: null,
    newEligibleDrives: 3,
    totalEligibleDrives: 3,
  };

  return (
    <section className="dashboard-header">
      <div>
        <p className="dashboard-eyebrow">Student Dashboard</p>

        <h1>
          {student.isPlaced
            ? `Congratulations, ${student.name} 🎉`
            : `Welcome back, ${student.name} 👋`}
        </h1>

        {student.isPlaced ? (
          <p className="dashboard-subtitle">
            You are placed at{" "}
            <strong>{student.placedCompany}</strong> as{" "}
            <strong>{student.placedRole}</strong>. You can still view placement
            updates and your application history.
          </p>
        ) : (
          <p className="dashboard-subtitle">
            You have{" "}
            <strong>{student.newEligibleDrives} new eligible drives</strong>{" "}
            this week. Track your placement activity, eligible drives and
            updates.
          </p>
        )}

        <div className="dashboard-header-actions">
          {!student.isPlaced ? (
            <>
              <button className="dashboard-primary-btn">
                <span>{student.totalEligibleDrives}</span>
                Eligible Drives
              </button>

              <button className="dashboard-secondary-btn">
                View All Drives
              </button>
            </>
          ) : (
            <button className="dashboard-primary-btn">
              View Offer Details
            </button>
          )}
        </div>
      </div>

      <div className="dashboard-status-card">
        <div className="student-avatar">S</div>

        <div className="student-status-info">
          <h3>{student.fullName}</h3>
          <p>
            {student.branch} • {student.batch} Batch
          </p>

          <div className="placement-status-box">
            <span>Placement Status</span>

            {student.isPlaced ? (
              <strong className="placed-status">
                Placed at {student.placedCompany}
              </strong>
            ) : (
              <strong className="not-placed-status">Not Placed</strong>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardHeader;