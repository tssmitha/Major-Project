import "../styles/Resources.css";

const resourceCategories = [
  {
    id: 1,
    icon: "∑",
    title: "Aptitude & Reasoning",
    description:
      "Build quantitative aptitude, logical reasoning and data interpretation skills.",
    topics: "18 Topics",
  },
  {
    id: 2,
    icon: "</>",
    title: "Programming & DSA",
    description:
      "Strengthen programming fundamentals, data structures and problem-solving.",
    topics: "24 Topics",
  },
  {
    id: 3,
    icon: "⚙",
    title: "Core CS Subjects",
    description:
      "Revise DBMS, operating systems, computer networks and OOP concepts.",
    topics: "16 Topics",
  },
  {
    id: 4,
    icon: "▣",
    title: "Interview Preparation",
    description:
      "Prepare for technical interviews, HR rounds and common placement questions.",
    topics: "12 Guides",
  },
  {
    id: 5,
    icon: "✦",
    title: "Resume & Career Skills",
    description:
      "Create stronger resumes and improve communication and professional skills.",
    topics: "8 Guides",
  },
  {
    id: 6,
    icon: "▥",
    title: "Company Preparation",
    description:
      "Explore company-specific hiring patterns, previous questions and preparation tips.",
    topics: "15 Companies",
  },
];

const roadmapSteps = [
  {
    id: 1,
    number: "01",
    title: "Build Foundations",
    description:
      "Strengthen aptitude, programming fundamentals and core computer science concepts.",
  },
  {
    id: 2,
    number: "02",
    title: "Practise Problem Solving",
    description:
      "Work through DSA problems, reasoning exercises and placement-level questions.",
  },
  {
    id: 3,
    number: "03",
    title: "Prepare for Interviews",
    description:
      "Revise technical concepts, practise common questions and improve communication.",
  },
  {
    id: 4,
    number: "04",
    title: "Target Companies",
    description:
      "Study company-specific hiring patterns, roles and previous recruitment experiences.",
  },
];

export default function Resources() {
  return (
    <main className="resources-page">
      <section className="resources-hero">
        <div className="resources-hero-content">
            <p className="resources-eyebrow">CAREER LEARNING HUB</p>

            <h1>Prepare. Practise. Get Placement Ready.</h1>

            <p className="resources-hero-description">
            Explore structured learning materials, aptitude preparation,
            technical resources and interview guidance—all in one place.
            </p>

            <div className="resources-search">
            <input
                type="search"
                placeholder="Search topics, skills or resources..."
                aria-label="Search learning resources"
            />
            <button type="button">Search</button>
            </div>
        </div>
      </section>

      <section className="resource-categories">
        <div className="resources-section-heading">
            <div>
            <p className="resources-section-label">EXPLORE BY CATEGORY</p>
            <h2>What do you want to prepare for?</h2>
            </div>

            <p>
            Choose a learning area and access organised notes, practice materials
            and placement-focused guidance.
            </p>
        </div>

        <div className="resource-category-grid">
            {resourceCategories.map((category) => (
            <article className="resource-category-card" key={category.id}>
                <div className="resource-category-icon">{category.icon}</div>

                <h3>{category.title}</h3>
                <p>{category.description}</p>

                <div className="resource-category-footer">
                <span>{category.topics}</span>

                <button
                    type="button"
                    aria-label={`Explore ${category.title}`}
                >
                    Explore →
                </button>
                </div>
            </article>
            ))}
        </div>
    </section>

    <section className="resources-roadmap">
        <div className="roadmap-heading">
            <p className="resources-section-label">INDUSTRY-READY ROADMAP</p>
            <h2>Build your placement skills step by step</h2>
            <p>
            Follow a structured path from fundamentals to company-specific
            preparation.
            </p>
        </div>
        <div className="roadmap-steps">
            {roadmapSteps.map((step) => (
                <article className="roadmap-step" key={step.id}>
                <span className="roadmap-step-number">{step.number}</span>

                <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                </div>
                </article>
            ))}
        </div>
    </section>
    {/* Feature enhancement to dispaly newly added resources */}
    </main>
  );
}