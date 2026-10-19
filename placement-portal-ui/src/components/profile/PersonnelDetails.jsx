function DetailItem({ label, value }) {
  return (
    <div className="profile-detail-item">
      <span>{label}</span>
      <strong>{value ?? "Not provided"}</strong>
    </div>
  );
}

export default function PersonalDetails({ student }) {
  return (
    <section className="profile-section">
      <h2>Personal Details</h2>

      <div className="profile-details-grid">
        <DetailItem
          label="Full Name"
          value={student.name}
        />

        <DetailItem
          label="USN"
          value={student.usn}
        />

        <DetailItem
          label="College Email"
          value={student.email}
        />

        <DetailItem
          label="Branch"
          value={student.branch}
        />

        <DetailItem
          label="Graduation Year"
          value={student.graduationYear}
        />

        <DetailItem
          label="Placement Status"
          value={student.isPlaced ? "Placed" : "Not placed"}
        />
      </div>
    </section>
  );
}