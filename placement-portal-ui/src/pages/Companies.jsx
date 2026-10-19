import "../styles/Company.css";
import {companiesData} from "../data/companiesData";
import { useState } from "react";

export default function Companies() {
    const totalCompanies = new Set(
    companiesData.map((company) => company.name)
    ).size;

    const highestCtc = Math.max(
    ...companiesData.map((company) => company.maxCtc)
    );

    const totalRoles = new Set(
    companiesData.flatMap((company) => company.roles)
    ).size;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("All");
    const [selectedRole, setSelectedRole] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const getOpportunityCategories = (minCtc, maxCtc) => {
    const categories = [];

    if (minCtc < 8) {
        categories.push("Mass");
    }

    if (maxCtc >= 8 && minCtc <= 20) {
        categories.push("Dream");
    }

    if (maxCtc > 20) {
        categories.push("Super Dream");
    }

    return categories;
    };

    const filteredCompanies = companiesData.filter((company) => {
    const matchesSearch = company.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

    const matchesYear =
        selectedYear === "All" ||
        company.academicYear === selectedYear;

    const matchesRole =
        selectedRole === "All" ||
        company.roles.includes(selectedRole);

    const companyCategories = getOpportunityCategories(
        company.minCtc,
        company.maxCtc
    );

    const matchesCategory =
        selectedCategory === "All" ||
        companyCategories.includes(selectedCategory);

    return (
        matchesSearch &&
        matchesYear &&
        matchesRole &&
        matchesCategory
    );
    });

    const availableRoles = [
  ...new Set(companiesData.flatMap((company) => company.roles)),
        ].sort();

    const academicYears = [
        ...new Set(companiesData.map((company) => company.academicYear)),
    ].sort((a, b) => b.localeCompare(a));

  return (
    <main className="companies-page">
      <section className="companies-header">
        <p className="companies-label">PLACEMENT HISTORY</p>
        <h1>Companies That Recruit From NIE</h1>
        <p>
          Explore recruiters, roles offered, packages, and previous
          placement visits.
        </p>
      </section>
      <section className="companies-summary">
        <article className="summary-card">
            <span>Companies Listed</span>
            <strong>{totalCompanies}</strong>
        </article>

        <article className="summary-card">
            <span>Highest CTC</span>
            <strong>₹{highestCtc} LPA</strong>
        </article>

        <article className="summary-card">
            <span>Roles Offered</span>
            <strong>{totalRoles}</strong>
        </article>
        </section>

        <section className="companies-filters">
        <div className="filter-heading">
        <div>
        <h2>Explore Recruiters</h2>
        <p>Filter placement history by year, role, and package category.</p>
        </div>

        <button
        type="button"
        className="clear-filters"
        onClick={() => {
            setSearchTerm("");
            setSelectedYear("All");
            setSelectedRole("All");
            setSelectedCategory("All");
        }}
        >
        Clear filters
        </button>
    </div>

    <div className="filter-controls">
        <label className="search-filter">
        <span>Search company</span>
        <input
            type="search"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
        />
        </label>

        <label>
        <span>Academic year</span>
        <select
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
        >
            <option value="All">All years</option>
            {academicYears.map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
            ))}
        </select>
        </label>

        <label>
        <span>Role</span>
        <select
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value)}
        >
            <option value="All">All roles</option>
           {availableRoles.map((role) => (
            <option key={role} value={role}>
                {role}
            </option>
            ))}
        </select>
        </label>

        <label>
        <span>Opportunity</span>
        <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
        >
            <option value="All">All categories</option>
            <option value="Mass">Mass</option>
            <option value="Dream">Dream</option>
            <option value="Super Dream">Super Dream</option>
        </select>
        </label>
    </div>
</section>

<section className="companies-results">
  <div className="results-header">
    <div>
      <h2>Recruitment History</h2>
      <p>
        Showing {filteredCompanies.length}{" "}
        {filteredCompanies.length === 1 ? "record" : "records"}
      </p>
    </div>
  </div>

  <div className="companies-table-wrapper">
    <table className="companies-table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Academic Year</th>
          <th>Roles Offered</th>
          <th>CTC Range</th>
          <th>Opportunity</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {filteredCompanies.map((company) => {
          const categories = getOpportunityCategories(
            company.minCtc,
            company.maxCtc
          );

          return (
            <tr key={company.id}>
              <td>
                <div className="company-cell">
                  <strong>{company.name}</strong>
                  <span>{company.industry}</span>
                </div>
              </td>

              <td>{company.academicYear}</td>

              <td>
                <div className="role-list">
                  {company.roles.map((role) => (
                    <span key={role}>{role}</span>
                  ))}
                </div>
              </td>

              <td>
                ₹{company.minCtc}–{company.maxCtc} LPA
              </td>

              <td>
                <div className="category-list">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className={`category-badge ${category
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </td>

              <td>
                <span
                  className={`visit-status ${company.status.toLowerCase()}`}
                >
                  {company.status}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    {filteredCompanies.length === 0 && (
      <div className="empty-companies">
        <h3>No recruitment records found</h3>
        <p>Try changing or clearing some of the filters.</p>
      </div>
    )}
  </div>
</section>
    </main>
  );
}