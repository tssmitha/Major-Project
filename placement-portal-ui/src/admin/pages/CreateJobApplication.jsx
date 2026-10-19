import "../styles/CreateApplication.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function CreateJobApplications() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyId: "",
        role: "",
        ctc: "",
        location: "",
        website: "",
        batch: "",
        minCgpa: "",
        activeBacklogs: "",
        employmentType: "",
        eligibleBranches: [],
        releaseDate: "",
        lastDateToApply: "",
        driveMode: "",
        venueOrLink: "",
        jobSummary: "",
        skills: "",
        additionalInstructions: "",
        });

    const buildDrivePayload = () => ({
  companyId: formData.companyId,
  role: formData.role,
  ctc: Number(formData.ctc),
  location: formData.location,
  batch: Number(formData.batch),
  minCgpa: Number(formData.minCgpa),
  activeBacklogs: Number(formData.activeBacklogs),
  employmentType: formData.employmentType,
  eligibleBranches: formData.eligibleBranches,
  releaseDate: formData.releaseDate || null,
  lastDateToApply: formData.lastDateToApply || null,
  driveMode: formData.driveMode,
  venueOrLink: formData.venueOrLink,
  jobSummary: formData.jobSummary,
  skills: formData.skills,
  additionalInstructions: formData.additionalInstructions,
  jobDescriptionUrl: null,
});

        const [newCompany, setNewCompany] = useState({
            name: "",
            email: "",
            contactEmail: "",
            website: "",
            industry: "",
        });

        const [formErrors, setFormErrors] = useState({});

        const handleChange = (event) => {
            const { name, value } = event.target;

            setFormData((current) => ({
                ...current,
                [name]: value,
            }));
        };

        const handleBranchChange = (event) => {
            const { value, checked } = event.target;

            setFormData((current) => ({
                ...current,
                eligibleBranches: checked
                ? [...current.eligibleBranches, value]
                : current.eligibleBranches.filter((branch) => branch !== value),
            }));
        };

        const validateForm = () => {
            const errors = {};

            if (formData.eligibleBranches.length === 0) {
                errors.eligibleBranches = "Select at least one eligible branch.";
            }

            if (
                formData.releaseDate &&
                formData.lastDateToApply &&
                formData.lastDateToApply < formData.releaseDate
            ) {
                errors.lastDateToApply =
                "Application deadline cannot be before the release date.";
            }

            if (
                formData.lastDateToApply  < formData.lastDateToApply
            ) {
                errors.driveDate =
                "Expected drive date cannot be before the application deadline.";
            }

            // if (!jobDescription) {
            //     errors.jobDescription = "Upload the official job description.";
            // }

            setFormErrors(errors);

            return Object.keys(errors).length === 0;
        };

        const handlePublish = async (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Step 1: create drive as DRAFT
    const createResponse = await fetch(
      "http://localhost:8081/drives",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser?.token}`,
        },
        body: JSON.stringify(buildDrivePayload()),
      }
    );

    if (!createResponse.ok) {
      throw new Error("Unable to create drive");
    }

    const createdDrive = await createResponse.json();

    // Step 2: publish that drive
    const publishResponse = await fetch(
      `http://localhost:8081/drives/${createdDrive.id}/publish`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${storedUser?.token}`,
        },
      }
    );

    if (!publishResponse.ok) {
      throw new Error("Drive created but publishing failed");
    }

    const publishedDrive = await publishResponse.json();

    console.log("Published:", publishedDrive);

    alert("Drive published successfully.");

    navigate("/admin/drives");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

        const [jobDescription, setJobDescription] = useState(null);
        const [companies, setCompanies] = useState([]);
        const [companiesLoading, setCompaniesLoading] = useState(true);
        const [showNewCompanyForm, setShowNewCompanyForm] = useState(false);

       const handleFileUpload = (event) => {
        const file = event.target.files[0];

  if (!file) {
    setJobDescription(null);
    return;
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    setFormErrors((current) => ({
      ...current,
      jobDescription: "Upload a PDF, DOC or DOCX file.",
    }));
    event.target.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    setFormErrors((current) => ({
      ...current,
      jobDescription: "The job description must be smaller than 10 MB.",
    }));
    event.target.value = "";
    return;
  }

  setJobDescription(file);

  setFormErrors((current) => ({
    ...current,
    jobDescription: "",
  }));
        };

        useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
    //   console.log(storedUser);

      const response = await fetch("http://localhost:8081/companies", {
        headers: {
          Authorization: `Bearer ${storedUser?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to load companies");
      }

      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setCompaniesLoading(false);
    }
  };

  fetchCompanies();
}, []);

        const handleAddCompany = async () => {
  try {
    if (
      !newCompany.name ||
      !newCompany.email ||
      !newCompany.contactEmail ||
      !newCompany.industry
    ) {
      alert("Please fill all required company details.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const response = await fetch("http://localhost:8081/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser?.token}`,
      },
      body: JSON.stringify(newCompany),
    });

    if (!response.ok) {
      throw new Error("Unable to create company");
    }

    const createdCompany = await response.json();

    // Add new company to dropdown immediately
    setCompanies((current) => [...current, createdCompany]);

    // Automatically select it for this drive
    setFormData((current) => ({
      ...current,
      companyId: createdCompany.id,
    }));

    // Close and reset form
    setShowNewCompanyForm(false);

    setNewCompany({
      name: "",
      email: "",
      contactEmail: "",
      website: "",
      industry: "",
    });

    

  } catch (error) {
    console.error(error);
    alert("Could not add company.");
  }
};

