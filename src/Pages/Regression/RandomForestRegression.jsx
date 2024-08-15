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
export default function RandomForestRegression() {
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
    criterion: "squared_error",
    max_depth: null,
    min_samples_split: 2,
    min_samples_leaf: 1,
    min_weight_fraction_leaf: 0.0,
    max_features: 1.0,
    max_leaf_nodes: null,
    bootstrap: true,
    oob_score: false,
    n_jobs: null,
    random_state_rf: null,
    verbose: 0,
    warm_start: false,
    ccp_alpha: 0.0,
    max_samples: null,
    monotonic_cst: null,
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
    const result = await regression("random-forest-regression", {
        X: xValues,
        y: yData,
        X_new: formData.X_new ? JSON.parse(formData.X_new) : null,
        feature_scaling_X: formData.feature_scaling_X === "true",
        feature_scaling_y: formData.feature_scaling_y === "true",
        test_size: parseFloat(formData.test_size),
        random_state: parseInt(formData.random_state, 10),
        n_estimators: parseInt(formData.n_estimators, 10),
        criterion: formData.criterion,
        max_depth: formData.max_depth !== null ? parseInt(formData.max_depth, 10) : null,
        min_samples_split: parseInt(formData.min_samples_split, 10),
        min_samples_leaf: parseInt(formData.min_samples_leaf, 10),
        min_weight_fraction_leaf: parseFloat(formData.min_weight_fraction_leaf),
        max_features: formData.max_features == 1.0 ? 1.0: formData.max_features,
        max_leaf_nodes: formData.max_leaf_nodes !== null ? parseInt(formData.max_leaf_nodes, 10) : null,
        bootstrap: formData.bootstrap === "true",
        oob_score: formData.oob_score === "true",
        n_jobs: formData.n_jobs !== null ? parseInt(formData.n_jobs, 10) : null,
        random_state_rf: formData.random_state_rf !== null ? parseInt(formData.random_state_rf, 10) : null,
        verbose: parseInt(formData.verbose, 10),
        warm_start: formData.warm_start === "true",
        ccp_alpha: parseFloat(formData.ccp_alpha),
        max_samples: formData.max_samples !== null ? parseInt(formData.max_samples, 10) : null,
        monotonic_cst: formData.monotonic_cst,
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
        description: "Jumlah pohon dalam hutan. Default: 100.",
    },
    {
        id: "criterion",
        name: "criterion",
        type: "select",
        value: formData.criterion,
        onChange: handleChange,
        label: "Criterion",
        description: "Fungsi yang mengukur kualitas split. Default: 'squared_error'.",
        options: [
            { value: "squared_error", label: "Squared Error" },
            { value: "friedman_mse", label: "Friedman MSE" },
            { value: "absolute_error", label: "Absolute Error" },
            { value: "poisson", label: "Poisson" },
        ],
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
        id: "max_features",
        name: "max_features",
        type: "select",
        value: formData.max_features || "1.0",
        onChange: handleChange,
        label: "Max Features",
        description:
          "Jumlah fitur yang dipertimbangkan untuk split. Default: 1.0 (semua fitur).",
        options: [
          { value: "sqrt", label: "Square Root" },
          { value: "log2", label: "Log2" },
          { value: 1.0, label: "All Features (Default)" },
          { value: "", label: "Custom (Enter a Number or Fraction)" },
        ],
      },
    {
        id: "max_leaf_nodes",
        name: "max_leaf_nodes",
        type: "number",
        placeholder: "None",
        value: formData.max_leaf_nodes,
        onChange: handleChange,
        label: "Max Leaf Nodes",
        description: "Jumlah maksimum leaf nodes. Default: None.",
    },
    {
        id: "bootstrap",
        name: "bootstrap",
        type: "select",
        value: formData.bootstrap,
        onChange: handleChange,
        label: "Bootstrap",
        description: "Apakah bootstrap samples digunakan? Default: true.",
        options: [
            { value: "true", label: "True" },
            { value: "false", label: "False" },
        ],
    },
    {
        id: "oob_score",
        name: "oob_score",
        type: "select",
        value: formData.oob_score,
        onChange: handleChange,
        label: "OOB Score",
        description: "Apakah menggunakan out-of-bag samples untuk estimasi score? Default: false.",
        options: [
            { value: "true", label: "True" },
            { value: "false", label: "False" },
        ],
    },
    {
        id: "n_jobs",
        name: "n_jobs",
        type: "number",
        placeholder: "None",
        value: formData.n_jobs,
        onChange: handleChange,
        label: "N Jobs",
        description: "Jumlah pekerjaan paralel untuk dijalankan. Default: None.",
    },
    {
        id: "random_state_rf",
        name: "random_state_rf",
        type: "number",
        placeholder: "None",
        value: formData.random_state_rf,
        onChange: handleChange,
        label: "Random State RF",
        description: "Seed untuk random number generator pada Random Forest. Default: None.",
    },
    {
        id: "verbose",
        name: "verbose",
        type: "number",
        placeholder: "0",
        value: formData.verbose,
        onChange: handleChange,
        label: "Verbose",
        description: "Level verbose output. Default: 0.",
    },
    {
        id: "warm_start",
        name: "warm_start",
        type: "select",
        value: formData.warm_start,
        onChange: handleChange,
        label: "Warm Start",
        description: "Apakah menggunakan warm start untuk melanjutkan fitting sebelumnya? Default: false.",
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
        description: "Complexity parameter untuk minimal cost-complexity pruning. Default: 0.0.",
    },
    {
        id: "max_samples",
        name: "max_samples",
        type: "number",
        placeholder: "None",
        value: formData.max_samples,
        onChange: handleChange,
        label: "Max Samples",
        description: "Jumlah sampel maksimum untuk bootstrap. Default: None.",
    },
    {
        id: "monotonic_cst",
        name: "monotonic_cst",
        type: "textarea",
        placeholder: "None",
        value: formData.monotonic_cst,
        onChange: handleChange,
        label: "Monotonic Constraints",
        description: "Monotonic constraints for the tree. Format: 'c1 > c2'. Default: None.",
    },
];

  return (
    <Base pretitle="Regression" title="Random Forest Regression">
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
