export const students = [
  {
  id: 1,
  usn: "4NI22CS001",
  name: "Aarav Sharma",
  branch: "CSE",
  semester: 8,
  cgpa: 8.7,
  email: "aarav.sharma@nie.ac.in",
  phone: "+91 98765 43210",

  placed: true,

  offer: {
    company: "Microsoft",
    role: "Software Engineer",
    ctc: "18 LPA",
    joiningDate: "15 July 2026",
  },

 applications: [
    {
      id: 101,
      driveId: 1,
      company: "Microsoft",
      role: "Software Engineer",
      ctc: "18 LPA",
      appliedOn: "2026-02-24",

      currentStatus: "OFFER_ACCEPTED",

      rounds: [
        {
          round: "Online Assessment",
          status: "CLEARED",
          updatedOn: "2026-03-01",
        },
        {
          round: "Technical Round 1",
          status: "CLEARED",
          updatedOn: "2026-03-05",
        },
        {
          round: "Technical Round 2",
          status: "CLEARED",
          updatedOn: "2026-03-08",
        },
        {
          round: "HR Round",
          status: "CLEARED",
          updatedOn: "2026-03-10",
        },
        {
          round: "Offer",
          status: "ACCEPTED",
          updatedOn: "2026-03-12",
        },
      ],
    },

    {
      id: 102,
      driveId: 2,
      company: "Deloitte",
      role: "Analyst",
      ctc: "7.5 LPA",
      appliedOn: "2026-02-18",

      currentStatus: "REJECTED",

      rounds: [
        {
          round: "Online Assessment",
          status: "CLEARED",
          updatedOn: "2026-02-22",
        },
        {
          round: "Technical Interview",
          status: "NOT_SELECTED",
          updatedOn: "2026-03-02",
        },
      ],
    },
  ]},
  {
    id: 2,
    usn: "4NI22CS002",
    name: "Ananya Rao",
    branch: "CSE",
    cgpa: 8.4,
    placed: false,
    company: null,
  },
  {
    id: 3,
    usn: "4NI22CS003",
    name: "Diya Menon",
    branch: "CSE",
    cgpa: 9.1,
    placed: true,
    company: "Google",
  },
  {
    id: 4,
    usn: "4NI22CS004",
    name: "Karthik N",
    branch: "CSE",
    cgpa: 7.9,
    placed: false,
    company: null,
  },

  {
    id: 5,
    usn: "4NI22IS001",
    name: "Meera S",
    branch: "ISE",
    cgpa: 8.8,
    placed: true,
    company: "Deloitte",
  },
  {
    id: 6,
    usn: "4NI22IS002",
    name: "Rahul K",
    branch: "ISE",
    cgpa: 8.1,
    placed: false,
    company: null,
  },
];