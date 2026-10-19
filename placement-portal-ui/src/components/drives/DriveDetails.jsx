import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  GraduationCap,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Send,
  Star,
  Users,
} from "lucide-react";

import { drivesData } from "../../data/drivesData";
import "../../styles/DriveDetails.css";
import { useNavigate } from "react-router-dom";

function formatDeadline(dateValue) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateValue));
}

function DriveDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [showFullDescription, setShowFullDescription] =
    useState(false);

  const drive = drivesData.find(
    (item) => item.id === Number(id)
  );

  if (!drive) {
    return (
      <main className="drive-details-page">
        <div className="drive-details-not-found">
          <h1>Drive not found</h1>

          <Link to="/drives">
            <ArrowLeft size={18} />
            Back to Drives
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="drive-details-page">
      <Link to="/drives" className="drive-details-back">
        <ArrowLeft size={18} />
        Back to Drives
      </Link>

      <section className="drive-details-summary">
        <div className="drive-summary-company">
          <div className="drive-summary-logo">
            <img
              src={drive.logo}
              alt={`${drive.company} logo`}
            />
          </div>

          <div>
            <h1>{drive.company}</h1>
            <h2>{drive.role}</h2>

            <div className="drive-summary-meta">
              <span>
                <MapPin size={16} />
                {drive.location}
              </span>

              <span>
                <BriefcaseBusiness size={16} />
                {drive.employmentType}
              </span>
            </div>
          </div>
        </div>

        <div className="drive-summary-stat">
          <span className="drive-summary-stat-label">
            <IndianRupee size={17} />
            CTC
          </span>

          <strong>{drive.ctcDisplay}</strong>
        </div>

        <div className="drive-summary-stat">
          <span className="drive-summary-stat-label">
            <CalendarDays size={17} />
            Batch
          </span>

          <strong>{drive.batch}</strong>
        </div>

        <div className="drive-summary-stat">
          <span className="drive-summary-stat-label">
            <Star size={17} />
            Min CGPA
          </span>

          <strong>{drive.minCgpa}</strong>
        </div>

        <div className="drive-summary-status">
          <span>Status</span>

          <strong className="drive-eligible-badge">
            {drive.status}
          </strong>

          <div className="drive-summary-deadline">
            <span>Registration Deadline</span>
            <strong>{formatDeadline(drive.deadline)}</strong>
          </div>
        </div>

        <div className="drive-summary-actions">
          <button
            type="button"
            className="save-drive-button"
          >
            <Bookmark size={18} />
            Save Drive
          </button>

          <button
            type="button"
            className="apply-drive-button"
            onClick={() => navigate(`/drives/${drive.id}/apply`)}
          >
            <Send size={18} />
            Apply Now
          </button>
        </div>
      </section>

      <div className="drive-details-layout">
        <section className="drive-details-content">
          <div className="drive-content-section">
            <h2>What You’ll Do</h2>
            <p>{drive.roleSummary}</p>
          </div>

          <div className="drive-content-divider" />

          <div className="drive-content-section">
            <h2>Skills You’ll Need</h2>

            <ul className="drive-bullet-list two-columns">
              {drive.skills?.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="drive-content-divider" />

          <div className="drive-content-section">
            <h2>What {drive.company} Expects</h2>

            <ul className="drive-bullet-list two-columns">
              {drive.expectations?.map((expectation) => (
                <li key={expectation}>{expectation}</li>
              ))}
            </ul>
          </div>

          <div className="drive-content-divider" />

          <div className="drive-content-section">
            <h2>About the Company</h2>
            <p>{drive.aboutCompany}</p>
          </div>

          <div className="drive-content-divider" />

          <div className="drive-content-section official-description-section">
            <div className="official-description-heading">
              <div>
                <h2>Full Official Job Description</h2>

                {!showFullDescription && (
                  <p className="official-description-preview">
                    {drive.officialDescription?.slice(0, 210)}...
                  </p>
                )}
              </div>

              <button
                type="button"
                className="official-description-toggle"
                onClick={() =>
                  setShowFullDescription((current) => !current)
                }
              >
                {showFullDescription
                  ? "Hide Description"
                  : "View Full Description"}

                {showFullDescription ? (
                  <ChevronUp size={17} />
                ) : (
                  <ChevronDown size={17} />
                )}
              </button>
            </div>

            {showFullDescription && (
              <div className="official-description-content">
                <p>{drive.officialDescription}</p>
              </div>
            )}
          </div>
        </section>

        <aside className="drive-details-sidebar">
          <section className="drive-sidebar-card">
            <div className="drive-sidebar-heading">
              <GraduationCap size={20} />
              <h2>Eligibility</h2>
            </div>

            <div className="drive-sidebar-list">
              <div className="drive-sidebar-item">
                <span>
                  <CheckCircle2 size={16} />
                  Eligible Branches
                </span>

                <strong>
                  {drive.eligibleBranches.join(", ")}
                </strong>
              </div>

              <div className="drive-sidebar-item">
                <span>
                  <CheckCircle2 size={16} />
                  Min CGPA
                </span>

                <strong>{drive.minCgpa}</strong>
              </div>

              <div className="drive-sidebar-item">
                <span>
                  <CheckCircle2 size={16} />
                  Batch
                </span>

                <strong>{drive.batch}</strong>
              </div>

              <div className="drive-sidebar-item">
                <span>
                  <CheckCircle2 size={16} />
                  Registration Fee
                </span>

                <strong className="positive-value">
                  {drive.registrationFeePaid
                    ? "Paid"
                    : "Pending"}
                </strong>
              </div>

              <div className="drive-sidebar-item">
                <span>
                  <CheckCircle2 size={16} />
                  Active Backlogs
                </span>

                <strong className="positive-value">
                  {drive.activeBacklogs === 0
                    ? "None"
                    : drive.activeBacklogs}
                </strong>
              </div>
            </div>
          </section>

          <section className="drive-sidebar-card">
            <div className="drive-sidebar-heading">
              <CircleHelp size={20} />
              <h2>Quick Facts</h2>
            </div>

            <div className="drive-sidebar-list">
              <div className="drive-sidebar-item">
                <span>
                  <CalendarDays size={16} />
                  Application Deadline
                </span>

                <strong className="deadline-value">
                  {formatDeadline(drive.deadline)}
                </strong>
              </div>

              <div className="drive-sidebar-item">
                <span>
                  <Users size={16} />
                  Openings
                </span>

                <strong>{drive.openings}</strong>
              </div>

              <div className="drive-sidebar-item">
                <span>
                  <BriefcaseBusiness size={16} />
                  Job Type
                </span>

                <strong>{drive.employmentType}</strong>
              </div>

              <div className="drive-sidebar-item">
                <span>
                  <MapPin size={16} />
                  Location
                </span>

                <strong>{drive.location}</strong>
              </div>
            </div>
          </section>

          <section className="drive-sidebar-card drive-help-card">
            <div className="drive-sidebar-heading">
              <CircleHelp size={20} />
              <h2>Need Help?</h2>
            </div>

            <p>
              Have questions about this drive or need
              assistance with your application?
            </p>

            <div className="drive-tpo-contact">
              <div className="drive-tpo-avatar">
                AK
              </div>

              <div>
                <strong>Prof. Anil Kumar</strong>
                <span>Training & Placement Officer</span>
              </div>
            </div>

            <div className="drive-contact-details">
              <span>
                <Mail size={16} />
                tpo@abcit.edu.in
              </span>

              <span>
                <Phone size={16} />
                +91 98765 43210
              </span>
            </div>

            <button
              type="button"
              className="drive-message-button"
            >
              <Send size={17} />
              Send a Message
            </button>
          </section>

          <section>
            <h2>Resume</h2>

            <p>Resume selected for this application:</p>
            <p>Smitha_TS_Resume.pdf</p>

            <button type="button">
              View Resume
            </button>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default DriveDetails;