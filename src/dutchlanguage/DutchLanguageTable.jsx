import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

// Always use Heroku API
const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1";

export default function DutchLanguageList() {
  const [records, setRecords] = useState([]);
  const [newRow, setNewRow] = useState({ afrikaans: "", dutch: "", sample: "" });
  const [showAddRow, setShowAddRow] = useState(false);

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

  const lineStyle = {
    fontFamily: "Segoe UI, sans-serif",
    fontSize: "16px",
    margin: "4px 0",
    cursor: "pointer",
    textAlign: "right",
  };

  const afrikaansStyle = {
    color: "#007749",
    // fontWeight: "bold",
    marginRight: "4px",
  };

  const dutchStyle = {
    color: "#FF4F00",
    // fontWeight: "bold",
    marginLeft: "4px",
  };

  const inputStyle = {
    fontFamily: "Segoe UI",
    fontSize: "14px",
    width: "250px",
    padding: "4px",
    borderRadius: "4px",
    border: "1px solid #777777",
    backgroundColor: "#FFFFFF",
    color: "#000000",

  }

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "14px" }}>
      <div>
        {records.map((rec, index) => (
          <div key={index} style={lineStyle} title={rec.sample}>
            <span style={afrikaansStyle}>{rec.afrikaans}</span>
            {/* <span>--&gt;</span>  */}
            <span><HiOutlineArrowNarrowRight /></span>
            <span style={dutchStyle}>{rec.dutch}</span>
          </div>
        ))}
      </div>

      {/* Add row form */}
      {showAddRow ? (
        <div style={{ marginTop: "8px", textAlign: "right" }}>
          <input style={{ ...inputStyle, width: "50px" }}
            value={newRow.afrikaans}
            onChange={(e) => setNewRow({ ...newRow, afrikaans: e.target.value })}
            placeholder="Afrikaans"
          // style={{ ...afrikaansStyle, fontSize: "12px", marginRight: "4px" }}
          />
          <input
            value={newRow.dutch}
            onChange={(e) => setNewRow({ ...newRow, dutch: e.target.value })}
            placeholder="Dutch"
            style={{ ...inputStyle, width: "50px" }}
          />
          <input
            value={newRow.sample}
            onChange={(e) => setNewRow({ ...newRow, sample: e.target.value })}
            placeholder="Sample"
            style={inputStyle}
          />
          <FaCheck
            size={18}
            color="#777777"
            style={{ cursor: "pointer", marginRight: "12px", marginTop: "12px" }} // 👈 big space
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
