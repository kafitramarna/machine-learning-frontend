import { useState } from "react";
import Papa from "papaparse";

export function useFileHandling() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [dropdownValues, setDropdownValues] = useState([]);
  const [xValues, setXValues] = useState([]);
  const [yValue, setYValue] = useState(null);
  const [yData, setYData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setHeaders([]);
      setData([]);
      setDropdownValues([]);
      setXValues([]);
      setYValue(null);
      setYData([]);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setHeaders(results.meta.fields);
          setData(results.data);
          setDropdownValues(new Array(results.meta.fields.length).fill("-"));
        },
        skipEmptyLines: true,
      });
    }
  };

  const handleDropdownChange = (index, value) => {
    const newValues = [...dropdownValues];
    newValues[index] = value;

    const yCount = newValues.filter((v) => v === "Y").length;

    if (value === "Y" && yCount > 1) return;
    if (value === "Y" && yValue !== null) return;
    if (value === "Y") setYValue(headers[index]);
    if (value === "Y" && yValue === null) {
      const yValues = data.map((row) => parseFloat(row[headers[index]]));
      setYData(yValues);
    }
    if (value === "-") {
      if (headers[index] === yValue) {
        setYValue(null);
        setYData([]);
      }
    }

    const updatedDropdownValues = newValues.map((val, idx) =>
      val === "Y" && idx !== index ? "-" : val
    );
    setDropdownValues(updatedDropdownValues);

    const xHeaders = headers.filter(
      (_, idx) => updatedDropdownValues[idx] === "X"
    );
    const newXValues = data.map((row) =>
      xHeaders.map((header) => {
        const value = row[header];
        if (value === undefined || value === null || value.trim() === "")
          return null;
        if (!isNaN(value))
          return value.includes(".") ? parseFloat(value) : parseInt(value);
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        return value;
      })
    );
    setXValues(newXValues);
  };

  return {
    data,
    headers,
    dropdownValues,
    xValues,
    yData,
    handleFileChange,
    handleDropdownChange,
  };
}
