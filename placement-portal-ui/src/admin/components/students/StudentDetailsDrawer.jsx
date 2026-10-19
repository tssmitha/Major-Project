import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDetailsDrawer({
  student,
  onClose,
}) {
  if (!student) return null; // Guard clause if no student object is provided


const [activeTab, setActiveTab] = useState("PROFILE");

const navigate = useNavigate();

function handleViewPlacementRecord() {
  navigate(`/admin/students/${student.id}`);
}

  return (
    <>
      <div
        className="student-drawer-overlay"
        onClick={onClose}
      />

      <aside className="student-details-drawer">
        <div className="student-drawer-header">
          <h2>Student Details</h2>

          <button
            type="button"
            className="student-drawer-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="student-drawer-profile">
          <div className="student-drawer-avatar">
            {student.name?.charAt(0)}
          </div>

          <div>
            <div className="student-drawer-name">
              <h3>{student.name}</h3>

              <span
                className={
                  student.placed
                    ? "student-status placed"
                    : "student-status unplaced"
                }
              >
                {student.placed ? "Placed" : "Unplaced"}
              </span>
            </div>

            <p>{student.usn}</p>
            <span>{student.branch}</span>
          </div>
        </div>

        <div className="student-drawer-tabs">
        <button
            type="button"
            className={activeTab === "PROFILE" ? "active" : ""}
            onClick={() => setActiveTab("PROFILE")}
        >
            Profile
        </button>

        <button
            type="button"
            className={activeTab === "PLACEMENT" ? "active" : ""}
            onClick={() => setActiveTab("PLACEMENT")}
        >
            Placement Record
        </button>

        <button
            type="button"
            className={activeTab === "APPLICATIONS" ? "active" : ""}
            onClick={() => setActiveTab("APPLICATIONS")}
        >
            Applications
        </button>
        </div>

        {activeTab === "PROFILE" && (
        <div className="student-drawer-content">
            <h4>Academic Information</h4>

            <div className="student-info-grid">
            <div>
                <span>USN</span>
                <strong>{student.usn}</strong>
            </div>

            <div>
                <span>Branch</span>
                <strong>{student.branch}</strong>
            </div>

            <div>
                <span>Semester</span>
                <strong>{student.semester}</strong>
            </div>

            <div>
                <span>CGPA</span>
                <strong>{student.cgpa.toFixed(2)}</strong>
            </div>
            </div>

            <h4>Contact Information</h4>

            <div className="student-contact-info">
            <div>
                <span>Email</span>
                <strong>{student.email}</strong>
            </div>

            <div>
                <span>Phone</span>
                <strong>{student.phone}</strong>
            </div>
            </div>
        </div>
)}

        <div className="student-drawer-section">
  <h4>Placement Summary</h4>

  <div className="student-placement-summary">
    <div className="student-placement-row">
      <span>Current Status</span>

      <span
        className={
          student.placed
            ? "student-status placed"
            : "student-status unplaced"
        }
      >
        {student.placed ? "Placed" : "Unplaced"}
      </span>
    </div>

    {student.placed && student.offer && (
      <>
        <div className="student-placement-row">
          <span>Company</span>
          <strong>{student.offer.company}</strong>
        </div>

        <div className="student-placement-row">
          <span>Role</span>
          <strong>{student.offer.role}</strong>
        </div>

        <div className="student-placement-row">
          <span>Package</span>
          <strong>{student.offer.ctc}</strong>
        </div>

        <div className="student-placement-row">
          <span>Joining Date</span>
          <strong>{student.offer.joiningDate}</strong>
        </div>
      </>
    )}
  </div>
</div>

    <button
        type="button"
        className="student-full-record-button"
        onClick={handleViewPlacementRecord}
        >
        View Complete Placement Record →
    </button>

      
      </aside>
    </>
  );
}