import PropTypes from "prop-types";
export default function DataTable({
    headers,
    data,
    dropdownValues,
    handleDropdownChange,
    currentPage,
    totalPages,
    handlePageChange,
  }) {
    return (
      <div className="card card-md mb-3">
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
              <tr>
                {headers.map((_, index) => (
                  <th key={index}>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        handleDropdownChange(index, e.target.value)
                      }
                      value={dropdownValues[index] || "-"}
                      disabled={
                        dropdownValues.includes("Y") &&
                        dropdownValues[index] !== "Y"
                      }
                    >
                      <option value="-">-</option>
                      <option value="X">X</option>
                      <option value="Y">Y</option>
                    </select>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M15 6l-6 6l6 6"></path>
                </svg>
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) handlePageChange(currentPage + 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 6l6 6l-6 6"></path>
                </svg>
              </a>
            </li>
          </ul>
          <div className="d-flex gap-2">
                <a
                  href="#"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-X"
                >
                  Lihat Nilai X
                </a>
                <a
                  href="#"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-y"
                >
                  Lihat Nilai y
                </a>
              </div>
        </div>
      </div>
    );
  }
  
  DataTable.propTypes = {
    headers: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    dropdownValues: PropTypes.array.isRequired,
    handleDropdownChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
  };