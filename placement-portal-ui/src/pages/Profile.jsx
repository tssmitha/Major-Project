import "./Profile.css";
import { useEffect, useRef, useState } from "react";
import {
  Eye,
  FileText,
  RefreshCw,
  Upload,
} from "lucide-react";
import ProfileSummary from "../components/profile/ProfileSummary";
import PersonalDetails from "../components/profile/PersonnelDetails";
import PlacementJourney from "../components/profile/ProfileJourney";
import OtherApplications from "../components/profile/OtherApplications";

const student = {
  name: "Test Student",
  usn: "4NI21CS107",
  branch: "Computer Science",
  graduationYear: 2025,
  isPlaced: false,
  email: "2022student_test_c@nie.ac.in",

  academic: {
    cgpa: 8.85,
    semester: 8,
    activeBacklogs: 0,
    totalBacklogs: 0,
    tenthPercentage: 92,
    twelfthPercentage: 90,
    resumeUrl: null,
    verified: true,
  },

  applications: [
    {
      id: 1,
      companyName: "Thoughtworks",
      role: "Graduate Software Developer",
      appliedDate: "2026-09-08",
      currentStage: "TECHNICAL_ROUND",
      status: "IN_PROGRESS",
    },
    {
      id: 2,
      companyName: "Amazon",
      role: "Software Development Engineer",
      appliedDate: "2026-08-27",
      currentStage: "ONLINE_ASSESSMENT",
      status: "REJECTED",
    },
    {
      id: 3,
      companyName: "Wipro",
      role: "Cybersecurity Intern",
      appliedDate: "2026-09-17",
      currentStage: "APPLIED",
      status: "IN_PROGRESS",
    },
    {
      id: 4,
      companyName: "DevRev",
      role: "Software Engineer",
      appliedDate: "2026-09-13",
      currentStage: "SELECTED",
      status: "SELECTED",
    },
  ],
};

function Profile() {
    const [student, setStudent] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState("");
    const fileInputRef = useRef(null);
    const [resume, setResume] = useState(null);
    const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
    const [resumeError, setResumeError] = useState("");

    useEffect(() => {
        return () => {
        if (resumePreviewUrl) {
            URL.revokeObjectURL(resumePreviewUrl);
        }
        };
    }, [resumePreviewUrl]);

    useEffect(() => {
  const fetchStudentProfile = async () => {
    try {
      setProfileLoading(true);
      setProfileError("");

      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!storedUser?.token) {
        throw new Error(
          "Please log in to view your profile."
        );
      }

      const requestOptions = {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      };

      const profileResponse = await fetch(
        "http://localhost:8081/profile",
        requestOptions
      );

      if (!profileResponse.ok) {
        throw new Error(
          `Unable to load profile (${profileResponse.status})`
        );
      }

      const applicationsResponse = await fetch(
        "http://localhost:8081/profile/applications",
        requestOptions
      );

      if (!applicationsResponse.ok) {
        throw new Error(
          `Unable to load applications (${applicationsResponse.status})`
        );
      }

      const profileData = await profileResponse.json();
      const applicationsData =
        await applicationsResponse.json();

      const formattedApplications = applicationsData.map(
        (application) => ({
          id: application.id,
          companyName: application.companyName,
          role: application.role,
          appliedDate: application.appliedAt,
          currentStage: application.currentStatus,

          status:
            application.currentStatus === "SELECTED" ||
            application.currentStatus === "REJECTED" ||
            application.currentStatus === "WITHDRAWN"
              ? application.currentStatus
              : "IN_PROGRESS",
        })
      );

      setStudent({
        ...profileData,

        academic: profileData.academic ?? {
          cgpa: null,
          semester: null,
          activeBacklogs: null,
          totalBacklogs: null,
          tenthPercentage: null,
          twelfthPercentage: null,
          resumeUrl: null,
          verified: false,
        },

        applications: formattedApplications,
      });
    } catch (error) {
      setProfileError(error.message);
    } finally {
      setProfileLoading(false);
    }
  };

  fetchStudentProfile();
}, []);

    const handleResumeSelect = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
          return;
      }

  const isPdf =
    selectedFile.type === "application/pdf" ||
    selectedFile.name.toLowerCase().endsWith(".pdf");

  const maximumSize = 5 * 1024 * 1024;

  if (!isPdf) {
    setResumeError("Please upload a PDF file only.");
    event.target.value = "";
    return;
  }

  if (selectedFile.size > maximumSize) {
    setResumeError("Resume must be smaller than 5 MB.");
    event.target.value = "";
    return;
  }

  if (resumePreviewUrl) {
    URL.revokeObjectURL(resumePreviewUrl);
  }

  setResume(selectedFile);
  setResumePreviewUrl(null);
  setResumeError("");
};

    const handlePreviewResume = () => {
      if (!resume) {
        return;
      }

  let previewUrl = resumePreviewUrl;

    if (!previewUrl) {
      previewUrl = URL.createObjectURL(resume);
      setResumePreviewUrl(previewUrl);
    }

    window.open(previewUrl, "_blank", "noopener,noreferrer");
  };

  const openResumePicker = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (sizeInBytes) => {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  if (profileLoading) {
  return (
    <main className="profile-page">
      <p>Loading profile...</p>
    </main>
  );
}

if (profileError) {
  return (
    <main className="profile-page">
      <section className="profile-error-state">
        <h2>Unable to load profile</h2>
        <p>{profileError}</p>
      </section>
    </main>
  );
}

if (!student) {
  return null;
}


  return (  
    <main className="profile-page">
      <section className="profile-page-heading">
        <div>
          <h1>Student Profile</h1>
          <p>
            Keep your personal, academic, and placement details
            updated.
          </p>
        </div>

        <button type="button" className="profile-edit-button">
          Edit Profile
        </button>
      </section>

    <ProfileSummary student={student} />
    <div className="profile-content-grid">
  <div className="profile-main-content">
    <PersonalDetails student={student} />

    {/* AcademicDetails will come here */}
  </div>

  <aside className="profile-sidebar">
    <section className="profile-sidebar-card resume-card">
      <div className="sidebar-card-heading">
        <div className="sidebar-card-icon">
          <FileText size={20} />
        </div>

        <div>
          <h2>Resume</h2>
          <p>PDF format, maximum 5 MB</p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        hidden
        onChange={handleResumeSelect}
      />

      {resume ? (
        <div className="resume-file">
          <div className="resume-file-details">
            <FileText size={21} />

            <div>
              <strong>{resume.name}</strong>
              <span>{formatFileSize(resume.size)}</span>
            </div>
          </div>

          <button
            type="button"
            className="resume-preview-button"
            onClick={handlePreviewResume}
            aria-label="Preview resume"
          >
            <Eye size={18} />
          </button>
        </div>
      ) : (
        <div className="resume-empty">
          <Upload size={24} />
          <strong>No resume uploaded</strong>
          <span>Upload your latest resume to apply for drives.</span>
        </div>
      )}

      {resumeError && (
        <p className="resume-error">{resumeError}</p>
      )}

      <button
        type="button"
        className="resume-upload-button"
        onClick={openResumePicker}
      >
        {resume ? (
          <>
            <RefreshCw size={17} />
            Replace Resume
          </>
        ) : (
          <>
            <Upload size={17} />
            Upload Resume
          </>
        )}
      </button>
    </section>
</aside>
</div>

<OtherApplications applications={student.applications} />
    </main>
  );
}

export default Profile;