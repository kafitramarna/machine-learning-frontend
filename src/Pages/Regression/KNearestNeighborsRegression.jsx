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
    feature_scaling_X: "false",
    feature_scaling_y: "false",
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
    setResponse(null);
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
          feature_scaling_X: formData.feature_scaling_X === "true",
          feature_scaling_y: formData.feature_scaling_y === "true",
          test_size: parseFloat(formData.test_size),
          random_state: parseInt(formData.random_state, 10),
    });
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
      id: "n_neighbors",
      name: "n_neighbors",
      type: "number",
      placeholder: "5",
      value: formData.n_neighbors,
      onChange: handleChange,
      label: "Number of Neighbors",
      description: "Jumlah tetangga yang digunakan untuk klasifikasi. Default: 5.",
    },
    {
      id: "weights",
      name: "weights",
      type: "select",
      value: formData.weights,
      onChange: handleChange,
      label: "Weights",
      description: "Metode pemberian bobot pada tetangga. Default: 'uniform'.",
      options: [
        { value: "uniform", label: "Uniform" },
        { value: "distance", label: "Distance" },
      ],
    },
    {
      id: "algorithm",
      name: "algorithm",
      type: "select",
      value: formData.algorithm,
      onChange: handleChange,
      label: "Algorithm",
      description: "Algoritma yang digunakan untuk pencarian tetangga. Default: 'auto'.",
      options: [
        { value: "auto", label: "Auto" },
        { value: "ball_tree", label: "Ball Tree" },
        { value: "kd_tree", label: "KD Tree" },
        { value: "brute", label: "Brute" },
      ],
    },
    {
      id: "leaf_size",
      name: "leaf_size",
      type: "number",
      placeholder: "30",
      value: formData.leaf_size,
      onChange: handleChange,
      label: "Leaf Size",
      description: "Ukuran daun untuk struktur data tree. Default: 30.",
    },
    {
      id: "p",
      name: "p",
      type: "number",
      placeholder: "2",
      value: formData.p,
      onChange: handleChange,
      label: "Power Parameter",
      description: "Parameter p untuk metric Minkowski. Default: 2.",
    },
    {
      id: "metric",
      name: "metric",
      type: "select",
      value: formData.metric,
      onChange: handleChange,
      label: "Metric",
      description: "Metric yang digunakan untuk perhitungan jarak. Default: 'minkowski'.",
      options: [
        { value: "minkowski", label: "Minkowski" },
        { value: "euclidean", label: "Euclidean" },
        { value: "manhattan", label: "Manhattan" },
        { value: "chebyshev", label: "Chebyshev" },
      ],
    },
    {
      id: "metric_params",
      name: "metric_params",
      type: "textarea",
      placeholder: "{}",
      value: formData.metric_params,
      onChange: handleChange,
      label: "Metric Params",
      description: "Parameter tambahan untuk metric. Format JSON. Default: null.",
    },
    {
      id: "n_jobs",
      name: "n_jobs",
      type: "number",
      placeholder: "null",
      value: formData.n_jobs,
      onChange: handleChange,
      label: "Number of Jobs",
      description: "Jumlah pekerjaan paralel yang digunakan untuk pelatihan. Default: null.",
    },
    {
      id: "feature_scaling_X",
      name: "feature_scaling_X",
      type: "select",
      value: formData.feature_scaling_X,
      onChange: handleChange,
      label: "Feature Scaling X",
      description: "Apakah akan menerapkan skala fitur pada X? Default: false.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
    },
    {
      id: "feature_scaling_y",
      name: "feature_scaling_y",
      type: "select",
      value: formData.feature_scaling_y,
      onChange: handleChange,
      label: "Feature Scaling y",
      description: "Apakah akan menerapkan skala fitur pada y? Default: false.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
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
  
  
  return(
    <Base pretitle="Regression" title="K-Nearest Neighbors">
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
  )
}
