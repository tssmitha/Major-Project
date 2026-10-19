const offerData = [
  {
    id: "zero",
    label: "Zero offers",
    value: 184,
    colorClass: "zero-offers",
  },
  {
    id: "single",
    label: "One offer",
    value: 363,
    colorClass: "single-offer",
  },
  {
    id: "multiple",
    label: "Multiple offers",
    value: 65,
    colorClass: "multiple-offers",
  },
];

export default function OfferDistribution() {
  const totalStudents = offerData.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <section className="admin-dashboard-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Offer distribution</h2>
          <p>
            Distribution of offers among eligible students.
          </p>
        </div>

        <span className="offer-total">
          {totalStudents} students
        </span>
      </div>

      <div className="offer-legend">
        {offerData.map((item) => (
          <div className="offer-legend-item" key={item.id}>
            <span
              className={`offer-legend-dot ${item.colorClass}`}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div
        className="offer-distribution-bar"
        aria-label="Student offer distribution"
      >
        {offerData.map((item) => {
          const percentage =
            (item.value / totalStudents) * 100;

          return (
            <div
              className={`offer-bar-section ${item.colorClass}`}
              style={{ width: `${percentage}%` }}
              key={item.id}
              title={`${item.label}: ${item.value} (${percentage.toFixed(
                1
              )}%)`}
            >
              <strong>{item.value}</strong>
            </div>
          );
        })}
      </div>

      <div className="offer-distribution-details">
        {offerData.map((item) => (
          <div key={item.id}>
            <strong>
              {((item.value / totalStudents) * 100).toFixed(1)}%
            </strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}