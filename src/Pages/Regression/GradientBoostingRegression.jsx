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
export default function GradientBoostingRegression() {
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
    feature_scaling_X: "false",
    feature_scaling_y: "false",
    test_size: 0.2,
    random_state: 42,
    n_estimators: 100,
    learning_rate: 0.1,
    loss: "squared_error",
    criterion: "friedman_mse",
    min_samples_split: 2,
    min_samples_leaf: 1,
    min_weight_fraction_leaf: 0.0,
    max_depth: null,
    max_features: "sqrt",
    alpha: 0.9,
    init: null,
    subsample: 1.0,
    validation_fraction: 0.1,
    n_iter_no_change: null,
    tol: 0.0001,
    warm_start: false,
    ccp_alpha: 0.0,
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
    const result = await regression("gradient-boosting-regression", {
      X: xValues,
      y: yData,
      X_new: formData.X_new ? JSON.parse(formData.X_new) : null,
      feature_scaling_X: formData.feature_scaling_X === "true",
      feature_scaling_y: formData.feature_scaling_y === "true",
      test_size: parseFloat(formData.test_size),
      random_state: parseInt(formData.random_state, 10),
      n_estimators: parseInt(formData.n_estimators, 10),
      learning_rate: parseFloat(formData.learning_rate),
      loss: formData.loss,
      criterion: formData.criterion,
      min_samples_split: parseInt(formData.min_samples_split, 10),
      min_samples_leaf: parseInt(formData.min_samples_leaf, 10),
      min_weight_fraction_leaf: parseFloat(formData.min_weight_fraction_leaf),
      max_depth: formData.max_depth !== null ? parseInt(formData.max_depth, 10) : null,
      max_features: formData.max_features,
      alpha: parseFloat(formData.alpha),
      init: formData.init || null,
      subsample: parseFloat(formData.subsample),
      validation_fraction: parseFloat(formData.validation_fraction),
      n_iter_no_change: formData.n_iter_no_change !== null ? parseInt(formData.n_iter_no_change, 10) : null,
      tol: parseFloat(formData.tol),
      warm_start: formData.warm_start === "true",
      ccp_alpha: parseFloat(formData.ccp_alpha),
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
      description: "Matriks fitur baru untuk prediksi. Format: [[feature1, feature2], [feature3, feature4]]. Default: null.",
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
    {
      id: "n_estimators",
      name: "n_estimators",
      type: "number",
      placeholder: "100",
      value: formData.n_estimators,
      onChange: handleChange,
      label: "Number of Estimators",
      description: "Jumlah estimator dalam model. Default: 100.",
    },
    {
      id: "learning_rate",
      name: "learning_rate",
      type: "number",
      placeholder: "0.1",
      value: formData.learning_rate,
      onChange: handleChange,
      label: "Learning Rate",
      description: "Tingkat pembelajaran. Default: 0.1.",
    },
    {
      id: "loss",
      name: "loss",
      type: "select",
      value: formData.loss,
      onChange: handleChange,
      label: "Loss",
      description: "Fungsi loss yang digunakan. Default: 'squared_error'.",
      options: [
        { value: "squared_error", label: "Squared Error" },
        { value: "absolute_error", label: "Absolute Error" },
        { value: "huber", label: "Huber" },
        { value: "poisson", label: "Poisson" },
      ],
    },
    {
      id: "criterion",
      name: "criterion",
      type: "select",
      value: formData.criterion,
      onChange: handleChange,
      label: "Criterion",
      description: "Fungsi yang digunakan untuk mengukur kualitas split. Default: 'friedman_mse'.",
      options: [
        { value: "friedman_mse", label: "Friedman MSE" },
        { value: "squared_error", label: "Squared Error" },
        { value: "absolute_error", label: "Absolute Error" },
      ],
    },
    {
      id: "min_samples_split",
      name: "min_samples_split",
      type: "number",
      placeholder: "2",
      value: formData.min_samples_split,
      onChange: handleChange,
      label: "Min Samples Split",
      description: "Jumlah minimum sampel yang dibutuhkan untuk split internal node. Default: 2.",
    },
    {
      id: "min_samples_leaf",
      name: "min_samples_leaf",
      type: "number",
      placeholder: "1",
      value: formData.min_samples_leaf,
      onChange: handleChange,
      label: "Min Samples Leaf",
      description: "Jumlah minimum sampel yang dibutuhkan untuk menjadi leaf node. Default: 1.",
    },
    {
      id: "min_weight_fraction_leaf",
      name: "min_weight_fraction_leaf",
      type: "number",
      placeholder: "0.0",
      value: formData.min_weight_fraction_leaf,
      onChange: handleChange,
      label: "Min Weight Fraction Leaf",
      description: "Minimum fraction of the sum total of weights required to be at a leaf node. Default: 0.0.",
    },
    {
      id: "max_depth",
      name: "max_depth",
      type: "number",
      placeholder: "None",
      value: formData.max_depth,
      onChange: handleChange,
      label: "Max Depth",
      description: "Kedalaman maksimum dari pohon. Default: None.",
    },
    {
      id: "max_features",
      name: "max_features",
      type: "select",
      value: formData.max_features,
      onChange: handleChange,
      label: "Max Features",
      description: "Jumlah fitur yang dipertimbangkan untuk split. Default: 'sqrt'.",
      options: [
        { value: "sqrt", label: "Square Root" },
        { value: "log2", label: "Log2" },
        { value: "", label: "Custom (Enter a Number or Fraction)" },
      ],
    },
    {
      id: "alpha",
      name: "alpha",
      type: "number",
      placeholder: "0.9",
      value: formData.alpha,
      onChange: handleChange,
      label: "Alpha",
      description: "Alpha quantile for the huber loss function. Default: 0.9.",
    },
    {
      id: "init",
      name: "init",
      type: "text",
      placeholder: "None",
      value: formData.init,
      onChange: handleChange,
      label: "Init",
      description: "Estimator untuk inisialisasi. Default: None.",
    },
    {
      id: "subsample",
      name: "subsample",
      type: "number",
      placeholder: "1.0",
      value: formData.subsample,
      onChange: handleChange,
      label: "Subsample",
      description: "Fraksi sampel yang digunakan untuk fitting. Default: 1.0.",
    },
    {
      id: "validation_fraction",
      name: "validation_fraction",
      type: "number",
      placeholder: "0.1",
      value: formData.validation_fraction,
      onChange: handleChange,
      label: "Validation Fraction",
      description: "Fraksi data training yang digunakan untuk validasi. Default: 0.1.",
    },
    {
      id: "n_iter_no_change",
      name: "n_iter_no_change",
      type: "number",
      placeholder: "None",
      value: formData.n_iter_no_change,
      onChange: handleChange,
      label: "N Iter No Change",
      description: "Jumlah iterasi tanpa perubahan untuk menghentikan pelatihan lebih awal. Default: None.",
    },
    {
      id: "tol",
      name: "tol",
      type: "number",
      placeholder: "0.0001",
      value: formData.tol,
      onChange: handleChange,
      label: "Tolerance",
      description: "Tolerance untuk menghentikan pelatihan lebih awal. Default: 0.0001.",
    },
    {
      id: "warm_start",
      name: "warm_start",
      type: "select",
      value: formData.warm_start,
      onChange: handleChange,
      label: "Warm Start",
      description: "Apakah akan menggunakan warm start untuk melanjutkan pelatihan dari model sebelumnya? Default: false.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
    },
    {
      id: "ccp_alpha",
      name: "ccp_alpha",
      type: "number",
      placeholder: "0.0",
      value: formData.ccp_alpha,
      onChange: handleChange,
      label: "CCP Alpha",
      description: "Kompleksitas regularisasi minimal untuk pruning pohon. Default: 0.0.",
    },
  ];
  

  return (
    <Base pretitle="Regression" title="Gradient Boosting Regression">
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
          <Suspense fallback={<Fallback />}>
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
