/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const CircularPagination = ({ totalPages, currentPage, onPageChange }) => {
  const [activePage, setActivePage] = useState(currentPage || 1);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    setActivePage(currentPage); // Sincronizar con el prop
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setActivePage(page);
    onPageChange(page); // Notificar cambio de página
  };

  const getPageNumbers = () => {
    let maxPagesToShow = windowWidth <= 480 ? 3 : windowWidth <= 768 ? 5 : 7;
    const pages = [];

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      const offset = Math.floor(maxPagesToShow / 2);
      let startPage = Math.max(2, activePage - offset);
      let endPage = Math.min(totalPages - 1, activePage + offset);

      if (startPage <= 2) endPage = Math.min(totalPages - 1, maxPagesToShow);
      if (endPage >= totalPages - 1) startPage = Math.max(2, totalPages - maxPagesToShow);

      if (startPage > 2) pages.push("...");
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center my-4 gap-2">
      <button
        onClick={() => changePage(activePage - 1)}
        className="px-2 py-1 text-sm border rounded-lg disabled:opacity-50"
        disabled={activePage === 1}
      >
        Prev
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 py-1 text-sm">...</span>
        ) : (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`w-8 h-8 flex items-center justify-center text-sm border rounded-lg ${
              activePage === page ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => changePage(activePage + 1)}
        className="px-2 py-1 text-sm border rounded-lg disabled:opacity-50"
        disabled={activePage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default CircularPagination;