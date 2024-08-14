import { useState } from "react";
import Base from "../../Components/Base";
import { useFileHandling } from "../../hooks/useFileHandling";
import { usePagination } from "../../hooks/usePagination";
import Hasil from "../../Components/Hasil";
import { regression } from "../../api/regression";

export default function KNearestNeighborsRegression() {
  const {
    data,
    headers,
    dropdownValues,
    xValues,
    yData,
    handleFileChange,
    handleDropdownChange,
  } = useFileHandling();
  const {
    currentPage,
    indexOfFirstItem,
    indexOfLastItem,
    totalPages,
    handlePageChange,
  } = usePagination(1, 20);

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const [response, setResponse] = useState(null);

  const [formData, setFormData] = useState({
    X_new: "",
    n_neighbors: 5,
    weights: "uniform",
    algorithm: "auto",
    leaf_size: 30,
    p: 2,
    metric: "minkowski",
    metric_params: "",
    n_jobs: "",
    feature_scaling: "false",
    test_size: 0.2,
    random_state: 42,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await regression('knn-regression', {
      X: xValues,
          y: yData,
          X_new: formData.X_new ? JSON.parse(formData.X_new) : null,
          n_neighbors: parseInt(formData.n_neighbors, 10),
          weights: formData.weights,
          algorithm: formData.algorithm,
          leaf_size: parseInt(formData.leaf_size, 10),
          p: parseInt(formData.p, 10),
          metric: formData.metric,
          metric_params: formData.metric_params ? JSON.parse(formData.metric_params) : null,
          n_jobs: formData.n_jobs ? parseInt(formData.n_jobs, 10) : null,
          feature_scaling: formData.feature_scaling === "true",
          test_size: parseFloat(formData.test_size),
          random_state: parseInt(formData.random_state, 10),
    });
    setResponse(result);
  };
  
  return (
    <Base pretitle="Regression" title="K-Nearest Neighbors">
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
      {data.length > 0 && (
        <>
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
                  {currentItems.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {headers.map((header, colIndex) => (
                        <td key={colIndex}>{row[header]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
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
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        handlePageChange(currentPage + 1);
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
          <div className="card card-md mb-3">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* X_new */}
          <div className="mb-3">
            <label htmlFor="X_new" className="form-label">X_new:</label>
            <textarea
              id="X_new"
              name="X_new"
              className="form-control"
              rows="3"
              placeholder="[[1, 2], [3, 4]]"
              value={formData.X_new}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              Matriks fitur baru untuk prediksi. Harus sesuai dengan shape yang sama seperti X. Contoh: [[1, 2], [3, 4]].
            </small>
          </div>

          {/* n_neighbors */}
          <div className="mb-3">
            <label htmlFor="n_neighbors" className="form-label">n_neighbors:</label>
            <input
              type="number"
              id="n_neighbors"
              name="n_neighbors"
              className="form-control"
              placeholder="5"
              value={formData.n_neighbors}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              Jumlah tetangga terdekat yang akan dipertimbangkan. Default: 5.
            </small>
          </div>

          {/* weights */}
          <div className="mb-3">
            <label htmlFor="weights" className="form-label">weights:</label>
            <select
              id="weights"
              name="weights"
              className="form-select"
              value={formData.weights}
              onChange={handleChange}
            >
              <option value="uniform">uniform</option>
              <option value="distance">distance</option>
            </select>
            <small className="form-text text-muted">
              Jenis bobot yang akan digunakan. Default: uniform.
            </small>
          </div>

          {/* algorithm */}
          <div className="mb-3">
            <label htmlFor="algorithm" className="form-label">algorithm:</label>
            <select
              id="algorithm"
              name="algorithm"
              className="form-select"
              value={formData.algorithm}
              onChange={handleChange}
            >
              <option value="auto">auto</option>
              <option value="ball_tree">ball_tree</option>
              <option value="kd_tree">kd_tree</option>
              <option value="brute">brute</option>
            </select>
            <small className="form-text text-muted">
              Algoritma yang digunakan untuk pencarian tetangga terdekat. Default: auto.
            </small>
          </div>

          {/* leaf_size */}
          <div className="mb-3">
            <label htmlFor="leaf_size" className="form-label">leaf_size:</label>
            <input
              type="number"
              id="leaf_size"
              name="leaf_size"
              className="form-control"
              placeholder="30"
              value={formData.leaf_size}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              Ukuran daun untuk algoritma ball_tree dan kd_tree. Default: 30.
            </small>
          </div>

          {/* p */}
          <div className="mb-3">
            <label htmlFor="p" className="form-label">p:</label>
            <input
              type="number"
              id="p"
              name="p"
              className="form-control"
              placeholder="2"
              value={formData.p}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              Parameter untuk pengukuran jarak. Default: 2 (Euclidean).
            </small>
          </div>

          {/* metric */}
          <div className="mb-3">
            <label htmlFor="metric" className="form-label">metric:</label>
            <select
              id="metric"
              name="metric"
              className="form-select"
              value={formData.metric}
              onChange={handleChange}
            >
              <option value="minkowski">minkowski</option>
              <option value="euclidean">euclidean</option>
              <option value="manhattan">manhattan</option>
            </select>
            <small className="form-text text-muted">
              Ukuran jarak yang digunakan. Default: minkowski.
            </small>
          </div>

          {/* metric_params */}
          <div className="mb-3">
            <label htmlFor="metric_params" className="form-label">metric_params:</label>
            <textarea
              id="metric_params"
              name="metric_params"
              className="form-control"
              rows="3"
              placeholder="{key: value}"
              value={formData.metric_params}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              {`Parameter tambahan untuk metric. Format JSON. Contoh: {"{"key": "value"}"}.`}
            </small>
          </div>

          {/* n_jobs */}
          <div className="mb-3">
            <label htmlFor="n_jobs" className="form-label">n_jobs:</label>
            <input
              type="number"
              id="n_jobs"
              name="n_jobs"
              className="form-control"
              placeholder=""
              value={formData.n_jobs}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              Jumlah job paralel yang akan digunakan. Default: null (tidak ada paralelisme).
            </small>
          </div>

          {/* feature_scaling */}
          <div className="mb-3">
            <label htmlFor="feature_scaling" className="form-label">feature_scaling:</label>
            <select
              id="feature_scaling"
              name="feature_scaling"
              className="form-select"
              value={formData.feature_scaling}
              onChange={handleChange}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            <small className="form-text text-muted">
              Menentukan apakah fitur akan diskalakan. Default: false.
            </small>
          </div>

          {/* test_size */}
          <div className="mb-3">
            <label htmlFor="test_size" className="form-label">test_size:</label>
            <input
              type="number"
              step="0.01"
              id="test_size"
              name="test_size"
              className="form-control"
              placeholder="0.2"
              value={formData.test_size}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              Proporsi data untuk set pengujian. Default: 0.2.
            </small>
          </div>

          {/* random_state */}
          <div className="mb-3">
            <label htmlFor="random_state" className="form-label">random_state:</label>
            <input
              type="number"
              id="random_state"
              name="random_state"
              className="form-control"
              placeholder="42"
              value={formData.random_state}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              Seed untuk pengacakan. Default: 42.
            </small>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
          {response && response.status === 200 && (
              <Hasil responseData={response.data  }/>
          )}
        </>
      )}
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
    </Base>
  );
}
