import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { SlActionRedo } from "react-icons/sl";
import { CiUndo } from "react-icons/ci";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';  // PASOPOLO! react-tooltip het AWS Builds opgefok
import { PiCheckCircleFill } from "react-icons/pi";
import { IoArrowUndoCircle } from "react-icons/io5";
import { TbVocabulary } from "react-icons/tb";

const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1";

export default function DutchLanguageWoordenschat() {
    const [records, setRecords] = useState([]);
    const [newRow, setNewRow] = useState({ dutchWord: "", description: "", use: "" });
    const [showAddRow, setShowAddRow] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editRow, setEditRow] = useState({ dutchWord: "", description: "", use: "" });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_BASE}/dutchlanguagewoordenschat`);
            const data = Array.isArray(res.data) ? res.data : res.data.data || [];
            const sorted = data.sort((a, b) => a.dutchWord.localeCompare(b.dutchWord));
            setRecords(sorted);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const addRow = async () => {
        if (!newRow.dutchWord || !newRow.description || !newRow.use) return;
        try {
            await axios.post(`${API_BASE}/dutchlanguagewoordenschat/create`, newRow);
            setNewRow({ dutchWord: "", description: "", use: "" });
            setShowAddRow(false);
            fetchData();
        } catch (err) {
            console.error("Error adding row:", err);
        }
    };

    const startEdit = (rec) => {
        setEditId(rec.id);
        setEditRow({ dutchWord: rec.dutchWord, description: rec.description, use: rec.use });
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditRow({ dutchWord: "", description: "", use: "" });
    };

    const saveEdit = async (id) => {
        try {
            await axios.put(`${API_BASE}/dutchlanguagewoordenschat/update/${id}`, editRow);
            setEditId(null);
            setEditRow({ dutchWord: "", description: "", use: "" });
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

    const inputStyle = {
        fontFamily: "Segoe UI",
        fontSize: "14px",
        width: "200px",
        padding: "4px",
        borderRadius: "4px",
        border: "1px solid #777777",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        marginRight: "6px",
    };

    const dutchStyle = { color: "#FF4F00", marginLeft: "4px", cursor: "pointer" };
    const defaultStyle = { color: "#000000", marginRight: "4px", cursor: "pointer" };

    return (
        <div style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "14px" }}>
            <Tooltip id="tooltip" place="left" />
            <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "12px", textAlign: "right" }}>
                    <TbVocabulary
                      style={{
                        color: "#FF4F00",
                        fontSize: "35px",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    />    
                
                Woordenschat</h2>

            <div>
                {records.map((rec) => (
                    <div key={rec.id} style={lineStyle} data-tooltip-id="insert" data-tooltip-content={rec.use}>
                        {editId === rec.id ? (
                            <>
                                Woord: <input
                                    style={{ ...inputStyle, width: "260px", marginBottom: "5px" }}
                                    value={editRow.dutchWord}
                                    onChange={(e) => setEditRow({ ...editRow, dutchWord: e.target.value })}
                                />
                                <div></div>
                                Beschrijving: <input
                                    style={{ ...inputStyle, width: "260px", marginBottom: "5px" }}
                                    value={editRow.description}
                                    onChange={(e) => setEditRow({ ...editRow, description: e.target.value })}
                                />
                                <div></div>
                                Voorbeeld: <input
                                    style={{ ...inputStyle, width: "260px", marginBottom: "5px" }}
                                    value={editRow.use}
                                    onChange={(e) => setEditRow({ ...editRow, use: e.target.value })}
                                />
                                <div></div>
                                <PiCheckCircleFill
                                    size={28}
                                    color="#007749"
                                    style={{ cursor: "pointer", marginRight: "5px", marginTop: "5px" }}
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
                            </>
                        ) : (
                            <>
                                <span style={dutchStyle}>{rec.dutchWord}</span>
                                <span> <SlActionRedo /> </span>
                                <span style={defaultStyle}>{rec.description}</span>
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
                        style={{ ...inputStyle, width: "260px", marginBottom: "5px" }}
                        value={newRow.dutchWord}
                        onChange={(e) =>
                            setNewRow({ ...newRow, dutchWord: e.target.value })
                        }
                        placeholder="Woord"
                    />
                    <div></div>
                    <input
                        value={newRow.description}
                        onChange={(e) => setNewRow({ ...newRow, description: e.target.value })}
                        placeholder="Beschrijving"
                        style={{ ...inputStyle, width: "260px", marginBottom: "5px" }}
                    />
                    <div></div>
                    <input
                        value={newRow.use}
                        onChange={(e) => setNewRow({ ...newRow, use: e.target.value })}
                        placeholder="Voorbeeld"
                        style={{ ...inputStyle, width: "260px" }}
                    />
                    <div></div>
                    <PiCheckCircleFill
                        size={28}
                        color="#007749"
                        style={{ cursor: "pointer", marginRight: "5px", marginTop: "5px" }}
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
