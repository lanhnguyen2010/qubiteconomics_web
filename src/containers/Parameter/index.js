import React, { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import "./index.css";
import {
  getListParameter,
  addParameter,
  updateParameter,
  deleteParameter,
} from "services/ParameterServiceClient";

const ParameterScreen = () => {
  const [parameters, setParameters] = useState([]); // Start with an empty list
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParameter, setEditingParameter] = useState(null);
  const [formData, setFormData] = useState({ key: "", value: "" });
  const [parameterToDelete, setParameterToDelete] = useState(null);
  const [jsonError, setJsonError] = useState(null);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await getListParameter();
        console.log("response: ", response);
        const fetchedParameters = response.parametersList.map((parameter) => ({
          key: parameter.key,
          value: parameter.value,
        }));
        setParameters(fetchedParameters);
      } catch (err) {
        console.error("Failed to fetch parameters:", err);
      }
    };

    fetchParameters();
  }, []);

  // Filter parameters based on the search query
  const filteredParameters = useMemo(() => {
    if (!searchQuery) return parameters;
    return parameters.filter((parameter) =>
      parameter.key.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [parameters, searchQuery]);

  // Define columns for react-table
  const columns = useMemo(
    () => [
      {
        Header: "Key",
        accessor: "key",
        width: 150,
      },
      {
        Header: "Value",
        accessor: "value",
        width: 400,
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="action-buttons">
            <button
              className="edit-button"
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => setParameterToDelete(row.original)}
            >
              Delete
            </button>
          </div>
        ),
        width: 150,
      },
    ],
    []
  );

  // Create table instance
  const tableInstance = useTable({ columns, data: filteredParameters });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // Handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddParameter = () => {
    setEditingParameter(null);
    setFormData({ key: "", value: "" });
    setJsonError(null);
    setIsModalOpen(true);
  };

  const handleEdit = (parameter) => {
    setEditingParameter(parameter);

    // Try to format the value as JSON if it's valid JSON
    let formattedValue = parameter.value;
    try {
      // Check if the value is JSON
      const parsedValue = JSON.parse(parameter.value);
      formattedValue = JSON.stringify(parsedValue, null, 2);
    } catch (e) {
      // If parsing fails, use the original value
      formattedValue = parameter.value;
    }

    setFormData({ key: parameter.key, value: formattedValue });
    setJsonError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingParameter(null);
    setFormData({ key: "", value: "" });
    setJsonError(null);
  };

  // Validate JSON in the textarea
  const validateJson = (value) => {
    if (!value.trim()) {
      setJsonError(null);
      return true;
    }

    try {
      JSON.parse(value);
      setJsonError(null);
      return true;
    } catch (e) {
      setJsonError(`Invalid JSON: ${e.message}`);
      return false;
    }
  };

  // Submit handler for add/edit form that calls the API
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate JSON first
    if (!validateJson(formData.value)) {
      return;
    }

    try {
      if (editingParameter) {
        // Update existing parameter via API
        const response = await updateParameter(
          editingParameter.key,
          formData.value
        );
        const updatedParameter = {
          key: response.parameter.key,
          value: response.parameter.value,
        };
        setParameters((prev) =>
          prev.map((parameter) =>
            parameter.key === updatedParameter.key
              ? updatedParameter
              : parameter
          )
        );
      } else {
        // Add new parameter via API
        const response = await addParameter(formData.key, formData.value);
        const newParameter = {
          key: response.parameter.key,
          value: response.parameter.value,
        };
        setParameters((prev) => [...prev, newParameter]);
      }
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "value") {
      validateJson(value);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format JSON button handler
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(formData.value);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormData((prev) => ({ ...prev, value: formatted }));
      setJsonError(null);
    } catch (e) {
      setJsonError(`Cannot format: Invalid JSON: ${e.message}`);
    }
  };

  // Handler for confirming deletion via API call
  const handleDeleteConfirmed = async () => {
    if (parameterToDelete) {
      try {
        await deleteParameter(parameterToDelete.key);
        setParameters((prev) =>
          prev.filter((parameter) => parameter.key !== parameterToDelete.key)
        );
        setParameterToDelete(null);
      } catch (err) {
        console.error("Error deleting parameter:", err);
      }
    }
  };

  const handleCancelDelete = () => {
    setParameterToDelete(null);
  };

  return (
    <div className="container">
      <h1>Parameter Management</h1>

      <div className="header-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search parameters..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button className="add-parameter-button" onClick={handleAddParameter}>
          Add Parameter
        </button>
      </div>

      <table
        {...getTableProps()}
        className="parameter-table"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <colgroup>
          {columns.map((column) => (
            <col
              key={column.id || column.accessor}
              style={{ width: column.width || "auto" }}
            />
          ))}
        </colgroup>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ width: column.width || "auto" }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{ width: cell.column.width || "auto" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <h2>{editingParameter ? "Edit Parameter" : "Add Parameter"}</h2>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="key">Key:</label>
                <input
                  type="text"
                  id="key"
                  name="key"
                  placeholder="Key"
                  value={formData.key}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <div className="textarea-header">
                  <label htmlFor="value">Value :</label>
                  <button
                    type="button"
                    className="format-json-button"
                    onClick={handleFormatJson}
                  >
                    Beautify
                  </button>
                </div>
                <textarea
                  id="value"
                  name="value"
                  placeholder="Enter JSON value..."
                  value={formData.value}
                  onChange={handleChange}
                  rows={10}
                  className={jsonError ? "json-error" : ""}
                  required
                />
                {jsonError && <div className="error-message">{jsonError}</div>}
              </div>

              <button type="submit" disabled={!!jsonError}>
                {editingParameter ? "Update Parameter" : "Add Parameter"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {parameterToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{parameterToDelete.key}</strong>?
            </p>
            <div className="confirm-buttons">
              <button className="delete-button" onClick={handleDeleteConfirmed}>
                Yes, Delete
              </button>
              <button className="cancel-button" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParameterScreen;
