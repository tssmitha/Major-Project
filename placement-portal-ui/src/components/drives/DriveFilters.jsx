import {
  ListFilter,
  RotateCcw,
  Search,
} from "lucide-react";

function DriveFilters({
  filters,
  onFilterChange,
  onReset,
}) {
  return (
    <section className="drive-filters">
      <div className="drive-search-wrapper">
        <Search size={19} />

        <input
          type="text"
          value={filters.search}
          placeholder="Search by company or role"
          onChange={(event) =>
            onFilterChange("search", event.target.value)
          }
        />
      </div>

      <div className="drive-filter-control">
        <label htmlFor="branch-filter">Branch</label>

        <select
          id="branch-filter"
          value={filters.branch}
          onChange={(event) =>
            onFilterChange("branch", event.target.value)
          }
        >
          <option>All Branches</option>
          <option>CSE</option>
          <option>ISE</option>
          <option>ECE</option>
          <option>EEE</option>
          <option>IT</option>
          <option>AIML</option>
        </select>
      </div>

      <div className="drive-filter-control">
        <label htmlFor="ctc-filter">Min CTC</label>

        <select
          id="ctc-filter"
          value={filters.minCtc}
          onChange={(event) =>
            onFilterChange("minCtc", event.target.value)
          }
        >
          <option value="All">All</option>
          <option value="5">₹5 LPA+</option>
          <option value="8">₹8 LPA+</option>
          <option value="10">₹10 LPA+</option>
          <option value="15">₹15 LPA+</option>
          <option value="20">₹20 LPA+</option>
        </select>
      </div>

      <div className="drive-filter-control">
        <label htmlFor="location-filter">Location</label>

        <select
          id="location-filter"
          value={filters.location}
          onChange={(event) =>
            onFilterChange("location", event.target.value)
          }
        >
          <option>All Locations</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Mysuru</option>
          <option>Mumbai</option>
          <option>Pune</option>
          <option>Chennai</option>
        </select>
      </div>

      <div className="drive-filter-control">
        <label htmlFor="status-filter">Status</label>

        <select
          id="status-filter"
          value={filters.status}
          onChange={(event) =>
            onFilterChange("status", event.target.value)
          }
        >
          <option>All</option>
          <option>Eligible</option>
          <option>Applied</option>
          <option>Closing Soon</option>
          <option>Closed</option>
        </select>
      </div>

      <div className="drive-filter-control drive-sort-control">
        <label htmlFor="sort-filter">Sort By</label>

        <select
          id="sort-filter"
          value={filters.sortBy}
          onChange={(event) =>
            onFilterChange("sortBy", event.target.value)
          }
        >
          <option>Registration Deadline</option>
          <option>Highest CTC</option>
          <option>Lowest CGPA</option>
          <option>Company Name</option>
        </select>
      </div>

      <button
        className="filter-icon-button"
        type="button"
        aria-label="Filter drives"
      >
        <ListFilter size={20} />
      </button>

      <button
        className="reset-filters-button"
        type="button"
        onClick={onReset}
      >
        <RotateCcw size={17} />
        Reset
      </button>
    </section>
  );
}

export default DriveFilters;