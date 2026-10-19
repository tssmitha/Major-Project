const funnelStages = [
  {
    id: 1,
    label: "Registered students",
    value: 650,
    unit: "total",
  },
  {
    id: 2,
    label: "Applications",
    value: 118,
    unit: "avg. per drive",
  },
  {
    id: 3,
    label: "Shortlisted",
    value: 42,
    unit: "avg. per drive",
  },
  {
    id: 4,
    label: "Interviewed",
    value: 28,
    unit: "avg. per drive",
  },
  {
    id: 5,
    label: "Offers",
    value: 9,
    unit: "avg. per drive",
  },
];

export default function RecruitmentFunnel() {
  return (
    <section className="admin-dashboard-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Recruitment funnel</h2>
          <p>
            Average student progression through each placement drive.
          </p>
        </div>
      </div>

      <div className="recruitment-funnel">
        {funnelStages.map((stage, index) => {
          const previousStage = funnelStages[index - 1];

          const conversionRate =
            index > 1
              ? (
                  (stage.value / previousStage.value) *
                  100
                ).toFixed(1)
              : null;

          return (
            <div className="funnel-stage-wrapper" key={stage.id}>
              <article
                className={`funnel-stage ${
                  index === funnelStages.length - 1
                    ? "funnel-stage-final"
                    : ""
                }`}
              >
                <strong>{stage.value}</strong>
                <span>{stage.label}</span>
                <small>{stage.unit}</small>

                {conversionRate && (
                  <p className="funnel-conversion">
                    {conversionRate}% from previous stage
                  </p>
                )}
              </article>

              {index < funnelStages.length - 1 && (
                <span className="funnel-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}