import { useLocation } from "react-router-dom";

function MyApplications() {
  const location = useLocation();

  const submittedDrive = location.state?.drive;
  const applicationSubmitted =
    location.state?.applicationSubmitted;

  return (
    <main>
      <h1>My Applications</h1>

      {applicationSubmitted && submittedDrive && (
        <p>
          Your application for {submittedDrive.role} at{" "}
          {submittedDrive.company} was submitted successfully.
        </p>
      )}
    </main>
  );
}

export default MyApplications;