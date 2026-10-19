import { useParams , useNavigate } from "react-router-dom";
import { drivesData } from "../data/drivesData";
import { useState } from "react";
import "../styles/ApplyDrive.css";

function ApplyDrive() {
    const { driveId } = useParams();

    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmed , setIsConfirmed] = useState(false);

    const selectedDrive = drivesData.find(
        (drive) => drive.id === Number(driveId)
    );

    const studentResume = {
        fileName: "Student_Resume.pdf",
        fileUrl: "/sample-resume.pdf",
    };

    const handleConfirmApplication = () => {
        if(isSubmitted || !isConfirmed){
            return;
        }
        navigate(`/drives/${selectedDrive.id}/apply/success`,{
            state :{
                drive : selectedDrive
            }}
        );

        setIsSubmitted(true);
    };

    if(!selectedDrive){
        return(
            <p>Drive not found</p>
        )
    }

   return (
  <main className="apply-page">
    <div className="apply-container">
      <div className="apply-header">
        <p className="apply-label">Placement Application</p>
        <h1>Review Your Application</h1>
        <p>
          Verify the drive details and resume before submitting.
        </p>
      </div>

      <section className="apply-card drive-review-card">
        <div className="apply-company-header">
          <img
            className="apply-company-logo"
            src={selectedDrive.logo}
            alt={`${selectedDrive.company} logo`}
          />

          <div>
            <h2>{selectedDrive.company}</h2>
            <p className="apply-role">{selectedDrive.role}</p>
          </div>
        </div>

        <div className="apply-details-grid">
          <div>
            <span>Location</span>
            <strong>{selectedDrive.location}</strong>
          </div>

          <div>
            <span>Employment Type</span>
            <strong>{selectedDrive.employmentType}</strong>
          </div>

          <div>
            <span>Package</span>
            <strong>{selectedDrive.ctcDisplay}</strong>
          </div>

          <div>
            <span>Application Deadline</span>
            <strong>{selectedDrive.deadline}</strong>
          </div>
        </div>
      </section>

      <section className="apply-card resume-review-card">
        <div>
          <h2>Resume</h2>
          <p>Resume selected for this application</p>
        </div>

        <div className="resume-file-row">
          <div className="resume-file-info">
            <span className="resume-icon">PDF</span>

            <div>
              <strong>{studentResume.fileName}</strong>
              <p>Uploaded from your student profile</p>
            </div>
          </div>

          <button
            className="secondary-button"
            type="button"
            onClick={() =>
              window.open(studentResume.fileUrl, "_blank")
            }
          >
            View Resume
          </button>
        </div>
      </section>

      <section className="apply-card confirmation-card">
        <h2>Confirmation</h2>

        <label className="confirmation-checkbox">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(event) =>
              setIsConfirmed(event.target.checked)
            }
            disabled={isSubmitted}
          />

          <span>
            I have verified the drive details and resume.
          </span>
        </label>

        {isSubmitted && (
          <p className="success-message">
            Application submitted successfully.
          </p>
        )}

        <div className="application-actions">
          <button
            className="secondary-button"
            type="button"
            onClick={() =>
              navigate(`/drives/${selectedDrive.id}`)
            }
          >
            Back to Drive Details
          </button>

          <button
            className="primary-button"
            type="button"
            onClick={handleConfirmApplication}
            disabled={!isConfirmed || isSubmitted}
          >
            {isSubmitted
              ? "Application Submitted"
              : "Confirm Application"}
          </button>
        </div>
      </section>
    </div>
  </main>
);
}

export default ApplyDrive;