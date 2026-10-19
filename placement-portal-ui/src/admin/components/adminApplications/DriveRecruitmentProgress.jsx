import "./DriveRecruitmentProgress.css";

export default function DriveRecruitmentProgress({ rounds }) {
  function formatDate(date) {
    if (!date) {
      return null;
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <section className="drive-recruitment-progress">
      <header className="drive-progress-heading">
        <div>
          <h2>Recruitment progress</h2>
          <p>Track how students progressed through each recruitment stage.</p>
        </div>
      </header>

      <div className="drive-progress-timeline">
        {rounds.map((round, index) => (
          <article
            className={`drive-progress-round ${round.status.toLowerCase()}`}
            key={round.id}
          >
            <div className="drive-progress-marker">
              <span>{index + 1}</span>
            </div>

            <div className="drive-progress-round-content">
              <div>
                <h3>{round.name}</h3>

                <span
                  className={`drive-round-status ${round.status.toLowerCase()}`}
                >
                  {round.status.replace("_", " ")}
                </span>
              </div>

              <strong>{round.studentCount} students</strong>

              {round.completedOn && (
                <p>Completed on {formatDate(round.completedOn)}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}