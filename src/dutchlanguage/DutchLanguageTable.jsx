import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { MdOutlineEdit } from "react-icons/md";

// Always use Heroku API
const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1";

export default function DutchLanguageList() {
  const [records, setRecords] = useState([]);
  const [newRow, setNewRow] = useState({ afrikaans: "", dutch: "", sample: "" });
  const [showAddRow, setShowAddRow] = useState(false);

  // editing state
  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState({ afrikaans: "", dutch: "", sample: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dutchlanguage`);
      const sorted = res.data.sort((a, b) => a.afrikaans.localeCompare(b.afrikaans));
      setRecords(sorted);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const addRow = async () => {
    if (!newRow.afrikaans || !newRow.dutch || !newRow.sample) return;
    try {
      await axios.post(`${API_BASE}/dutchlanguage/create`, newRow);
      setNewRow({ afrikaans: "", dutch: "", sample: "" });
      setShowAddRow(false);
      fetchData();
    } catch (err) {
      console.error("Error adding row:", err);
    }
  };

  const startEdit = (rec) => {
    setEditId(rec.id);
    setEditRow({ afrikaans: rec.afrikaans, dutch: rec.dutch, sample: rec.sample });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditRow({ afrikaans: "", dutch: "", sample: "" });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${API_BASE}/dutchlanguage/update/${id}`, editRow);
      setEditId(null);
      setEditRow({ afrikaans: "", dutch: "", sample: "" });
      fetchData();
    } catch (err) {
      console.error("Error updating row:", err);
    }
  };

  const lineStyle = {
    fontFamily: "Segoe UI, sans-serif",
    fontSize: "16px",
    margin: "4px 0",
    textAlign: "right",
  };

  const afrikaansStyle = {
    color: "#007749",
    marginRight: "4px",
    cursor: "pointer"
  };

  const dutchStyle = {
    color: "#FF4F00",
    marginLeft: "4px",
    cursor: "pointer"
  };

  const inputStyle = {
    fontFamily: "Segoe UI",
    fontSize: "14px",
    width: "150px",
    padding: "4px",
    borderRadius: "4px",
    border: "1px solid #777777",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    marginRight: "6px",
    cursor: "pointer"
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "14px" }}>
      <Tooltip id="insert" place="top" />
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px", textAlign: "right" }}>
        Index
      </h2>
      <div>
        {records.map((rec) => (
          <div key={rec.id} style={lineStyle} data-tooltip-id="insert" data-tooltip-content={rec.sample}>
            {editId === rec.id ? (
              <>
                <input
                  style={{ ...inputStyle, width: "80px" }}
                  value={editRow.afrikaans}
                  onChange={(e) => setEditRow({ ...editRow, afrikaans: e.target.value })}
                />
                <input
                  style={{ ...inputStyle, width: "100px" }}
                  value={editRow.dutch}
                  onChange={(e) => setEditRow({ ...editRow, dutch: e.target.value })}
                />
                <input
                  style={{ ...inputStyle, width: "160px" }}
                  value={editRow.sample}
                  onChange={(e) => setEditRow({ ...editRow, sample: e.target.value })}
                />
                <FaCheck
                  size={18}
                  color="#007749"
                  style={{ cursor: "pointer", marginRight: "8px" }}
                  onClick={() => saveEdit(rec.id)}
                />
                <FaTimes
                  size={18}
                  color="#777777"
                  style={{ cursor: "pointer" }}
                  onClick={cancelEdit}
                />
              </>
            ) : (
              <>
                <span style={afrikaansStyle}>{rec.afrikaans}</span>
                <HiOutlineArrowNarrowRight />
                <span style={dutchStyle}>{rec.dutch}</span>
                <FaEdit
                  size={12}
                  color="#ddd"
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                  onClick={() => startEdit(rec)}
                />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add row form */}
      {showAddRow ? (
        <div style={{ marginTop: "8px", textAlign: "right" }}>
          <input
            style={{ ...inputStyle, width: "80px" }}
            value={newRow.afrikaans}
            onChange={(e) => setNewRow({ ...newRow, afrikaans: e.target.value })}
            placeholder="Afrikaans"
          />
          <input
            value={newRow.dutch}
            onChange={(e) => setNewRow({ ...newRow, dutch: e.target.value })}
            placeholder="Dutch"
            style={{ ...inputStyle, width: "100px" }}
          />
          <input
            value={newRow.sample}
            onChange={(e) => setNewRow({ ...newRow, sample: e.target.value })}
            placeholder="Sample"
            style={{ ...inputStyle, width: "160px" }}
          />
          <FaCheck
            size={18}
            color="#777777"
            style={{ cursor: "pointer", marginRight: "12px", marginTop: "12px" }}
            onClick={addRow}
          />
          <FaTimes
            size={18}
            color="#777777"
            style={{ cursor: "pointer" }}
            onClick={() => setShowAddRow(false)}
          />
        </div>
      ) : (
        <div style={{ textAlign: "right", marginTop: "4px" }}>
          <FaPlus
            size={18}
            color="#777777"
            style={{ cursor: "pointer" }}
            onClick={() => setShowAddRow(true)}
          />
        </div>
      )}
    </div>
  );
}
