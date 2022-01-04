import React from "react";
import "./Pagination.css";

export default function Pagination({
  onNextPage,
  onPreviousPage,
  onChangePage,
  paginationGroup,
  currentPage,
  totalProduct,
  pageSize,
}) {
  return (
    <div>
      <div className="pagination">
        <button
          onClick={onPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {paginationGroup().map((item, index) => (
          <button key={index} onClick={onChangePage} className="paginationItem">
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={onNextPage}
          className={`next ${
            currentPage === Math.round(totalProduct / pageSize)
              ? "disabled"
              : ""
          }`}
        >
          next
        </button>
      </div>
    </div>
  );
}
