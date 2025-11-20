import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./DutchLanguageHomePage.css";
import AlertContext from "../Generic/Alerts/AlertContext";
import { FaPlus } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";

const API_BASE =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/dutchlanguageindex";

// Pronouns list
const pronouns = [
  { label: "Ek", key: "ek", avatar: "🧍‍♂️" },
  { label: "Jy", key: "jy", avatar: "🫵" },
  { label: "Hy", key: "hy", avatar: "👨" },
  { label: "Sy", key: "sy", avatar: "👩" },
  { label: "Ons", key: "ons", avatar: "👫" },
  { label: "Julle", key: "julle", avatar: "👥" },
  { label: "Hulle", key: "hulle", avatar: "👨‍👩‍👧‍👦" },
];

// 🔠 Sort function used throughout
const sortRows = (rows) =>
  [...rows].sort((a, b) =>
    (a.woord || "").localeCompare(b.woord || "", "nl", { sensitivity: "base" })
  );

export default function DutchLanguage_Index() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState({ id: null, field: null, value: "" });
  const alertCtx = useContext(AlertContext);

  // Load data
  useEffect(() => {
    axios
      .get(API_BASE)
      .then((response) => {
        setRows(sortRows(response.data));
      })
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
      const updatedList = rows.map((r) => (r.id === id ? updatedRow : r));
      setRows(sortRows(updatedList)); // 🔠 sorted
      alertCtx.success("Value updated successfully.");
    } catch {
      alertCtx.error("Update failed.");
    }

    setEditing({ id: null, field: null, value: "" });
  };

  const handleKeyPress = (e, id, field) => {
    if (e.key === "Enter") e.target.blur();
  };

  const handleAddRow = async () => {
    const newRow = {
      woord: "",
      ek: "",
      jy: "",
      hy: "",
      sy: "",
      ons: "",
      julle: "",
      hulle: "",
    };

    try {
      const response = await axios.post(API_BASE, newRow);
      setRows((prev) => sortRows([...prev, response.data])); // 🔠 sorted
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
        <IoLanguage
          style={{
            color: "#FF4F00",
            fontSize: "30px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        />
        Taal Index
      </h2>

      <div style={{ overflowX: "auto" }}>
        <table
          className="IndexTable IndexTableHover"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
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
                  backgroundColor: "#f7f4f3",
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
                    fontSize: "18px",
                    backgroundColor: "#f7f4f3",
                  }}
                >
                  <span>
                    {p.avatar} {p.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {/* Woord column */}
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
                    <input
                      type="text"
                      value={editing.value}
                      onChange={handleChange}
                      onBlur={() => handleSave(row.id, "woord")}
                      onKeyDown={(e) => handleKeyPress(e, row.id, "woord")}
                      autoFocus
                      style={{
                        width: "45%",
                        border: "1px solid #c58b8b",
                        borderRadius: "3px",
                        textAlign: "center",
                        padding: "3px",
                        fontSize: "13px",
                        outline: "none",
                        transition: "all 0.2s ease-in-out",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      }}
                    />
                  ) : (
                    <strong style={{ display: "block" }}>{row.woord}</strong>
                  )}
                </td>

                {/* Pronoun cells */}
                {pronouns.map((p) => (
                  <td
                    key={p.key}
                    onClick={() =>
                      handleCellClick(row.id, p.key, row[p.key])
                    }
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
                          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                        }}
                      />
                    ) : (
                      row[p.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Row */}
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
