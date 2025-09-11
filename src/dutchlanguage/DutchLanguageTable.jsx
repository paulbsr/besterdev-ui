import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrFormEdit } from "react-icons/gr"; // ✅ import the icon

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1"
    : "http://localhost:8000/api/v1";

export default function DutchLanguageTable() {
  const [records, setRecords] = useState([]);
  const [newRow, setNewRow] = useState({ afrikaans: "", dutch: "", sample: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dutchlanguage`);
      const sorted = res.data.sort((a, b) =>
        a.afrikaans.localeCompare(b.afrikaans)
      );
      setRecords(sorted);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleEditChange = (id, field, value) => {
    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, [field]: value } : rec
      )
    );
  };

  const saveEdit = async (record) => {
    try {
      await axios.put(`${API_BASE}/dutchlanguage/update/${record.id}`, record);
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving edit:", err);
    }
  };

  const addRow = async () => {
    if (!newRow.afrikaans || !newRow.dutch || !newRow.sample) return;
    try {
      await axios.post(`${API_BASE}/dutchlanguage/create`, newRow);
      setNewRow({ afrikaans: "", dutch: "", sample: "" });
      fetchData();
    } catch (err) {
      console.error("Error adding row:", err);
    }
  };

  const cellStyle = {
    border: "1px solid #ccc",
    padding: "4px",
    fontSize: "14px",
    fontFamily: "Verdana, sans-serif",
    whiteSpace: "nowrap",
    borderRadius: "4px",
  };

  const inputStyle = {
    fontSize: "14px",
    fontFamily: "Verdana, sans-serif",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: "0.75px solid #ccc",
    padding: "2px 4px",
  };

  return (
    <div style={{ fontFamily: "Verdana, sans-serif", fontSize: "14px" }}>
      <table
        style={{
          borderCollapse: "collapse",
          border: "1px solid #ccc",
          tableLayout: "auto",
          borderRadius: "4px",
        }}
      >
        <tbody>
          {records.map((rec) => (
            <tr key={rec.id}>
              <td
                style={{ ...cellStyle, color: "#007749", cursor: "pointer" }}
                title={rec.sample}
              >
                {editingId === rec.id ? (
                  <input
                    value={rec.afrikaans}
                    onChange={(e) =>
                      handleEditChange(rec.id, "afrikaans", e.target.value)
                    }
                    style={inputStyle}
                  />
                ) : (
                  rec.afrikaans
                )}
              </td>
              <td
                style={{ ...cellStyle, color: "#FF4F00", cursor: "pointer" }}
                title={rec.sample}
              >
                {editingId === rec.id ? (
                  <input
                    value={rec.dutch}
                    onChange={(e) =>
                      handleEditChange(rec.id, "dutch", e.target.value)
                    }
                    style={inputStyle}
                  />
                ) : (
                  rec.dutch
                )}
              </td>
              <td style={{ ...cellStyle, cursor: "pointer" }}>
                {editingId === rec.id ? (
                  <input
                    value={rec.sample}
                    onChange={(e) =>
                      handleEditChange(rec.id, "sample", e.target.value)
                    }
                    style={inputStyle}
                  />
                ) : (
                  <span>{rec.sample}</span>
                )}
              </td>
              <td style={cellStyle}>
                {editingId === rec.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(rec)}
                      style={{ fontSize: "14px" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      style={{ fontSize: "14px" }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <GrFormEdit
                    size={18}
                    color="#333333"
                    style={{ cursor: "pointer" }}
                    onClick={() => setEditingId(rec.id)}
                  />
                )}
              </td>
            </tr>
          ))}
          {/* Row for Adding New Record */}
          <tr>
            <td style={cellStyle}>
              <input
                value={newRow.afrikaans}
                onChange={(e) =>
                  setNewRow({ ...newRow, afrikaans: e.target.value })
                }
                style={inputStyle}
                placeholder="Afrikaans"
              />
            </td>
            <td style={cellStyle}>
              <input
                value={newRow.dutch}
                onChange={(e) =>
                  setNewRow({ ...newRow, dutch: e.target.value })
                }
                style={inputStyle}
                placeholder="Dutch"
              />
            </td>
            <td style={cellStyle}>
              <input
                value={newRow.sample}
                onChange={(e) =>
                  setNewRow({ ...newRow, sample: e.target.value })
                }
                style={inputStyle}
                placeholder="Sample sentence"
              />
            </td>
            <td style={cellStyle}>
              <button onClick={addRow} style={{ fontSize: "14px" }}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>&nbsp;&nbsp;</div>
    </div>
  );
}
