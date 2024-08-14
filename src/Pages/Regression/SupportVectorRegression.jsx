import { useState } from "react";
import Base from "../../Components/Base";
import { useFileHandling } from "../../hooks/useFileHandling";
import { usePagination } from "../../hooks/usePagination";
import axios from "axios";
import Hasil from "../../Components/Hasil";

export default function SupportVectorRegression() {
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
  const [responseData, setResponseData] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [formData, setFormData] = useState({
    X_new: "",
    kernel: "rbf",
    degree: 3,
    gamma: "scale",
    coef0: 0.0,
    tol: 0.001,
    C: 1.0,
    epsilon: 0.1,
    shrinking: "true",
    cache_size: 200,
    verbose: "false",
    max_iter: -1,
    test_size: 0.2,
    random_state: 42,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/regression/svr-regression",
        {
          X: xValues,
          y: yData,
          X_new: formData.X_new ? JSON.parse(formData.X_new) : null,
          kernel: formData.kernel,
          degree: parseInt(formData.degree, 10),
          gamma: formData.gamma,
          coef0: parseFloat(formData.coef0),
          tol: parseFloat(formData.tol),
          C: parseFloat(formData.C),
          epsilon: parseFloat(formData.epsilon),
          shrinking: formData.shrinking === "true",
          cache_size: parseInt(formData.cache_size, 10),
          verbose: formData.verbose === "true",
          max_iter: parseInt(formData.max_iter, 10),
          test_size: parseFloat(formData.test_size),
          random_state: parseInt(formData.random_state, 10),
        }
      );
      console.log(response.data);
      setResponseData(response.data);
      setResponseCode(response.status);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setResponseCode(error.response.status);
    }
  };

  return (
    <Base pretitle="Regression" title="Support Vector Regression">
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
                  <label htmlFor="X_new" className="form-label">
                    X_new:
                  </label>
                  <textarea
                    id="X_new"
                    name="X_new"
                    className="form-control"
                    rows="3"
                    placeholder="[[7, 8]]"
                    value={formData.X_new}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Matriks fitur baru untuk prediksi. Harus sesuai dengan shape
                    yang sama seperti X. Contoh: [[7, 8]].
                  </small>
                </div>

                {/* kernel */}
                <div className="mb-3">
                  <label htmlFor="kernel" className="form-label">
                    kernel:
                  </label>
                  <select
                    id="kernel"
                    name="kernel"
                    className="form-select"
                    value={formData.kernel}
                    onChange={handleChange}
                  >
                    <option value="linear">linear</option>
                    <option value="poly">poly</option>
                    <option value="rbf">rbf</option>
                    <option value="sigmoid">sigmoid</option>
                  </select>
                  <small className="form-text text-muted">
                    Fungsi kernel yang digunakan. Default: rbf.
                  </small>
                </div>

                {/* degree */}
                <div className="mb-3">
                  <label htmlFor="degree" className="form-label">
                    degree:
                  </label>
                  <input
                    type="number"
                    id="degree"
                    name="degree"
                    className="form-control"
                    placeholder="3"
                    value={formData.degree}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    {`Derajat polinomial untuk kernel 'poly'. Default: 3.`}
                  </small>
                </div>

                {/* gamma */}
                <div className="mb-3">
                  <label htmlFor="gamma" className="form-label">
                    gamma:
                  </label>
                  <select
                    id="gamma"
                    name="gamma"
                    className="form-select"
                    value={formData.gamma}
                    onChange={handleChange}
                  >
                    <option value="scale">scale</option>
                    <option value="auto">auto</option>
                    <option value="float">float</option>
                  </select>
                  <small className="form-text text-muted">
                    Parameter gamma untuk kernel. Default: scale.
                  </small>
                </div>

                {/* coef0 */}
                <div className="mb-3">
                  <label htmlFor="coef0" className="form-label">
                    coef0:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    id="coef0"
                    name="coef0"
                    className="form-control"
                    placeholder="0.0"
                    value={formData.coef0}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Parameter coef0 untuk kernel. Default: 0.0.
                  </small>
                </div>

                {/* tol */}
                <div className="mb-3">
                  <label htmlFor="tol" className="form-label">
                    tol:
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    id="tol"
                    name="tol"
                    className="form-control"
                    placeholder="0.001"
                    value={formData.tol}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Toleransi untuk kondisi berhenti. Default: 0.001.
                  </small>
                </div>

                {/* C */}
                <div className="mb-3">
                  <label htmlFor="C" className="form-label">
                    C:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    id="C"
                    name="C"
                    className="form-control"
                    placeholder="1.0"
                    value={formData.C}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Parameter regularisasi. Default: 1.0.
                  </small>
                </div>

                {/* epsilon */}
                <div className="mb-3">
                  <label htmlFor="epsilon" className="form-label">
                    epsilon:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    id="epsilon"
                    name="epsilon"
                    className="form-control"
                    placeholder="0.1"
                    value={formData.epsilon}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Parameter epsilon untuk model. Default: 0.1.
                  </small>
                </div>

                {/* shrinking */}
                <div className="mb-3">
                  <label htmlFor="shrinking" className="form-label">
                    shrinking:
                  </label>
                  <select
                    id="shrinking"
                    name="shrinking"
                    className="form-select"
                    value={formData.shrinking}
                    onChange={handleChange}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                  <small className="form-text text-muted">
                    Menentukan apakah teknik shrinking digunakan. Default: true.
                  </small>
                </div>

                {/* cache_size */}
                <div className="mb-3">
                  <label htmlFor="cache_size" className="form-label">
                    cache_size:
                  </label>
                  <input
                    type="number"
                    id="cache_size"
                    name="cache_size"
                    className="form-control"
                    placeholder="200"
                    value={formData.cache_size}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Ukuran cache dalam MB. Default: 200.
                  </small>
                </div>

                {/* verbose */}
                <div className="mb-3">
                  <label htmlFor="verbose" className="form-label">
                    verbose:
                  </label>
                  <select
                    id="verbose"
                    name="verbose"
                    className="form-select"
                    value={formData.verbose}
                    onChange={handleChange}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                  <small className="form-text text-muted">
                    Menentukan apakah output verbose diaktifkan. Default: false.
                  </small>
                </div>

                {/* max_iter */}
                <div className="mb-3">
                  <label htmlFor="max_iter" className="form-label">
                    max_iter:
                  </label>
                  <input
                    type="number"
                    id="max_iter"
                    name="max_iter"
                    className="form-control"
                    placeholder="-1"
                    value={formData.max_iter}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Jumlah iterasi maksimum untuk solver. Default: -1 (tak
                    terbatas).
                  </small>
                </div>

                {/* test_size */}
                <div className="mb-3">
                  <label htmlFor="test_size" className="form-label">
                    test_size:
                  </label>
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
                  <label htmlFor="random_state" className="form-label">
                    random_state:
                  </label>
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

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>

          {responseCode === 200 && (
            <Hasil responseData={responseData} />
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
