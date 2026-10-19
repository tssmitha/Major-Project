function ProfileCompletion() {
  const profileItems = [
    {
      label: "Profile Updated",
      completed: true,
    },
    {
      label: "CGPA Added",
      completed: true,
    },
    {
      label: "Resume Uploaded",
      completed: true,
    },
    {
      label: "Skills Added",
      completed: false,
    },
  ];

  return (
    <section className="dashboard-side-card profile-completion-card">
      <h2>Profile Completion</h2>

      <div className="profile-completion-content">
        <div className="profile-progress-ring">
          <span>85%</span>
        </div>

        <div className="profile-checklist">
          {profileItems.map((item) => (
            <p
              key={item.label}
              className={item.completed ? "completed" : "pending"}
            >
              <span>{item.completed ? "✓" : "○"}</span>
              {item.label}
            </p>
          ))}
        </div>
      </div>

      <p className="profile-note">Great! Keep it up.</p>
    </section>
  );
}

export default ProfileCompletion;