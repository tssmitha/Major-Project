export default function ProfileSummary({ student }) {
  const academic = student.academic;

  const initials = student.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="profile-summary-card">
      <div className="profile-avatar">
        {initials || "ST"}
      </div>

      <div className="profile-summary-details">
        <h2>{student.name}</h2>

        <p>
          {student.usn} · {student.branch}
        </p>

        <div className="profile-summary-tags">
          <span>Batch {student.graduationYear}</span>

          {academic?.cgpa != null && (
            <span>CGPA {academic.cgpa.toFixed(2)}</span>
          )}

          {academic?.verified && (
            <span className="profile-ready-tag">
              Academics Verified
            </span>
          )}

          <span
            className={
              student.isPlaced
                ? "profile-ready-tag"
                : undefined
            }
          >
            {student.isPlaced ? "Placed" : "Not Placed"}
          </span>
        </div>
      </div>

      <div className="profile-completion">
        <span>Profile Completion</span>
        <strong>{academic?.resumeUrl ? "100%" : "85%"}</strong>

        <div className="profile-progress-track">
          <div
            className="profile-progress-value"
            style={{
              width: academic?.resumeUrl ? "100%" : "85%",
            }}
          />
        </div>

        <small>
          {academic?.resumeUrl
            ? "Your placement profile is complete"
            : "Upload your resume to complete the profile"}
        </small>
      </div>
    </section>
  );
}