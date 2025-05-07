import React, { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import "./index.css";
import { createColumnsDefinition, deleteColumnsDefinition, listColumnsDefinition, updateColumnsDefinition } from "services/ColumnsDefinitionServiceClient";
import ParserModal from "./Modal/ParserModal";


const ParserScreen = () => {
  const [parsers, setParsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParser, setEditingParser] = useState(null);
  const [formData, setFormData] = useState({ source: "", tableName: "", columnsList: [] });
  const [parserToDelete, setParserToDelete] = useState(null);

  useEffect(() => {
    const fetchParsers = async () => {
      try {
        const response = await listColumnsDefinition();
        console.log("response: ", response);
        const fetchedParsers = response.columnsDefinitionsList;
        setParsers(fetchedParsers.sort((a, b) => a.id - b.id));
      } catch (err) {
        console.error("Failed to fetch parsers:", err);
      }
    };

    fetchParsers();
  }, []);

  // Filter parsers based on the search query
  const filteredParsers = useMemo(() => {
    if (!searchQuery) return parsers;
    return parsers.filter(
      (parser) =>
        parser?.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parser?.tableName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [parsers, searchQuery]);

  // Define columns for react-table
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Source",
        accessor: "source",
      },
      {
        Header: "Table Name",
        accessor: "tableName",
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
            <button className="delete-button" onClick={() => setParserToDelete(row.original)}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Create table instance
  const tableInstance = useTable({ columns, data: filteredParsers });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleEdit = (parser) => {
    setEditingParser(parser);
    setFormData({ id: parser.id, source: parser.source, tableName: parser.tableName, columnsList: parser.columnsList });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingParser(null);
    setFormData({ source: "", tableName: "", columnsList: [] });
  };

  // Updated submit handler - receives the latest finalFormData from ParserModal
  const handleFormSubmit = async (updatedFormData) => {
    try {
      console.log('Updated formData to submit:', updatedFormData);
      
      if (editingParser) {
        // Use the updatedFormData passed from ParserModal
        const response = await updateColumnsDefinition({
          id: updatedFormData.id,
          source: updatedFormData.source,
          tableName: updatedFormData.tableName,
          columnsList: updatedFormData.columnsList,
        });
        
        console.log('API response:', response);
        
        // Update the parsers state with the updated data
        setParsers((prev) =>
          prev.map((parser) => (parser.id === updatedFormData.id ? updatedFormData : parser))
        );
      } else {
        const response = await createColumnsDefinition(updatedFormData);
        console.log('response: ',response);
        setParsers((prev) => [...prev, response.columnsDefinition]);
      }
      
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddUser = () => {
    setEditingParser(null);
    setFormData({ source: "", tableName: "", columnsList: [] });
    setIsModalOpen(true);
  };

  // Handler for confirming deletion via API call
  const handleDeleteConfirmed = async () => {
    if (parserToDelete) {
      try {
        await deleteColumnsDefinition(parserToDelete.source, parserToDelete.tableName);
        setParsers((prev) =>
          prev.filter((parser) => parser.id !== parserToDelete.id)
        );
        setParserToDelete(null);
      } catch (err) {
        console.error("Error deleting parser:", err);
      }
    }
  };

  const handleCancelDelete = () => {
    setParserToDelete(null);
  };

  return (
    <div className="container">
      <h1>Parser Management</h1>

      <div className="header-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search parsers..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button className="add-user-button" onClick={handleAddUser}>
          Add Parser
        </button>
      </div>

      <table {...getTableProps()} className="user-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
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
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center", padding: "20px" }}
              >
                No parsers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      <ParserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        formData={formData}
        handleChange={handleChange}
        editingParser={editingParser}
      />

      {/* Delete Confirmation Modal would be here */}
      {parserToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete
            </p>
            <p>
              Source: <strong>{parserToDelete.source}</strong>
            </p>
            <p>
              Table nameL <strong>{parserToDelete.source}</strong>
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

export default ParserScreen;