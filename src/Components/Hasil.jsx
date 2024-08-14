import PropTypes from "prop-types";

export default function Hasil({ responseData }) {
  return (
    <div className="card card-sm">
      {responseData.image && (
        <a href="#" className="d-block">
          <img
            src={`data:image/png;base64,${responseData.image}`}
            className="card-img-top"
            alt="Model Image"
          />
        </a>
      )}
      <div className="card-body">
        <div className="d-flex flex-column">
          <h5 className="card-title">{responseData.model}</h5>
          <p className="card-text text-muted mb-2">
            R squared value: <strong>{responseData.r2 ?? 'N/A'}</strong>
          </p>
          <p className="card-text text-muted mb-2">
            MSE value: <strong>{responseData.mse ?? 'N/A'}</strong>
          </p>
          {responseData.y_new && responseData.y_new.length > 0 && (
            <>
              <p className="card-text text-muted mb-2">y_new values:</p>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {responseData.y_new.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Hasil.propTypes = {
  responseData: PropTypes.shape({
    image: PropTypes.string,
    model: PropTypes.string.isRequired,
    r2: PropTypes.number,
    mse: PropTypes.number,
    y_new: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};
