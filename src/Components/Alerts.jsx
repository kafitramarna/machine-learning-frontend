import PropTypes from "prop-types";
import { useEffect } from "react";

export default function Alerts({ message }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Code to remove the alert after 5 seconds
      const alertElement = document.querySelector('.alert');
      if (alertElement) {
        alertElement.classList.remove('show');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="alert alert-important alert-danger alert-dismissible fixed-top m-3 fade show w-sm-100 w-md-50 w-lg-25"
      role="alert"
    >
      <div className="d-flex align-items-center">
        <div className="me-2">
          {/* Download SVG icon from http://tabler-icons.io/i/alert-circle */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon alert-icon"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
}

Alerts.propTypes = {
  message: PropTypes.string.isRequired,
};
