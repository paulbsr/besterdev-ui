import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { CgSwap } from "react-icons/cg";
import { IoMdSwap } from "react-icons/io";
import { IoSwapHorizontal } from "react-icons/io5";
import { CiUndo, CiCircleCheck } from "react-icons/ci";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1";

export default function DutchLanguageIndex() {
  const [records, setRecords] = useState([]);
  const [newRow, setNewRow] = useState({ afrikaans: "", dutch: "", sample: "" });
  const [showAddRow, setShowAddRow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState({ afrikaans: "", dutch: "", sample: "" });

  // NEW: track swapped rows
  const [swappedRows, setSwappedRows] = useState(new Set());

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

  // NEW: swap toggle
  const toggleSwap = (id) => {
    setSwappedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const lineStyle = {
    fontFamily: "Segoe UI, sans-serif",
    fontSize: "16px",
    margin: "4px 0",
    textAlign: "right",
  };

  const afrikaansStyle = { color: "#007749", marginRight: "4px", marginLeft: "4px" };
  const dutchStyle = { color: "#FF4F00", marginLeft: "4px", marginRight: "4px" };

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
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "14px" }}>
      <Tooltip 
      id="index" 
      place="right-end"
      style={{ backgroundColor: "#222", color: "#fff", borderRadius: "4px" }}
      opacity={1.0}
      variant="light" />
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "12px",
          textAlign: "right",
        }}
      >
        Index
      </h2>
      <div>
        {records.map((rec) => {
          const isSwapped = swappedRows.has(rec.id);
          return (
            <div
              key={rec.id}
              style={lineStyle}
              data-tooltip-id="index"
              data-tooltip-content={rec.sample}
            >
              {editId === rec.id ? (
                <>
                  <input
                    style={{ ...inputStyle, width: "80px" }}
                    value={editRow.afrikaans}
                    onChange={(e) =>
                      setEditRow({ ...editRow, afrikaans: e.target.value })
                    }
                  />
                  <input
                    style={{ ...inputStyle, width: "100px" }}
                    value={editRow.dutch}
                    onChange={(e) =>
                      setEditRow({ ...editRow, dutch: e.target.value })
                    }
                  />
                  <input
                    style={{ ...inputStyle, width: "160px" }}
                    value={editRow.sample}
                    onChange={(e) =>
                      setEditRow({ ...editRow, sample: e.target.value })
                    }
                  />
                  <CiCircleCheck
                    size={22}
                    color="green"
                    style={{ cursor: "pointer", marginRight: "5px", marginTop: "5px" }}
                    onClick={() => saveEdit(rec.id)}
                    title="Commit"
                  />
                  <CiUndo
                    size={22}
                    color="#000000"
                    style={{ cursor: "pointer" }}
                    onClick={cancelEdit}
                    title="Undo"
                  />
                </>
              ) : (
                <>
                  {isSwapped ? (
                    <>
                      <span style={dutchStyle}>{rec.dutch}</span>
                      <IoMdSwap
                        size={15}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleSwap(rec.id)}
                      />
                      <span style={afrikaansStyle}>{rec.afrikaans}</span>
                    </>
                  ) : (
                    <>
                      <span style={afrikaansStyle}>{rec.afrikaans}</span>
                      <IoMdSwap
                      size={15}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleSwap(rec.id)}
                      />
                      <span style={dutchStyle}>{rec.dutch}</span>
                    </>
                  )}
                  <FaEdit
                    size={12}
                    color="#ddd"
                    style={{ cursor: "pointer", marginLeft: "8px" }}
                    onClick={() => startEdit(rec)}
                  />
                </>
              )}
            </div>
          );
        })}
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
          <CiCircleCheck
            size={22}
            color="green"
            style={{ cursor: "pointer", marginRight: "5px", marginTop: "5px" }}
            onClick={addRow}
            title="Commit"
          />
          <CiUndo
            size={22}
            color="#000000"
            style={{ cursor: "pointer" }}
            onClick={() => setShowAddRow(false)}
            title="Revert"
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
