export const companyDrives = [
  {
  id: 1,
  company: "Halodoc",
  role: "Software Development Engineer",
  status: "COMPLETED",
  postedDate: "2026-08-12",
  currentStage: "Selection completed",
  lastUpdated: "2026-09-14T16:30:00",

  latestUpdate: {
    title: "Final results announced",
    description: "11 students were selected for the SDE role.",
    updatedBy: "Placement Officer",
    updatedAt: "2026-09-14T16:30:00",
  },

  aggregate: {
    applicants: 186,
    activeCandidates: 0,
    eliminated : 175,
    offers: 11,
    totalRounds: 4,
    selectionRate: "5.9%",
  },

  rounds: [
    {
      id: 1,
      name: "Applications",
      status: "COMPLETED",
      studentCount: 186,
      completedOn: "2026-08-20",
    },
    {
      id: 2,
      name: "Online Assessment",
      status: "COMPLETED",
      studentCount: 124,
      completedOn: "2026-08-28",
    },
    {
      id: 3,
      name: "Technical Interview",
      status: "COMPLETED",
      studentCount: 38,
      completedOn: "2026-09-06",
    },
    {
      id: 4,
      name: "HR Interview",
      status: "COMPLETED",
      studentCount: 16,
      completedOn: "2026-09-10",
    },
    {
      id: 5,
      name: "Final Selection",
      status: "COMPLETED",
      studentCount: 11,
      completedOn: "2026-09-14",
    },
  ],

  students: [
    {
      id: 1,
      name: "Aarav Sharma",
      usn: "4NI22CS001",
      branch: "CSE",
      currentStage: "Final Selection",
      outcome: "SELECTED",
    },
    {
      id: 2,
      name: "Sneha Reddy",
      usn: "4NI22EC045",
      branch: "ECE",
      currentStage: "Technical Interview",
      outcome: "ELIMINATED",
    },
  ],
}
];