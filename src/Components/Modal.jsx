import PropTypes from "prop-types";

export default function Modal({ xValues, yData }) {
  return (
    <>
      <div
        className="modal modal-blur fade"
        id="modal-X"
        tabIndex={-1}
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nilai X</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div>
                <h4>Nilai X:</h4>
                <pre>{JSON.stringify(xValues, null, 2)}</pre>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn me-auto"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal modal-blur fade"
        id="modal-y"
        tabIndex={-1}
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nilai y</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div>
                <h4>Nilai y:</h4>
                <pre>{JSON.stringify(yData, null, 2)}</pre>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn me-auto"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  xValues: PropTypes.array.isRequired,
  yData: PropTypes.array.isRequired,
};
