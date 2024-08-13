import { useState } from 'react';

export function usePagination(initialPage = 1, itemsPerPage = 20) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPages = Math.ceil(itemsPerPage / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return { currentPage, indexOfFirstItem, indexOfLastItem, totalPages, handlePageChange };
}