const handleSaveDraft = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const response = await fetch("http://localhost:8081/drives", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser?.token}`,
      },
      body: JSON.stringify(buildDrivePayload()),
    });

    if (!response.ok) {
      throw new Error("Unable to save drive");
    }

    const savedDrive = await response.json();

    console.log("Draft saved:", savedDrive);

    alert("Drive saved as draft.");

    navigate("/admin/drives");
  } catch (error) {
    console.error(error);
    alert("Could not save drive.");
  }
};

  return (
    <main className="create-drive-page">
        <header className="create-drive-header">
            <div>
            <p className="create-drive-label">DRIVE MANAGEMENT</p>
            <h1>Create Placement Drive</h1>
            <p>
                Enter the official drive details and publish them for eligible students.
            </p>
            </div>

            <button
            className="create-drive-back-button"
            type="button"
            onClick={() => navigate("/admin/drives")}
            >
            ← Back to Drives
            </button>
        </header>

        <form className="create-drive-form" onSubmit={handlePublish}>
            <section className="create-drive-section">
            <div className="create-drive-section-heading">
                <span>01</span>

                <div>
                <h2>Company & Role Details</h2>
                <p>Basic information about the company and offered position.</p>
                </div>
            </div>

          <div className="create-drive-field">
            <label htmlFor="companyId">
                Company <span>*</span>
            </label>

            <select
                id="companyId"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                required
                disabled={companiesLoading}
            >
                <option value="">
                {companiesLoading ? "Loading companies..." : "Select company"}
                </option>

                {companies.map((company) => (
                <option key={company.id} value={company.id}>
                    {company.name}
                </option>
                ))}
            </select>
            <button
                type="button"
                className="create-company-link"
                onClick={() => setShowNewCompanyForm(true)}
                >
                + Add new company
                </button>

                {showNewCompanyForm && (
                <div className="new-company-form">
                    <input
                    type="text"
                    placeholder="Company name"
                    value={newCompany.name}
                    onChange={(e) =>
                        setNewCompany({
                        ...newCompany,
                        name: e.target.value,
                        })
                    }
                    />

                    <input
                    type="email"
                    placeholder="Company email"
                    value={newCompany.email}
                    onChange={(e) =>
                        setNewCompany({
                        ...newCompany,
                        email: e.target.value,
                        })
                    }
                    />

                    <input
                    type="email"
                    placeholder="Contact email"
                    value={newCompany.contactEmail}
                    onChange={(e) =>
                        setNewCompany({
                        ...newCompany,
                        contactEmail: e.target.value,
                        })
                    }
                    />

                    <input
                    type="url"
                    placeholder="Company website"
                    value={newCompany.website}
                    onChange={(e) =>
                        setNewCompany({
                        ...newCompany,
                        website: e.target.value,
                        })
                    }
                    />

                    <select
                    value={newCompany.industry}
                    onChange={(e) =>
                        setNewCompany({
                        ...newCompany,
                        industry: e.target.value,
                        })
                    }
                    >
                    <option value="">Select industry</option>
                    <option value="SOFTWARE">Software</option>
                    <option value="FINTECH">FinTech</option>
                    <option value="CONSULTING">Consulting</option>
                    <option value="ECOMMERCE">E-Commerce</option>
                    <option value="TELECOM">Telecom</option>
                    <option value="MANUFACTURING">Manufacturing</option>
                    <option value="AUTOMOTIVE">Automotive</option>
                    <option value="HEALTHCARE">Healthcare</option>
                    <option value="EDTECH">EdTech</option>
                    <option value="FMCG">FMCG</option>
                    <option value="ENERGY">Energy</option>
                    <option value="LOGISTICS">Logistics</option>
                    <option value="GOVERNMENT">Government</option>
                    <option value="SEMICONDUCTOR">Semiconductor</option>
                    <option value="OTHER">Other</option>
                    </select>
                    
                    <div className="new-company-actions">
                    <button
                        type="button"
                        className="new-company-cancel-button"
                        onClick={() => setShowNewCompanyForm(false)}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="new-company-save-button"
                        onClick={handleAddCompany}
                    >
                        Add Company
                    </button>
                    </div>
                </div>
)}
            </div>
            </section>

        <section className="create-drive-section">
            <div className="create-drive-section-heading">
                <span>02</span>

                <div>
                <h2>Eligibility Criteria</h2>
                <p>Define which students can apply for this drive.</p>
                </div>
            </div>

            <div className="create-drive-fields">
                <div className="create-drive-field">
                <label htmlFor="batch">
                    Graduation batch <span>*</span>
                </label>

                <input
                    id="batch"
                    name="batch"
                    type="number"
                    min="2026"
                    placeholder="e.g. 2026"
                    required
                    value={formData.batch}
                    onChange={handleChange}
                />
                </div>

                <div className="create-drive-field">
                <label htmlFor="minCgpa">
                    Minimum CGPA <span>*</span>
                </label>

                <input
                    id="minCgpa"
                    name="minCgpa"
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    placeholder="e.g. 7.0"
                    required
                    value={formData.minCgpa}
                    onChange={handleChange}
                />
                </div>

                <div className="create-drive-field">
                <label htmlFor="activeBacklogs">
                    Maximum active backlogs <span>*</span>
                </label>

                <input
                    id="activeBacklogs"
                    name="activeBacklogs"
                    type="number"
                    min="0"
                    placeholder="e.g. 0"
                    required
                    value={formData.activeBacklogs}
                    onChange={handleChange}
                />
                </div>

                <div className="create-drive-field">
                <label htmlFor="employmentType">
                    Employment type <span>*</span>
                </label>

                <select id="employmentType" name="employmentType" required value={formData.employmentType}
                    onChange={handleChange}>
                    <option value="">Select employment type</option>
                    <option value="FULL_TIME">Full-time</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="INTERNSHIP_WITH_PPO">Internship with PPO</option>
                </select>
                </div>

                <fieldset className="create-drive-branches create-drive-field-full">
                <legend>
                    Eligible branches <span>*</span>
                </legend>

                <div className="create-drive-branch-grid">
                    {["CSE", "ISE", "AIML", "ECE", "EEE", "MECH", "CIVIL"].map(
                    (branch) => (
                        <label className="create-drive-checkbox" key={branch}>
                        <input
                            type="checkbox"
                            name="eligibleBranches"
                            value={branch}
                            checked={formData.eligibleBranches.includes(branch)}
                            onChange={handleBranchChange}
                        />
                        <span>{branch}</span>
                        </label>
                    )
                    )}
                </div>
                {formErrors.eligibleBranches && (
                            <p className="create-application-error">
                                {formErrors.eligibleBranches}
                            </p>
                            )}
                </fieldset>
            </div>
        </section>

        <section className="create-drive-section">
            <div className="create-drive-section-heading">
                <span>03</span>

                <div>
                <h2>Application Timeline</h2>
                <p>Set when the drive becomes visible and applications close.</p>
                </div>
            </div>

            <div className="create-drive-fields">
                <div className="create-drive-field">
                <label htmlFor="releaseDate">
                    Release date <span>*</span>
                </label>

                <input
                    id="releaseDate"
                    name="releaseDate"
                    type="date"
                    required
                    value={formData.releaseDate}
                    onChange={handleChange}
                />

                <small>The drive will be visible to students from this date.</small>
                </div>

                <div className="create-drive-field">
                <label htmlFor="lastDateToApply">
                    Application deadline <span>*</span>
                </label>

                <input
                    id="lastDateToApply"
                    name="lastDateToApply"
                    type="date"
                    required
                    value={formData.lastDateToApply}
                    onChange={handleChange}
                />

                <small>Applications will close at the end of this date.</small>

                {formErrors.lastDateToApply && (
                            <p className="create-application-error">
                                {formErrors.lastDateToApply}
                            </p>
                            )}

                
                </div>

                <div className="create-drive-field">
                <label htmlFor="driveMode">
                    Drive mode <span>*</span>
                </label>

                <select id="driveMode" name="driveMode" required value={formData.driveMode}
                    onChange={handleChange}>
                    <option value="">Select drive mode</option>
                    <option value="ON_CAMPUS">On campus</option>
                    <option value="ONLINE">Online</option>
                    <option value="OFF_CAMPUS">Off campus</option>
                    <option value="HYBRID">Hybrid</option>
                </select>
                </div>

                <div className="create-drive-field create-drive-field-full">
                <label htmlFor="venueOrLink">Venue or meeting details</label>

                <input
                    id="venueOrLink"
                    name="venueOrLink"
                    type="text"
                    placeholder="e.g. NIE Golden Jubilee Block or online link to be shared"
                    value={formData.venueOrLink}
                    onChange={handleChange}
                />
                </div>
            </div>
        </section>

        <section className="create-drive-section">
            <div className="create-drive-section-heading">
                <span>04</span>

                <div>
                <h2>Job Description</h2>
                <p>Attach the official JD and provide a short student-facing summary.</p>
                </div>
            </div>

            <div className="create-drive-fields">
                <div className="create-drive-field create-drive-field-full">
                <label htmlFor="jobSummary">
                    Role summary <span>*</span>
                </label>

                <textarea
                    id="jobSummary"
                    name="jobSummary"
                    rows="4"
                    placeholder="Briefly describe the role and its primary responsibilities."
                    required
                    value={formData.jobSummary}
                    onChange={handleChange}
                />

                <small>
                    This summary will appear on the drive details page.
                </small>
                </div>

                <div className="create-drive-field create-drive-field-full">
                <label htmlFor="skills">Skills required</label>

                <textarea
                    id="skills"
                    name="skills"
                    rows="3"
                    placeholder="e.g. Java, Spring Boot, SQL, problem-solving and communication"
                    value={formData.skills}
                    onChange={handleChange}
                />

                <small>Separate multiple skills using commas.</small>
                </div>

                <div className="create-drive-field create-drive-field-full">
                <label htmlFor="jobDescription">
                    Full job description <span>*</span>
                </label>

                <div className="create-drive-upload">
                    <input
                    id="jobDescription"
                    name="jobDescription"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileUpload}
                    />

                    <div className="create-drive-upload-content">
                    <strong>Upload the official job description</strong>
                    <p>PDF, DOC or DOCX · Maximum 10 MB</p>
                    </div>
                </div>

                {formErrors.jobDescription && (
                            <p className="create-application-error">
                                {formErrors.jobDescription}
                            </p>
                            )}
                </div>

                <div className="create-drive-field create-drive-field-full">
                <label htmlFor="additionalInstructions">
                    Additional instructions
                </label>

                <textarea
                    id="additionalInstructions"
                    name="additionalInstructions"
                    rows="4"
                    placeholder="Mention required documents, registration instructions, assessment requirements or other important information."
                    value={formData.additionalInstructions}
                    onChange={handleChange}
                />
                </div>
            </div>
        </section>

           <footer className="create-drive-actions">
            <div>
                <strong>Ready to save?</strong>
                <p>You can keep the drive as a draft or publish it for students.</p>
            </div>

            <div className="create-drive-action-buttons">
                <button
                className="create-drive-cancel-button"
                type="button"
                onClick={() => navigate("/admin/drives")}
                >
                Cancel
                </button>

                <button
                className="create-drive-draft-button"
                type="button"
                onClick={handleSaveDraft}
                >
                Save as Draft
                </button>

                <button
                className="create-drive-publish-button"
                type="submit"
                >
                Publish Drive
                </button>
            </div>
        </footer>
          </form>
    </main>
  );
}