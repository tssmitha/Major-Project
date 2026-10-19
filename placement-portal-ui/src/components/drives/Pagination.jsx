import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav
      className="drives-pagination"
      aria-label="Drive pages"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={
            currentPage === page ? "active" : ""
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}

export default Pagination;