import { useState } from "react";
import Base from "../../Components/Base";
import { useFileHandling } from "../../hooks/useFileHandling";
import { usePagination } from "../../hooks/usePagination";
import Hasil from "../../Components/Hasil";
import { regression } from "../../api/regression";

export default function PolynomialRegression() {
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
    copy_X: "true",
    degree: 2,
    include_bias: "true",
    interaction_only: "false",
    order: "C",
    n_jobs: "",
    positive: "false",
    fit_intercept: "true",
    feature_scaling: "false",
    test_size: "",
    random_state: "",
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
    const result = await regression("poly-regression", {
          X: xValues,
          y: yData,
          X_new: formData.X_new ? JSON.parse(formData.X_new) : null,
          copy_X: formData.copy_X === true,
          n_jobs: formData.n_jobs ? parseInt(formData.n_jobs, 10) : null,
          positive: formData.positive === true,
          fit_intercept: formData.fit_intercept === true,
          feature_scaling: formData.feature_scaling === true,
          test_size: formData.test_size ? parseFloat(formData.test_size) : 0.2,
          random_state: formData.random_state
            ? parseInt(formData.random_state, 10)
            : 42,
    });
    setResponse(result);
  };

  return (
    <Base pretitle="Regression" title="Polynomial Regression">
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
                    placeholder="2"
                    value={formData.degree}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Derajat polinomial untuk transformasi fitur. Default: 2.
                  </small>
                </div>

                {/* include_bias */}
                <div className="mb-3">
                  <label htmlFor="include_bias" className="form-label">
                    include_bias:
                  </label>
                  <select
                    id="include_bias"
                    name="include_bias"
                    className="form-select"
                    value={formData.include_bias}
                    onChange={handleChange}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                  <small className="form-text text-muted">
                    Menentukan apakah bias harus disertakan dalam transformasi
                    fitur. Default: true.
                  </small>
                </div>

                {/* interaction_only */}
                <div className="mb-3">
                  <label htmlFor="interaction_only" className="form-label">
                    interaction_only:
                  </label>
                  <select
                    id="interaction_only"
                    name="interaction_only"
                    className="form-select"
                    value={formData.interaction_only}
                    onChange={handleChange}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                  <small className="form-text text-muted">
                    Menentukan apakah hanya interaksi fitur yang harus dihitung.
                    Default: false.
                  </small>
                </div>

                {/* order */}
                <div className="mb-3">
                  <label htmlFor="order" className="form-label">
                    order:
                  </label>
                  <select
                    id="order"
                    name="order"
                    className="form-select"
                    value={formData.order}
                    onChange={handleChange}
                  >
                    <option value="C">C</option>
                    <option value="F">F</option>
                  </select>
                  <small className="form-text text-muted">
                    {`Urutan memori array. Pilihan: 'C' (baris utama) atau 'F'
                    (kolom utama). Default: 'C'.`}
                  </small>
                </div>

                {/* copy_X */}
                <div className="mb-3">
                  <label htmlFor="copy_X" className="form-label">
                    copy_X:
                  </label>
                  <select
                    id="copy_X"
                    name="copy_X"
                    className="form-select"
                    value={formData.copy_X}
                    onChange={handleChange}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                  <small className="form-text text-muted">
                    Menentukan apakah data fitur harus disalin atau tidak.
                    Default: true.
                  </small>
                </div>

                {/* n_jobs */}
                <div className="mb-3">
                  <label htmlFor="n_jobs" className="form-label">
                    n_jobs:
                  </label>
                  <input
                    type="number"
                    id="n_jobs"
                    name="n_jobs"
                    className="form-control"
                    placeholder="4"
                    value={formData.n_jobs}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Jumlah pekerjaan paralel yang digunakan untuk komputasi.
                    Default: null.
                  </small>
                </div>

                {/* positive */}
                <div className="mb-3">
                  <label htmlFor="positive" className="form-label">
                    positive:
                  </label>
                  <select
                    id="positive"
                    name="positive"
                    className="form-select"
                    value={formData.positive}
                    onChange={handleChange}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                  <small className="form-text text-muted">
                    Menentukan apakah hanya koefisien positif yang
                    diperbolehkan. Default: false.
                  </small>
                </div>

                {/* fit_intercept */}
                <div className="mb-3">
                  <label htmlFor="fit_intercept" className="form-label">
                    fit_intercept:
                  </label>
                  <select
                    id="fit_intercept"
                    name="fit_intercept"
                    className="form-select"
                    value={formData.fit_intercept}
                    onChange={handleChange}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                  <small className="form-text text-muted">
                    Menentukan apakah intersep harus dihitung dan ditambahkan ke
                    model. Default: true.
                  </small>
                </div>

                {/* feature_scaling */}
                <div className="mb-3">
                  <label htmlFor="feature_scaling" className="form-label">
                    feature_scaling:
                  </label>
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
                    Menentukan apakah fitur harus diskalakan sebelum pelatihan
                    model. Default: false.
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
                    Proporsi data pelatihan yang digunakan untuk validasi model.
                    Default: 0.2.
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
                    Seed untuk generator angka acak. Default: 42.
                  </small>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>

          {response && response.status === 200 && (
            <Hasil responseData={response.data} />
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
