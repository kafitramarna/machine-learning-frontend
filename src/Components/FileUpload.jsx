import PropTypes from "prop-types";
export default function FileUpload({ handleFileChange }) {
    return (
      <div className="card card-md mb-3">
        <div className="card-body">
          <div className="mb-3">
            <div className="form-label">Masukkan File Dataset</div>
            <input
              type="file"
              className="form-control"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    );
  }
  
FileUpload.propTypes = {
    handleFileChange: PropTypes.func.isRequired,
};