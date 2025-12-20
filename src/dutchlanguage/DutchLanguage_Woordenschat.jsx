import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { PiCheckCircleFill } from "react-icons/pi";
import { IoArrowUndoCircle } from "react-icons/io5";
import { LiaSortAlphaDownSolid } from "react-icons/lia";
import { SlActionRedo } from "react-icons/sl";
import { TbVocabulary } from "react-icons/tb";
import { Tooltip } from "react-tooltip";

const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1";

export default function DutchLanguage_Woordenschat() {
  const [records, setRecords] = useState([]);
  const [newRow, setNewRow] = useState({
    afrikaans: "",
    dutch: "",
    sample: "",
  });
  const [showAddRow, setShowAddRow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState({
    afrikaans: "",
    dutch: "",
    sample: "",
  });

  const [swappedRows, setSwappedRows] = useState(new Set());

  // NEW filter states
  const [afrikaansFilter, setAfrikaansFilter] = useState("");
  const [dutchFilter, setDutchFilter] = useState("");
  // NEW: Global search
  const [searchTerm, setSearchTerm] = useState("");


  // Track if we're in "Dutch mode"
  const [dutchMode, setDutchMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dutchlanguage`);
      const sorted = res.data.sort((a, b) =>
        a.dutch.localeCompare(b.dutch)
      );
      setRecords(sorted);
      setDutchMode(true); // since we are showing Dutch first
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };


  const addRow = async () => {
    if (!newRow.afrikaans || !newRow.dutch || !newRow.sample) return;
    if (!newRow.afrikaans || !newRow.dutch) return;

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
    setEditRow({
      afrikaans: rec.afrikaans,
      dutch: rec.dutch,
      sample: rec.sample,
    });
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

  const filteredRecords = records.filter((rec) => {
    // existing letter-filters
    const afrikaansMatch = afrikaansFilter
      ? rec.afrikaans.toLowerCase().startsWith(afrikaansFilter.toLowerCase())
      : true;

    const dutchMatch = dutchFilter
      ? rec.dutch.toLowerCase().startsWith(dutchFilter.toLowerCase())
      : true;

    // NEW full-text search
    const globalMatch = searchTerm
      ? rec.afrikaans.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.dutch.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return afrikaansMatch && dutchMatch && globalMatch;
  });



  // Styles
  const lineStyle = {
    fontFamily: "Segoe UI, sans-serif",
    fontSize: "14px",
    margin: "4px 0",
    textAlign: "right",
  };

  const afrikaansStyle = {
    color: "#007749",
    marginRight: "4px",
    marginLeft: "4px",
    cursor: "pointer",
  };
  const dutchStyle = {
    color: "#FF4F00",
    marginLeft: "4px",
    marginRight: "4px",
    cursor: "pointer",
  };

  const inputStyle = {
    fontFamily: "Segoe UI",
    fontSize: "14px",
    width: "100px",
    padding: "4px",
    borderRadius: "4px",
    border: "1px solid #777777",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    marginRight: "6px",
  };

  const inputFilterStyle = {
    width: "20px",
    fontSize: "14px",
    textAlign: "center",
    marginLeft: "1px",
    borderRadius: "4px",
    border: "1px solid #777",
  };

  return (




    <div style={{ border: "1px solid #FF4F00", borderRadius: "8px", padding: "16px", fontFamily: "Segoe UI", fontSize: "16px", marginBottom: "16px" }}>

      <Tooltip
        id="index"
        place="right"
        style={{
          backgroundColor: "#000000",
          color: "#ffffff",
          fontSize: "13px",
        }}
      />


      {/* Heading + Search Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        {/* Left: Heading */}
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TbVocabulary
            style={{
              color: "#FF4F00",
              fontSize: "35px",
              cursor: "pointer",
            }}
          />
          Woordenschat
        </h2>

        {/* Right: Search input */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoeken..."
            style={{
              fontFamily: "Segoe UI",
              fontSize: "13px",
              width: "100px",
              padding: "2px 22px 2px 6px",
              borderRadius: "4px",
              border: "1px solid #777",
              height: "20px",
            }}
          />

          {/* Clear button */}
          {searchTerm && (
            <span
              onClick={() => setSearchTerm("")}
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "16px",
                color: "#777",
                fontWeight: "bold",
              }}
            >
              ×
            </span>
          )}
        </div>
      </div>

      {showAddRow ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-end",
          }}
        >

          <input
            value={newRow.dutch}
            onChange={(e) => setNewRow({ ...newRow, dutch: e.target.value })}
            placeholder="Dutch"
            style={{ ...inputStyle, width: "100px", borderColor: "#FF4F00" }}
          />

          <input
            style={{ ...inputStyle, width: "175px", borderColor: "#007749" }}
            value={newRow.afrikaans}
            onChange={(e) =>
              setNewRow({ ...newRow, afrikaans: e.target.value })
            }
            placeholder="Afrikaans"
          />


          <input
            style={{ ...inputStyle, width: "250px", borderColor: "#999" }}
            value={newRow.sample}
            onChange={(e) =>
              setNewRow({ ...newRow, sample: e.target.value })
            }
            placeholder="Voorbeeld"
          />

          <div>
            <PiCheckCircleFill
              size={28}
              color="#007749"
              style={{ cursor: "pointer", marginRight: "5px" }}
              onClick={addRow}
              title="Commit"
            />
            <IoArrowUndoCircle
              size={28}
              color="grey"
              style={{ cursor: "pointer", marginRight: "8px" }}
              onClick={() => setShowAddRow(false)}
              title="Revert"
            />
          </div>


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


      {/* Sorting + Filtering controls */}
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        {/* Afrikaans sort + filter */}
        <LiaSortAlphaDownSolid
          size={25}
          color="#007749"
          style={{ cursor: "pointer", marginBottom: "0px" }}
          title="Sort by Afrikaans"
          onClick={() => {
            setRecords(
              [...records].sort((a, b) =>
                a.afrikaans.localeCompare(b.afrikaans)
              )
            );
            setDutchMode(false);
          }}
        />
        <input
          type="text"
          maxLength={1}
          value={afrikaansFilter}
          onChange={(e) => {
            setAfrikaansFilter(e.target.value);
            setDutchMode(false);
          }}
          placeholder="A"
          style={{
            ...inputFilterStyle,
            borderColor: "#007749",
            color: "#007749",
            marginRight: "10px",
          }}
        />

        {/* Dutch sort + filter */}
        <LiaSortAlphaDownSolid
          size={25}
          color="#FF4F00"
          // style={{ cursor: "pointer", marginLeft: "20px", marginRight: "2px" }}
          style={{ cursor: "pointer" }}
          title="Sort by Dutch"
          onClick={() => {
            setRecords(
              [...records].sort((a, b) => a.dutch.localeCompare(b.dutch))
            );
            setDutchMode(true);
          }}
        />
        <input
          type="text"
          maxLength={1}
          value={dutchFilter}
          onChange={(e) => {
            setDutchFilter(e.target.value);
            setDutchMode(true);
          }}
          placeholder="D"
          style={{
            ...inputFilterStyle,
            borderColor: "#FF4F00",
            color: "#FF4F00",
            marginRight: "25px"
          }}
        />
      </div>

      {/* Records list */}
      <div>
        {filteredRecords.map((rec) => {
          const isSwapped = swappedRows.has(rec.id);

          // Force Dutch on the left if in Dutch mode
          const dutchFirst = dutchMode || isSwapped;


          return (
            <div
              key={rec.id}
              style={lineStyle}
              data-tooltip-id="index"
              data-tooltip-content={rec.sample}
            >
              {editId === rec.id ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      alignItems: "flex-end",
                    }}
                  >
                    <input
                      style={{ ...inputStyle, width: "100px", borderColor: "#FF4F00", borderWidth: "1px" }}
                      value={editRow.dutch}
                      onChange={(e) =>
                        setEditRow({ ...editRow, dutch: e.target.value })
                      }
                    />
                    <input
                      //hierishy
                      style={{ ...inputStyle, width: "175px", borderColor: "#007749", borderWidth: "1px" }}
                      value={editRow.afrikaans}
                      onChange={(e) =>
                        setEditRow({ ...editRow, afrikaans: e.target.value })
                      }
                    /><input
                      style={{ ...inputStyle, width: "250px", borderColor: "#999" }}
                      value={editRow.sample}
                      onChange={(e) =>
                        setEditRow({ ...editRow, sample: e.target.value })
                      }
                      placeholder="Voorbeeld"
                    />
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <PiCheckCircleFill
                      size={28}
                      color="#007749"
                      style={{ cursor: "pointer", marginRight: "5px" }}
                      onClick={() => saveEdit(rec.id)}
                      title="Commit"
                    />
                    <IoArrowUndoCircle
                      size={28}
                      color="grey"
                      style={{ cursor: "pointer", marginRight: "8px" }}
                      onClick={cancelEdit}
                      title="Revert"
                    />
                  </div>
                </>
              ) : (
                <>
                  {dutchFirst ? (
                    <>
                      <span style={dutchStyle}>{rec.dutch}</span>
                      <SlActionRedo
                        size={15}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleSwap(rec.id)}
                      />
                      <span style={afrikaansStyle}>{rec.afrikaans}</span>
                    </>
                  ) : (
                    <>
                      <span style={afrikaansStyle}>{rec.afrikaans}</span>
                      <SlActionRedo
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
    </div>
  );
}
