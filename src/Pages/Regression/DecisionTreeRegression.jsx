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
export default function DecisionTreeRegression() {
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
    criterion: "squared_error",
    splitter: "best",
    max_depth: null,
    min_samples_split: 2,
    min_samples_leaf: 1,
    min_weight_fraction_leaf: 0.0,
    max_features: null,
    random_state_dec: null,
    max_leaf_nodes: null,
    min_impurity_decrease: 0.0,
    ccp_alpha: 0.0,
    monotonic_cst: null,
    feature_scaling_X: "false",
    feature_scaling_y: "false",
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
    const result = await regression("decision-tree-regression", {
      X: xValues,
      y: yData,
      X_new: formData.X_new ? JSON.parse(formData.X_new) : null,
      criterion: formData.criterion,
      splitter: formData.splitter,
      max_depth:
        formData.max_depth !== null ? parseInt(formData.max_depth, 10) : null,
      min_samples_split: parseInt(formData.min_samples_split, 10),
      min_samples_leaf: parseInt(formData.min_samples_leaf, 10),
      min_weight_fraction_leaf: parseFloat(formData.min_weight_fraction_leaf),
      max_features: formData.max_features,
      random_state_dec:
        formData.random_state_dec !== null
          ? parseInt(formData.random_state_dec, 10)
          : null,
      max_leaf_nodes:
        formData.max_leaf_nodes !== null
          ? parseInt(formData.max_leaf_nodes, 10)
          : null,
      min_impurity_decrease: parseFloat(formData.min_impurity_decrease),
      ccp_alpha: parseFloat(formData.ccp_alpha),
      monotonic_cst: formData.monotonic_cst,
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
      id: "criterion",
      name: "criterion",
      type: "select",
      value: formData.criterion,
      onChange: handleChange,
      label: "Criterion",
      description:
        "Fungsi yang mengukur kualitas split. Default: 'squared_error'.",
      options: [
        { value: "squared_error", label: "Squared Error" },
        { value: "friedman_mse", label: "Friedman MSE" },
        { value: "absolute_error", label: "Absolute Error" },
        { value: "poisson", label: "Poisson" },
      ],
    },
    {
      id: "splitter",
      name: "splitter",
      type: "select",
      value: formData.splitter,
      onChange: handleChange,
      label: "Splitter",
      description:
        "Strategi yang digunakan untuk memilih split di setiap node. Default: 'best'.",
      options: [
        { value: "best", label: "Best" },
        { value: "random", label: "Random" },
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
      description:
        "Jumlah minimum sampel yang dibutuhkan untuk split internal node. Default: 2.",
    },
    {
      id: "min_samples_leaf",
      name: "min_samples_leaf",
      type: "number",
      placeholder: "1",
      value: formData.min_samples_leaf,
      onChange: handleChange,
      label: "Min Samples Leaf",
      description:
        "Jumlah minimum sampel yang dibutuhkan untuk menjadi leaf node. Default: 1.",
    },
    {
      id: "min_weight_fraction_leaf",
      name: "min_weight_fraction_leaf",
      type: "number",
      placeholder: "0.0",
      value: formData.min_weight_fraction_leaf,
      onChange: handleChange,
      label: "Min Weight Fraction Leaf",
      description:
        "Minimum fraction of the sum total of weights required to be at a leaf node. Default: 0.0.",
    },
    {
      id: "max_features",
      name: "max_features",
      type: "text",
      placeholder: "None",
      value: formData.max_features,
      onChange: handleChange,
      label: "Max Features",
      description:
        "Jumlah maksimum fitur yang dipertimbangkan untuk split. Default: None.",
    },
    {
      id: "random_state_dec",
      name: "random_state_dec",
      type: "number",
      placeholder: "None",
      value: formData.random_state_dec,
      onChange: handleChange,
      label: "Random State (Decision Tree)",
      description:
        "Seed untuk random number generator dari decision tree. Default: None.",
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
      id: "min_impurity_decrease",
      name: "min_impurity_decrease",
      type: "number",
      placeholder: "0.0",
      value: formData.min_impurity_decrease,
      onChange: handleChange,
      label: "Min Impurity Decrease",
      description:
        "Pengurangan minimum dalam impurity yang diperlukan untuk split. Default: 0.0.",
    },
    {
      id: "ccp_alpha",
      name: "ccp_alpha",
      type: "number",
      placeholder: "0.0",
      value: formData.ccp_alpha,
      onChange: handleChange,
      label: "CCP Alpha",
      description: "Parameter pruning cost complexity. Default: 0.0.",
    },
    {
      id: "monotonic_cst",
      name: "monotonic_cst",
      type: "text",
      placeholder: "None",
      value: formData.monotonic_cst,
      onChange: handleChange,
      label: "Monotonic Constraint",
      description: "Monotonic constraint pada target variabel. Default: None.",
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

  return (
    <Base pretitle="Regression" title="Decision Tree Regression">
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
