const branchPlacementData = [
  { branch: "CSE", eligible: 160, placed: 132 },
  { branch: "ISE", eligible: 120, placed: 98 },
  { branch: "ECE", eligible: 110, placed: 74 },
  { branch: "EEE", eligible: 90, placed: 52 },
  { branch: "ME", eligible: 90, placed: 48 },
  { branch: "CV", eligible: 42, placed: 24 },
];

export default function BranchPlacement() {
  return (
    <section className="admin-dashboard-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Branch-wise placement</h2>
          <p>Placement performance among eligible students.</p>
        </div>
      </div>

      <div className="branch-placement-list">
        {branchPlacementData.map((item) => {
          const percentage = (
            (item.placed / item.eligible) *
            100
          ).toFixed(1);

          return (
            <div className="branch-placement-row" key={item.branch}>
              <strong className="branch-name">{item.branch}</strong>

              <div className="branch-progress">
                <div
                  className="branch-progress-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="branch-count">
                {item.placed} / {item.eligible}
              </span>

              <strong className="branch-percentage">
                {percentage}%
              </strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}