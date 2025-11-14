import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./DutchLanguageHomePage.css";
import AlertContext from "../Generic/Alerts/AlertContext";
import { FaPlus } from "react-icons/fa";

const API_BASE =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/dutchlanguageindex";

// ✅ Removed “Dit” and made avatars larger
const pronouns = [
  { label: "Ek", key: "ek", avatar: "🧍‍♂️" },
  { label: "Jy", key: "jy", avatar: "🫵" },
  { label: "Ons", key: "ons", avatar: "👫" },
  { label: "Julle", key: "julle", avatar: "👥" },
  { label: "Hulle", key: "hulle", avatar: "👨‍👩‍👧‍👦" },
  { label: "Hy", key: "hy", avatar: "👨" },
  { label: "Sy", key: "sy", avatar: "👩" },
];

export default function DutchLanguage_Index() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState({ id: null, field: null, value: "" });
  const alertCtx = useContext(AlertContext);

  useEffect(() => {
    axios
      .get(API_BASE)
      .then((response) => setRows(response.data))
      .catch(() => alertCtx.error("Failed to load Dutch language data."));
  }, []);

  const handleCellClick = (id, field, currentValue) => {
    setEditing({ id, field, value: currentValue || "" });
  };

  const handleChange = (e) => {
    setEditing((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleSave = async (id, field) => {
    const updatedValue = editing.value.trim();
    if (updatedValue === "") {
      setEditing({ id: null, field: null, value: "" });
      return;
    }

    const targetRow = rows.find((r) => r.id === id);
    const updatedRow = { ...targetRow, [field]: updatedValue };

    try {
      await axios.put(`${API_BASE}/${id}`, updatedRow);
      setRows((prev) => prev.map((r) => (r.id === id ? updatedRow : r)));
      alertCtx.success("Value updated successfully.");
    } catch {
      alertCtx.error("Update failed.");
    }

    setEditing({ id: null, field: null, value: "" });
  };

  const handleKeyPress = (e, id, field) => {
    if (e.key === "Enter") e.target.blur();
  };

  // ✅ Add new empty row (removed "dit" field)
  const handleAddRow = async () => {
    const newRow = {
      woord: "",
      ek: "",
      jy: "",
      ons: "",
      julle: "",
      hulle: "",
      hy: "",
      sy: "",
    };

    try {
      const response = await axios.post(API_BASE, newRow);
      setRows((prev) => [...prev, response.data]);
      alertCtx.success("New row added successfully.");
    } catch {
      alertCtx.error("Failed to add new row.");
    }
  };

  return (
    <div
      className="Font-Segoe-Large-Howto"
      style={{
        border: "1px solid #FF4F00",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
        marginBottom: "16px",
        marginTop: "16px",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          marginBottom: "16px",
          marginTop: "1px",
        }}
      >
        Taal Index
      </h2>

      <div style={{ overflowX: "auto" }}>
        <table
          className="IndexTable IndexTableHover"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th
                className="Font-Segoe-Small-Swart"
                style={{
                  textAlign: "center",
                  padding: "6px",
                  fontWeight: "bold",
                  color: "#000000",
                  backgroundColor: "#f7f4f3"
                }}
              >
                📖 Woord
              </th>
              {pronouns.map((p) => (
                <th
                  key={p.key}
                  className="Font-Segoe-Small-Swart"
                  style={{
                    textAlign: "center",
                    padding: "6px",
                    fontWeight: "bold",
                    color: "#000000",
                    fontSize: "20px", // ✅ larger avatar size
                    backgroundColor: "#f7f4f3"
                  }}
                >
                  <span style={{ fontSize: "28px", display: "block" }}>{p.avatar}</span>
                  <span style={{ fontSize: "14px" }}>{p.label}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {/* Woord Column */}
                <td
                  onClick={() => handleCellClick(row.id, "woord", row.woord)}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #ddd",
                    textAlign: "center",
                    padding: "3px",
                  }}
                >
                  {editing.id === row.id && editing.field === "woord" ? (
                    // <input
                    //   type="text"
                    //   value={editing.value}
                    //   onChange={handleChange}
                    //   onBlur={() => handleSave(row.id, "woord")}
                    //   onKeyDown={(e) => handleKeyPress(e, row.id, "woord")}
                    //   // autoFocus
                    //   style={{
                    //     width: "55%",
                    //     border: "1px solid #d10e0eff",
                    //     borderRadius: "3px",
                    //     textAlign: "center",
                    //   }}
                    // />

                    <input
  type="text"
  value={editing.value}
  onChange={handleChange}
  onBlur={() => handleSave(row.id, "woord")}
  onKeyDown={(e) => handleKeyPress(e, row.id, "woord")}
  autoFocus
  style={{
    width: "85%",
    border: "1px solid #c58b8b",
    borderRadius: "3px",
    textAlign: "center",
    padding: "3px",
    fontSize: "13px",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  }}
  onFocus={(e) => {
    e.target.style.border = "1px solid #FF4F00";
    e.target.style.boxShadow = "0 0 5px rgba(139, 0, 0, 0.4)";
  }}
/>

                  ) : 
                  (
                      <strong style={{ textAlign: "centre", display: "block" }}>
    {row.woord}
  </strong>
                  )
                  }
                </td>

                {/* Pronoun Columns */}
                {pronouns.map((p) => (
                  <td
                    key={p.key}
                    onClick={() => handleCellClick(row.id, p.key, row[p.key])}
                    style={{
                      cursor: "pointer",
                      border: "1px solid #ddd",
                      textAlign: "center",
                      padding: "4px",
                    }}
                  >
                    {editing.id === row.id && editing.field === p.key ? (
                      <input
                        type="text"
                        value={editing.value}
                        onChange={handleChange}
                        onBlur={() => handleSave(row.id, p.key)}
                        onKeyDown={(e) => handleKeyPress(e, row.id, p.key)}
                        autoFocus
                        style={{
                          width: "85%",
                          border: "1px solid #c58b8b",
                          borderRadius: "3px",
                          textAlign: "center",
                          padding: "3px",
                          fontSize: "13px",
                          outline: "none",
                          transition: "all 0.2s ease-in-out",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                        }}
                        onFocus={(e) => {
                          e.target.style.border = "1px solid #FF4F00";
                          e.target.style.boxShadow = "0 0 5px rgba(139, 0, 0, 0.4)";
                        }}
                      />
                    ) : 
                    (
                      row[p.key]
                    )
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={handleAddRow}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "6px 10px",
              cursor: "pointer",
              fontFamily: "Segoe UI",
            }}
          >
            <FaPlus style={{ marginRight: "5px", color: "#336791" }} /> Add Row
          </button>
        </div>
      </div>
    </div>
  );
}
