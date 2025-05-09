import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import EditableCell from "./EditableCell";
import SingleSelectDropdown from "components/SingleSelectDropdown"; // Import the dropdown component
import "./index.css";

const ParserModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleChange,
  editingParser,
}) => {
  if (!isOpen) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState(formData.columnsList || []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isJsonMode, setIsJsonMode] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [jsonText, setJsonText] = useState(
    JSON.stringify(formData || {}, null, 2)
  );

  // Data type options for the dropdown
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const datatypeOptions = useMemo(() => [
    { value: "string", label: "String" },
    { value: "integer", label: "Integer" },
    { value: "float", label: "Float" },
    { value: "timestamp", label: "Timestamp" },
    { value: "code", label: "Code" },
  ], []);

  const updateData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const addNewRow = () => {
    const newData = [
      ...data,
      { columnName: "", datatype: "", position: data.length + 1},
    ];
    setData(newData);

    // Update JSON text when adding a row via button
    if (isJsonMode) {
      try {
        const currentJson = JSON.parse(jsonText);
        currentJson.columnsList = newData;
        setJsonText(JSON.stringify(currentJson, null, 2));
      } catch (error) {
        // If JSON is invalid, just update with a new structure
        const fullObject = {
          source: formData.source,
          tableName: formData.tableName,
          columnsList: newData,
          id: formData.id,
        };
        setJsonText(JSON.stringify(fullObject, null, 2));
      }
    }
  };

  // Function to beautify JSON
  const beautifyJson = () => {
    try {
      const parsedJson = JSON.parse(jsonText);
      const beautified = JSON.stringify(parsedJson, null, 2);
      setJsonText(beautified);
    } catch (error) {
      alert("Cannot beautify: Invalid JSON format");
    }
  };

  // Custom cell renderer for datatype column that uses the dropdown
  const DataTypeCell = ({ row: { index }, column: { id }, value }) => {
    // Find the option that matches the current value
    const selectedOption = value 
      ? datatypeOptions.find(option => option.value === value) || { value: value, label: value }
      : null;

    return (
      <SingleSelectDropdown
        options={datatypeOptions}
        placeholder="Select type..."
        onChange={(selectedOption) => {
          // When an option is selected, update the data with its value
          updateData(index, id, selectedOption ? selectedOption.value : "");
        }}
        value={selectedOption} // Initialize with the current value
      />
    );
  };

  // Function to delete a row
  const deleteRow = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    
    // Re-number the positions of remaining rows
    const reIndexedData = updatedData.map((row, index) => ({
      ...row,
      position: index + 1
    }));
    
    setData(reIndexedData);
    
    // Update JSON text if in JSON mode
    if (isJsonMode) {
      try {
        const currentJson = JSON.parse(jsonText);
        currentJson.columnsList = reIndexedData;
        setJsonText(JSON.stringify(currentJson, null, 2));
      } catch (error) {
        // If JSON is invalid, just create a new structure
        const fullObject = {
          source: formData.source,
          tableName: formData.tableName,
          columnsList: reIndexedData,
          id: formData.id,
        };
        setJsonText(JSON.stringify(fullObject, null, 2));
      }
    }
  };

  // Custom cell for displaying row number
  const RowNumberCell = ({ row: { index } }) => {
    return <div className="row-number-cell">{index + 1}</div>;
  };

  // Custom cell for actions column
  const ActionsCell = ({ row: { index } }) => {
    return (
      <div className="actions-cell">
        <button 
          className="delete-row-button"
          onClick={(e) => {
            e.stopPropagation();
            deleteRow(index);
          }}
        >
          Delete
        </button>
      </div>
    );
  };
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const columns = useMemo(
    () => [
      {
        Header: "No.",
        id: "rowNumber",
        Cell: RowNumberCell,
        width: 60,  // Fixed width for row numbers
      },
      {
        Header: "Column Name",
        accessor: "columnName",
        Cell: (props) => <EditableCell {...props} updateData={updateData} />,
        width: 250,  // More space for column names
      },
      {
        Header: "Datatype",
        accessor: "datatype",
        Cell: (props) => <DataTypeCell {...props} />, // Pass all props to our custom cell
        width: 150,  // Medium space for data types
      },
      {
        Header: "Position",
        accessor: "position",
        Cell: (props) => <EditableCell {...props} updateData={updateData} />,
        width: 100,  // Smaller space for position numbers
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ActionsCell,
        width: 100,  // Fixed width for action buttons
      },
    ],
    [datatypeOptions]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // Update JSON text when toggling between table/JSON view
  const handleToggleMode = () => {
    if (!isJsonMode) {
      // Switching to JSON mode - update the JSON text with full object structure
      const fullObject = {
        source: formData.source,
        tableName: formData.tableName,
        columnsList: data,
        id: formData.id,
      };
      setJsonText(JSON.stringify(fullObject, null, 2));
    } else {
      // If switching back to table, ensure data is updated from JSON if valid
      try {
        const parsedJson = JSON.parse(jsonText);
        if (parsedJson.columnsList) {
          setData(parsedJson.columnsList);
        }
      } catch (error) {
        // If JSON is invalid, don't switch views and alert the user
        alert("Invalid JSON format. Please correct before switching views.");
        return;
      }
    }
    setIsJsonMode(!isJsonMode);
  };

  // Store the raw JSON text to allow editing even when invalid
  const handleJsonChange = (e) => {
    // Always update the raw text
    setJsonText(e.target.value);

    try {
      const parsedJson = JSON.parse(e.target.value);
      // Extract columnsList from the parsed JSON if it exists
      if (parsedJson.columnsList) {
        setData(parsedJson.columnsList);
      } else if (Array.isArray(parsedJson)) {
        // If it's a direct array, treat it as columnsList
        setData(parsedJson);
      }

      // Update the form data fields if they exist in JSON
      if (parsedJson.source) {
        handleChange({ target: { name: "source", value: parsedJson.source } });
      }
      if (parsedJson.tableName) {
        handleChange({
          target: { name: "tableName", value: parsedJson.tableName },
        });
      }
    } catch (error) {
      // Just update the text but not the data when JSON is invalid
      console.log("Invalid JSON format");
    }
  };

  // Prepare the final data before submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // If in JSON mode, attempt to parse the current JSON text again
    let finalData = data;
    let finalFormData = { ...formData, columnsList: finalData };

    if (isJsonMode) {
      try {
        const parsedJson = JSON.parse(jsonText);

        // Check if we're working with a complete object or just the columns list
        if (parsedJson.columnsList) {
          finalData = parsedJson.columnsList;
          // Update the full form data from JSON
          finalFormData = {
            ...formData,
            source: parsedJson.source || formData.source,
            tableName: parsedJson.tableName || formData.tableName,
            columnsList: finalData,
            id: parsedJson.id || formData.id,
          };
        } else if (Array.isArray(parsedJson)) {
          finalData = parsedJson;
          finalFormData = { ...formData, columnsList: finalData };
        } else {
          alert(
            "Invalid JSON format. JSON must contain a columnsList array or be an array."
          );
          return;
        }
      } catch (error) {
        alert("Invalid JSON format. Please correct before saving.");
        return;
      }
    }

    // Pass the updated finalFormData to the parent component
    onSubmit(finalFormData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2>{editingParser ? "Edit Parser" : "Add Parser"}</h2>

        {/* History Button and Toggle */}
        <div className="top-controls">
            {editingParser ? (<button className="history-button">History</button>) : <div></div>}
          <div className="toggle-wrapper">
            <label className="switch">
              <input
                type="checkbox"
                checked={isJsonMode}
                onChange={handleToggleMode}
              />
              <span className="slider"></span>
            </label>
            <span className="toggle-label">JSON View</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {isJsonMode ? (
            <div className="json-container">
              <div className="json-actions">
                <button
                  type="button"
                  className="beautify-button"
                  onClick={beautifyJson}
                >
                  Beautify
                </button>
              </div>
              <textarea
                className="json-editor"
                value={jsonText}
                onChange={handleJsonChange}
                rows={20}
              />
            </div>
          ) : (
            <div className="table-container">
              <div className="form-row">
                <label>Source</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                  disabled={editingParser}
                />
              </div>
              <div className="form-row">
                <label>Table Name</label>
                <input
                  type="text"
                  name="tableName"
                  value={formData.tableName}
                  onChange={handleChange}
                  required
                  disabled={editingParser}
                />
              </div>
              <div className="table-actions">
                <button
                  type="button"
                  className="add-row-button"
                  onClick={addNewRow}
                >
                  Add Row
                </button>
              </div>
              <div className="table-scroll-container">
                <table {...getTableProps()} className="modal-table" style={{ tableLayout: 'fixed', width: '100%' }}>
                  <colgroup>
                    {columns.map((column) => (
                      <col key={column.id || column.accessor} style={{ width: column.width || 'auto' }} />
                    ))}
                  </colgroup>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()} style={{ width: column.width || 'auto' }}>
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
                            <td {...cell.getCellProps()} style={{ width: cell.column.width || 'auto' }}>
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="footer">
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParserModal;