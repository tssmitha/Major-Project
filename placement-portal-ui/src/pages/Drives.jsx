import { useMemo, useState } from "react";

import DriveFilters from "../components/drives/DriveFilters";
import DriveCard from "../components/drives/DriveCard";
import DrivesSidebar from "../components/drives/DrivesSidebar";
import Pagination from "../components/drives/Pagination";

import { drivesData } from "../data/drivesData";
import { useNavigate } from "react-router-dom";

import "../styles/Drives.css";


function Drives() {
  const [filters, setFilters] = useState({
    search: "",
    branch: "All Branches",
    minCtc: "All",
    location: "All Locations",
    status: "All",
    sortBy: "Registration Deadline",
  });

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const drivesPerPage = 3;

  const filteredDrives = useMemo(() => {
    let result = [...drivesData];

    const searchValue = filters.search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter(
        (drive) =>
          drive.company.toLowerCase().includes(searchValue) ||
          drive.role.toLowerCase().includes(searchValue)
      );
    }

    if (filters.branch !== "All Branches") {
      result = result.filter(
        (drive) =>
          drive.eligibleBranches.includes(filters.branch) ||
          drive.eligibleBranches.includes("All Branches")
      );
    }

    if (filters.minCtc !== "All") {
      result = result.filter(
        (drive) => drive.ctc >= Number(filters.minCtc)
      );
    }

    if (filters.location !== "All Locations") {
      result = result.filter(
        (drive) => drive.location === filters.location
      );
    }

    if (filters.status !== "All") {
      result = result.filter(
        (drive) => drive.status === filters.status
      );
    }

    if (filters.sortBy === "Registration Deadline") {
      result.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
    }

    if (filters.sortBy === "Highest CTC") {
      result.sort((a, b) => b.ctc - a.ctc);
    }

    if (filters.sortBy === "Lowest CGPA") {
      result.sort((a, b) => a.minCgpa - b.minCgpa);
    }

    if (filters.sortBy === "Company Name") {
      result.sort((a, b) =>
        a.company.localeCompare(b.company)
      );
    }

    return result;
  }, [filters]);

  const totalPages = Math.ceil(
    filteredDrives.length / drivesPerPage
  );

  const startIndex = (currentPage - 1) * drivesPerPage;

  const visibleDrives = filteredDrives.slice(
    startIndex,
    startIndex + drivesPerPage
  );

  const handleFilterChange = (name, value) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));

    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      branch: "All Branches",
      minCtc: "All",
      location: "All Locations",
      status: "All",
      sortBy: "Registration Deadline",
    });

    setCurrentPage(1);
  };

  const handleApply = (driveId) => {
    console.log("Applying for drive:", driveId);
    navigate(`/drives/${driveId}/apply`);
  };

  const handleViewDetails = (driveId) => {
    console.log("Viewing drive:", driveId);
    navigate(`/drives/${driveId}`);

  };

  return (
    <main className="drives-page">
      <section className="drives-heading">
        <div>
          <h1>Drives</h1>
          <p>
            Explore and apply to the latest placement
            opportunities.
          </p>
        </div>
      </section>

      <DriveFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      <div className="drives-content-layout">
        <section className="drives-list-section">
          <p className="drives-result-count">
            {filteredDrives.length}{" "}
            {filteredDrives.length === 1 ? "Drive" : "Drives"} found
          </p>

          <div className="drives-list">
            {visibleDrives.length > 0 ? (
              visibleDrives.map((drive) => (
                <DriveCard
                  key={drive.id}
                  drive={drive}
                  onApply={handleApply}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <div className="drives-empty-state">
                <h3>No suitable drives found</h3>
                <p>
                  Try changing the filters or updating your profile
                  preferences.
                </p>

                <button type="button" onClick={resetFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </section>

        <DrivesSidebar />
      </div>
    </main>
  );
}

export default Drives;