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
    feature_scaling_X: "false",
    feature_scaling_y: "false",
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
    console.log(formData);
    setResponse(null);
    e.preventDefault();
    const result = await regression("poly-regression", {
      X: xValues,
      y: yData,
      X_new: formData.X_new ? JSON.parse(formData.X_new) : null,
      copy_X: formData.copy_X ==="true",
      degree: formData.degree ? parseInt(formData.degree, 10) : 2,
      include_bias: formData.include_bias === "true",
      interaction_only: formData.interaction_only === "true",
      order: formData.order || "C",
      n_jobs: formData.n_jobs ? parseInt(formData.n_jobs, 10) : null,
      positive: formData.positive === "true",
      fit_intercept: formData.fit_intercept === "true",
      feature_scaling_X: formData.feature_scaling_X === "true",
      feature_scaling_y: formData.feature_scaling_y === "true",
      test_size: formData.test_size ? parseFloat(formData.test_size) : 0.2,
      random_state: formData.random_state
        ? parseInt(formData.random_state, 10)
        : 42,
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
      id: "degree",
      name: "degree",
      type: "number",
      placeholder: "2",
      value: formData.degree,
      onChange: handleChange,
      label: "Degree",
      description: "Derajat dari polinomial. Default: 2.",
    },
    {
      id: "include_bias",
      name: "include_bias",
      type: "select",
      value: formData.include_bias,
      onChange: handleChange,
      label: "Include Bias",
      description: "Apakah akan menyertakan bias. Default: true.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
    },
    {
      id: "interaction_only",
      name: "interaction_only",
      type: "select",
      value: formData.interaction_only,
      onChange: handleChange,
      label: "Interaction Only",
      description: "Apakah hanya menyertakan fitur interaksi. Default: false.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
    },
    {
      id: "order",
      name: "order",
      type: "select",
      value: formData.order,
      onChange: handleChange,
      label: "Order",
      description: "Urutan dalam penyimpanan data polinomial. Default: 'C'.",
      options: [
        { value: "C", label: "C" },
        { value: "F", label: "F" },
      ],
    },
    {
      id: "copy_X",
      name: "copy_X",
      type: "select",
      value: formData.copy_X,
      onChange: handleChange,
      label: "Copy X",
      description: "Apakah akan menyalin X. Default: true.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
    },
    {
      id: "n_jobs",
      name: "n_jobs",
      type: "number",
      placeholder: "null",
      value: formData.n_jobs,
      onChange: handleChange,
      label: "Number of Jobs",
      description: "Jumlah pekerjaan paralel yang digunakan. Default: null.",
    },
    {
      id: "positive",
      name: "positive",
      type: "select",
      value: formData.positive,
      onChange: handleChange,
      label: "Positive",
      description: "Apakah koefisien harus positif. Default: false.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
    },
    {
      id: "fit_intercept",
      name: "fit_intercept",
      type: "select",
      value: formData.fit_intercept,
      onChange: handleChange,
      label: "Fit Intercept",
      description: "Apakah akan menghitung intercept. Default: true.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ],
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
