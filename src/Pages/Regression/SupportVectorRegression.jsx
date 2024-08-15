import { useState, Suspense, lazy } from "react";
import Base from "../../Components/Base";
import { useFileHandling } from "../../hooks/useFileHandling";
import { usePagination } from "../../hooks/usePagination";
import FormTunning from "../../Components/FormTunning";
import Modal from "../../Components/Modal";
import DataTable from "../../Components/DataTable";
import FileUpload from "../../Components/FileUpload";
import Alerts from "../../Components/Alerts";
import { regression } from "../../api/regression";
import Fallback from "../../Components/Fallback";

// Lazy load Hasil component
const Hasil = lazy(() => import("../../Components/Hasil"));
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
  const [response,setResponse] = useState(null)
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
    setResponse(null);
    e.preventDefault();
    const result = await regression("svr-regression", {
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
    setResponse(result);
  };
  const form_inputs = [
    {
      id: "X_new",
      name: "X_new",
      type: "textarea",
      placeholder: "[[1, 2], [3, 4]]",
      value: formData.X_new,
      onChange: handleChange,
      label: "X_new",
      description:
        "Matriks fitur baru untuk prediksi. Format: [[feature1, feature2], [feature3, feature4]]. Default: null.",
    },
    {
      id: "kernel",
      name: "kernel",
      type: "select",
      value: formData.kernel,
      onChange: handleChange,
      label: "Kernel",
      description: "Fungsi kernel yang akan digunakan dalam algoritma. Default: 'rbf'.",
      options: [
        { value: "linear", label: "Linear" },
        { value: "poly", label: "Polynomial" },
        { value: "rbf", label: "RBF" },
        { value: "sigmoid", label: "Sigmoid" },
      ],
    },
    {
      id: "degree",
      name: "degree",
      type: "number",
      placeholder: "3",
      value: formData.degree,
      onChange: handleChange,
      label: "Degree",
      description: "Degree dari polynomial kernel function ('poly'). Diabaikan untuk kernel lain. Default: 3.",
    },
    {
      id: "gamma",
      name: "gamma",
      type: "select",
      value: formData.gamma,
      onChange: handleChange,
      label: "Gamma",
      description: "Koefisien kernel untuk kernel RBF, poly, dan sigmoid. Default: 'scale'.",
      options: [
        { value: "scale", label: "Scale" },
        { value: "auto", label: "Auto" },
      ],
    },
    {
      id: "coef0",
      name: "coef0",
      type: "number",
      placeholder: "0.0",
      value: formData.coef0,
      onChange: handleChange,
      label: "Coef0",
      description: "Istilah independen di kernel polynomial dan sigmoid. Default: 0.0.",
    },
    {
      id: "tol",
      name: "tol",
      type: "number",
      placeholder: "0.001",
      value: formData.tol,
      onChange: handleChange,
      label: "Tolerance",
      description: "Toleransi untuk criteria stop. Default: 0.001.",
    },
    {
      id: "C",
      name: "C",
      type: "number",
      placeholder: "1.0",
      value: formData.C,
      onChange: handleChange,
      label: "Regularization Parameter (C)",
      description: "Parameter regulasi. Default: 1.0.",
    },
    {
      id: "epsilon",
      name: "epsilon",
      type: "number",
      placeholder: "0.1",
      value: formData.epsilon,
      onChange: handleChange,
      label: "Epsilon",
      description: "Nilai epsilon dalam fungsi loss epsilon-insensitive. Default: 0.1.",
    },
    {
      id: "shrinking",
      name: "shrinking",
      type: "select",
      value: formData.shrinking,
      onChange: handleChange,
      label: "Shrinking",
      description: "Apakah akan menggunakan heuristic shrinking. Default: true.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
    },
    {
      id: "cache_size",
      name: "cache_size",
      type: "number",
      placeholder: "200",
      value: formData.cache_size,
      onChange: handleChange,
      label: "Cache Size",
      description: "Ukuran cache kernel (dalam MB). Default: 200.",
    },
    {
      id: "verbose",
      name: "verbose",
      type: "select",
      value: formData.verbose,
      onChange: handleChange,
      label: "Verbose",
      description: "Apakah akan mengaktifkan output verbose. Default: false.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
    },
    {
      id: "max_iter",
      name: "max_iter",
      type: "number",
      placeholder: "-1",
      value: formData.max_iter,
      onChange: handleChange,
      label: "Max Iterations",
      description: "Jumlah maksimum iterasi. Default: -1 (tak terbatas).",
    },
    {
      id: "test_size",
      name: "test_size",
      type: "number",
      placeholder: "0.2",
      value: formData.test_size,
      onChange: handleChange,
      label: "Test Size",
      description: "Proporsi data untuk set pengujian. Default: 0.2.",
    },
    {
      id: "random_state",
      name: "random_state",
      type: "number",
      placeholder: "42",
      value: formData.random_state,
      onChange: handleChange,
      label: "Random State",
      description: "Seed untuk random number generator. Default: 42.",
    },
  ];


  return (
    <Base pretitle="Regression" title="Support Vector Regression">
      {response && response.status !== 200 && (
        <Alerts message={response.data.error} />
      )}
      <FileUpload handleFileChange={handleFileChange} />
      {data.length > 0 && (
        <>
          <DataTable
            headers={headers}
            data={currentItems}
            dropdownValues={dropdownValues}
            handleDropdownChange={handleDropdownChange}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
          <FormTunning form_inputs={form_inputs} handleSubmit={handleSubmit} />
          {/* Suspense wrapper for Hasil component */}
          <Suspense fallback={<Fallback/>}>
            {response && response.status === 200 && (
              <Hasil responseData={response.data} />
            )}
          </Suspense>
        </>
      )}
      <Modal xValues={xValues} yData={yData} />
    </Base>
  );
}
