import { Link, useParams  } from "react-router-dom";
import { useState } from "react";
import { companyDrives } from "./ApplicationsData";
import DriveRecruitmentProgress from "./DriveRecruitmentProgress";
import DriveStudentsTable from "./DriveStudentsTable";
import UpdateApplicationResultsModal from "./UpdateApplicationResultsModal";

import "./AdminDriveApplications.css";

export default function AdminDriveApplications() {
  const { driveId } = useParams();

  const [showResultModal, setShowResultModal] = useState(false);


  const initialDrive = companyDrives.find(
  (item) => item.id === Number(driveId)
);

const [drive, setDrive] = useState(initialDrive);

  function formatDateTime(dateTime) {
    return new Date(dateTime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleApplicationResultsUpdate({
  studentIds,
  resultRound,
  resultOutcome,
}) {
  setDrive((currentDrive) => {
    const selectedIds = new Set(studentIds);

    const currentRoundIndex = currentDrive.rounds.findIndex(
      (round) => round.name === resultRound
    );

    const nextRound = currentDrive.rounds[currentRoundIndex + 1];

    const targetStage =
      resultOutcome === "QUALIFIED"
        ? nextRound?.name ?? resultRound
        : resultOutcome === "SELECTED"
          ? "Final Selection"
          : resultRound;

    const targetOutcome =
      resultOutcome === "QUALIFIED"
        ? "IN_PROGRESS"
        : resultOutcome;

    let activeCandidatesChange = 0;
    let eliminatedChange = 0;
    let offersChange = 0;
    let studentsMovedToTargetStage = 0;

    function updateAggregateChange(outcome, amount) {
      if (outcome === "ELIMINATED") {
        eliminatedChange += amount;
      } else if (outcome === "SELECTED") {
        offersChange += amount;
      } else {
        activeCandidatesChange += amount;
      }
    }

    const updatedStudents = currentDrive.students.map((student) => {
      if (!selectedIds.has(student.id)) {
        return student;
      }

      const actuallyChanged =
        student.currentStage !== targetStage ||
        student.outcome !== targetOutcome;

      if (!actuallyChanged) {
        return student;
      }

      updateAggregateChange(student.outcome, -1);
      updateAggregateChange(targetOutcome, 1);

      if (student.currentStage !== targetStage) {
        studentsMovedToTargetStage += 1;
      }

      return {
        ...student,
        currentStage: targetStage,
        outcome: targetOutcome,
      };
    });

    const updatedOffers = Math.max(
      0,
      currentDrive.aggregate.offers + offersChange
    );

    const updatedAggregate = {
      ...currentDrive.aggregate,

      activeCandidates: Math.max(
        0,
        currentDrive.aggregate.activeCandidates +
          activeCandidatesChange
      ),

      eliminated: Math.max(
        0,
        currentDrive.aggregate.eliminated + eliminatedChange
      ),

      offers: updatedOffers,

      selectionRate: `${(
        (updatedOffers / currentDrive.aggregate.applicants) *
        100
      ).toFixed(1)}%`,
    };

    const updatedRounds = currentDrive.rounds.map((round) => {
      if (round.name !== targetStage) {
        return round;
      }

      return {
        ...round,
        studentCount:
          round.studentCount + studentsMovedToTargetStage,
      };
    });

    const outcomeText = {
      QUALIFIED: "qualified for the next round",
      ELIMINATED: "marked as eliminated",
      SELECTED: "marked as finally selected",
    };

    return {
      ...currentDrive,
      aggregate: updatedAggregate,
      rounds: updatedRounds,
      students: updatedStudents,

      latestUpdate: {
        title: `${studentIds.length} students updated`,
        description: `${studentIds.length} students were ${outcomeText[resultOutcome]} after ${resultRound}.`,
        updatedBy: "Placement Officer",
        updatedAt: new Date().toISOString(),
      },
    };
  });

  setShowResultModal(false);
}

  if (!drive) {
    return (
      <main className="admin-drive-details-page">
        <h1>Drive not found</h1>
        <Link to="/admin/applications">Back to applications</Link>
      </main>
    );
  }

 return (
  <main className="admin-drive-details-page">
    <Link
      to="/admin/applications"
      className="admin-drive-back-link"
    >
      ← Back to applications
    </Link>

    <header className="admin-drive-details-header">
      <div className="admin-drive-title">
        <p>{drive.company}</p>
        <h1>{drive.role}</h1>

        <div className="admin-drive-title-meta">
          <span
            className={`admin-drive-status ${drive.status
                .toLowerCase()
                .replaceAll("_", "-")}`}
          >
            {drive.status}
          </span>

          <span>
            Current stage: <strong>{drive.currentStage}</strong>
          </span>
        </div>
      </div>

      <button type="button" className="admin-update-progress-button" onClick={setShowResultModal}>
        Update Application Results
      </button>
    </header>

    <section className="admin-drive-latest-update">
      <div className="admin-latest-update-marker" />

      <div className="admin-latest-update-content">
        <p>LATEST UPDATE</p>
        <h2>{drive.latestUpdate.title}</h2>
        <span>{drive.latestUpdate.description}</span>

        <footer>
          Updated by {drive.latestUpdate.updatedBy} ·{" "}
          {formatDateTime(drive.latestUpdate.updatedAt)}
        </footer>
      </div>
    </section>

    <section className="admin-drive-summary">
  <article>
    <span>Total applicants</span>
    <strong>{drive.aggregate.applicants}</strong>
    <p>Students who applied for this drive</p>
  </article>

  <article>
    <span>Active candidates</span>
    <strong>{drive.aggregate.activeCandidates}</strong>
    <p>Still participating in the process</p>
  </article>

  <article>
    <span>Eliminated</span>
    <strong>{drive.aggregate.eliminated}</strong>
    <p>No longer active in this drive</p>
  </article>

  <article>
    <span>Total offers</span>
    <strong>{drive.aggregate.offers}</strong>
    <p>{drive.aggregate.selectionRate} selection rate</p>
  </article>
</section>

<DriveRecruitmentProgress rounds={drive.rounds} />

<DriveStudentsTable
  students={drive.students}
  rounds={drive.rounds}
/>

{showResultModal && (
  <UpdateApplicationResultsModal
    drive={drive}
    onClose={() => setShowResultModal(false)}
    onSubmit={handleApplicationResultsUpdate}
  />
)}
  </main>
);
}