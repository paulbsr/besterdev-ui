import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

// Always use Heroku API
const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1";

export default function DutchLanguageWoordenschat() {
    const [records, setRecords] = useState([]);
    const [newRow, setNewRow] = useState({ dutchWord: "", description: "", use: "" });
    const [showAddRow, setShowAddRow] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_BASE}/dutchlanguagewoordenschat`);
            console.log("API response:", res.data); // 👈 see what comes back
            const data = Array.isArray(res.data) ? res.data : res.data.data || [];
            const sorted = data.sort((a, b) => a.dutchWord.localeCompare(b.dutchWord));
            setRecords(sorted);
            console.log("In jou dutchlanguagewoordenschat is RECORDS:", records)
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

    const lineStyle = {
        fontFamily: "Segoe UI, sans-serif",
        fontSize: "16px",
        margin: "4px 0",
        cursor: "pointer",
        textAlign: "right",
    };

    const afrikaansStyle = {
        color: "#007749",
        marginRight: "4px",
    };

    const defaultStyle = {
        color: "#000000",
        marginRight: "4px",
    };

    const dutchStyle = {
        color: "#FF4F00",
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
    };

    return (
        <div style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "14px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px", textAlign: "right" }}>
                Woordenschat
            </h2>

            <div>
                {records.map((rec, index) => (
                    <div key={index} style={lineStyle}>
                        <span style={dutchStyle} title={rec.use}>
                            {rec.dutchWord}
                        </span>
                        <span>
                            <HiOutlineChatBubbleLeftEllipsis />
                        </span>
                        <span style={defaultStyle} title={rec.use}>
                            {rec.description}
                        </span>
                    </div>
                ))}
            </div>

            {/* Add row form */}
            {showAddRow ? (
                <div style={{ marginTop: "8px", textAlign: "right" }}>
                    <input
                        style={{ ...inputStyle, width: "80px" }}
                        value={newRow.dutchWord}
                        onChange={(e) =>
                            setNewRow({ ...newRow, dutchWord: e.target.value })
                        }
                        placeholder="Woord"
                    />
                    <input
                        value={newRow.description}
                        onChange={(e) => setNewRow({ ...newRow, description: e.target.value })}
                        placeholder="Beschrijving"
                        style={{ ...inputStyle, width: "120px" }}
                    />
                    <input
                        value={newRow.use}
                        onChange={(e) => setNewRow({ ...newRow, use: e.target.value })}
                        placeholder="Voorbeeld"
                        style={{ ...inputStyle, width: "160px" }}
                    />
                    {/* <div>ccc</div> */}
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
