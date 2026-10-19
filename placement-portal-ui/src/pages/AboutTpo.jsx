import "../styles/AboutTPO.css";
import placementOfficer from "../assets/PlacementOfficer.png";
import PC1 from "../assets/PC1.png";
import PC2 from "../assets/PC2.png";
import PC3 from "../assets/PC3.png";
import { LuMapPin, LuClock, LuMail } from "react-icons/lu";
import { useState } from "react";

const coordinators = [
  {
    id: 1,
    name: "Jim Halpert",
    designation: "Assistant Placement Coordinator",
    department: "Computer Science",
    image:PC1,
  },
  {
    id: 2,
    name: "Dwight Schrute",
    designation: "Assistant Placement Coordinator",
    department: "Electronics & Communication",
    image:PC2,
  },
  {
    id: 3,
    name: "Pam Beasley",
    designation: "Assistant Placement Coordinator",
    department: "Information Science",
    image:PC3,
  },
];

const placementGuidelines = [
  {
    id: 1,
    number: "01",
    title: "Registration & Eligibility",
    description:
      "Students must complete their placement profile and satisfy the eligibility requirements specified for each drive.",
  },
  {
    id: 2,
    number: "02",
    title: "Applications & Deadlines",
    description:
      "Applications must be submitted before the stated deadline. Late registrations will not be considered.",
  },
  {
    id: 3,
    number: "03",
    title: "Assessment Attendance",
    description:
      "Students who apply for a drive must attend every scheduled assessment, interview, and pre-placement session.",
  },
  {
    id: 4,
    number: "04",
    title: "Professional Conduct",
    description:
      "Students are expected to maintain professional behaviour and follow the instructions issued by the Placement Office.",
  },
];

const faqs = [
  {
    id: 1,
    question: "Who is eligible to participate in placement drives?",
    answer:
      "Eligibility depends on the criteria specified by each company, including branch, CGPA, graduation year, and backlog requirements.",
  },
  {
    id: 2,
    question: "Can I apply after the registration deadline?",
    answer:
      "No. Students must apply before the deadline displayed for the respective placement drive.",
  },
  {
    id: 3,
    question: "Can I withdraw after applying for a company?",
    answer:
      "Withdrawal is subject to Placement Office policy. Students should contact the office before withdrawing from an active recruitment process.",
  },
  {
    id: 4,
    question: "How can I update my resume?",
    answer:
      "You can replace your existing resume from the Student Profile page before applying for a placement drive.",
  },
  {
    id: 5,
    question: "Whom should I contact regarding placement queries?",
    answer:
      "You may contact the Placement Office using the official email or phone number provided above. The Raise a Query feature will also be available later.",
  },
];

export default function AboutTPO() {
const [openFaqId, setOpenFaqId] = useState(null);

const toggleFaq = (id) => {
  setOpenFaqId((currentId) => (currentId === id ? null : id));
};
  return (
    <main className="tpo-page">
      <section className="tpo-hero">
        <div className="tpo-hero-content">
          <span className="tpo-eyebrow">Training & Placement Office</span>
          <h1>Guiding Students Towards Successful Careers</h1>
          <p>
            Supporting students through career guidance, placement opportunities,
            industry interaction, and professional development.
          </p>
        </div>
      </section>

      <section className="officer-section">
        <div className="officer-profile">
            <div className="officer-image-wrapper">
            <img
                src={placementOfficer}
                alt="Placement Officer"
                className="officer-image"
            />
            </div>

    <div className="officer-content">
      <span className="section-label">Meet Our Placement Officer</span>

      <h2>Michael Scott</h2>
      <p className="officer-designation">Placement Officer</p>

      <blockquote className="officer-message">
        “Talent matters, of course—but preparation, discipline, and
        meeting the deadline matter rather more.”
      </blockquote>

      <p className="officer-description">
        Committed to helping students develop professional skills,
        discover suitable career opportunities, and approach every
        placement process with confidence and preparation.
      </p>
    </div>
  </div>
</section>

<section className="placement-team-section">
  <div className="placement-team-header">
    <span className="section-label">Placement Team</span>
    <h2>Assistant Coordinators</h2>
    <p>
      Supporting students and coordinating placement activities across
      departments.
    </p>
  </div>

  <div className="coordinator-list">
    {coordinators.map((coordinator) => (
      <article className="coordinator-item" key={coordinator.id}>
        <div className="coordinator-initial">
          <img src ={coordinator.image} alt = {coordinator.name} />
        </div>

        <div>
          <h3>{coordinator.name}</h3>
          <p className="coordinator-designation">
            {coordinator.designation}
          </p>
          <p className="coordinator-department">
            {coordinator.department}
          </p>
        </div>
      </article>
    ))}
  </div>
</section>

<section className="office-info-section">
  <div className="office-info-header">
    <h2>Office Information</h2>
  </div>

  <div className="office-info-strip">
    <article className="office-info-item">
      <div className="office-info-icon">
        <LuMapPin />
      </div>

      <div>
        <h3>Office Location</h3>
        <p>
          Training & Placement Office
          <br />
          Administrative Block
          <br />
          NIE, Mysuru – 570 008
        </p>
      </div>
    </article>

    <article className="office-info-item">
      <div className="office-info-icon">
        <LuClock />
      </div>

      <div>
        <h3>Working Hours</h3>
        <p>
          Monday – Friday
          <br />
          9:00 AM – 5:00 PM
        </p>
      </div>
    </article>

    <article className="office-info-item">
      <div className="office-info-icon">
        <LuMail />
      </div>

      <div>
        <h3>Contact Us</h3>
        <p>
          <a href="mailto:placements@college.edu">
            placementcell@nie.in
          </a>
          <br />
          <a href="tel:+918212345678">+91 821 234 5678</a>
        </p>
      </div>
    </article>
  </div>
</section>

<section className="guidelines-section">
  <div className="guidelines-header">
    <div>
      <span className="section-label">Important Information</span>
      <h2>Placement Guidelines</h2>
    </div>

    <p>
      Every participating student is expected to understand and follow the
      placement policies throughout the recruitment process.
    </p>
  </div>

  <div className="guidelines-list">
    {placementGuidelines.map((guideline) => (
      <article className="guideline-item" key={guideline.id}>
        <span className="guideline-number">{guideline.number}</span>

        <div>
          <h3>{guideline.title}</h3>
          <p>{guideline.description}</p>
        </div>
      </article>
    ))}
  </div>

  <button className="guidelines-button" type="button">
    View Complete Placement Policy
  </button>
</section>

<section className="faq-section">
  <div className="faq-header">
    <span className="section-label">Need Clarification?</span>
    <h2>Frequently Asked Questions</h2>
    <p>
      Find answers to common questions about placement registration,
      eligibility, applications, and participation.
    </p>
  </div>

  <div className="faq-list">
    {faqs.map((faq) => {
      const isOpen = openFaqId === faq.id;

      return (
        <article
          className={`faq-item ${isOpen ? "faq-item-open" : ""}`}
          key={faq.id}
        >
          <button
            className="faq-question"
            type="button"
            onClick={() => toggleFaq(faq.id)}
            aria-expanded={isOpen}
          >
            <span>{faq.question}</span>
            <span className="faq-symbol" aria-hidden="true">
              {isOpen ? "−" : "+"}
            </span>
          </button>

          {isOpen && (
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          )}
        </article>
      );
    })}
  </div>
</section>


    </main>
  );
}