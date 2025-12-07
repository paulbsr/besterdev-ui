import { useState } from "react";
import { GrArticle } from "react-icons/gr";

export default function DutchLanguage_Lidwoorden() {
    const [open, setOpen] = useState(false);

    const pronouns = ["Ik", "Jij", "Hij", "Zij", "Het", "Wij", "Jullie", "Ze"];
    const verbs = ["ben", "bent", "is", "is", "is", "zijn", "zijn", "zijn"];

    return (
        <div className="p-4">

            {/* ---- Lidwoorden collapsible ---- */}
            <div style={{ marginTop: "10px", marginBottom: "20px", width: "100%" }}>

                {/* Icon trigger */}
                <div
                    onClick={() => setOpen(!open)}
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                        fontFamily: "'Aptos Narrow', sans-serif",
                        fontSize: "14px",
                        color: "#444",
                    }}
                >
                    <GrArticle size={26} color="#FF4F00" /><span>Lidwoorden (Articles)</span></div>

                {/* Collapsible section */}
                {open && (
                    // <div style={{ overflowX: "auto", marginTop: "8px" }}>
                    <div
                        style={{
                            width: "100%",
                            // height: 250,
                            marginBottom: 16,
                            border: "1px solid #FF4F00",
                            borderRadius: "8px",
                            padding: "10px",
                            boxSizing: "border-box",
                            overflowX: "auto",
                            marginTop: "8px"
                        }}
                    >
                        <table
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid #ccc",
                                minWidth: "400px",
                                textAlign: "center",
                                fontFamily: "'Candara', sans-serif",
                                fontSize: "14px",
                                color: "#444",
                                borderRadius: "6px",
                                width: "100%",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>meervoud</b></th>
                                    <th colSpan={2} style={{ border: "1px solid #ccc", padding: "2px" }}><b>enkelvoud</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>vorm</b></th>
                                    <th colSpan={5} style={{ border: "1px solid #ccc", padding: "2px" }}><b>enkelvoud</b></th>
                                    <th colSpan={3} style={{ border: "1px solid #ccc", padding: "2px" }}><b>meervoud</b></th>
                                    {/* <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>3 / 3e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>4 / 3e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>5 / 3e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>6 / 3e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>7 / 3e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>8 / 3e</b></th> */}
                                </tr>

                                <tr>
                                    <th colSpan={2} style={{ border: "1px solid #ccc", padding: "2px" }}><u>bepaalde</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>onbepaalde</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>gebruik</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Ik (1e)</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Jij (2e)</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Hij (3e)</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Zij (3e)</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Het (3e)</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Wij (3e)</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Jullie (3e)</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Ze (3e)</u></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>de (75%)</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>het</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>een</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>"I am.."</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>ben
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>was</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>bent
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>was</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>is
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>was</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>is
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>was</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>is
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>was</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>zijn
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>waren</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>zijn
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>waren</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>zijn
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>waren</td>
                                </tr>

                                <tr>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>deze & die
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>Near (this / these)</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>dit & dat
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>Far (that / those)</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}></td>
                                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>"I have.."</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>heb
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>had</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebt
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>had</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>heeft
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>had</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>heeft
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>had</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>heeft                                  
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>had</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebben                                  
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>hadden</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebben
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>hadden</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebben
                                        <span style={{ display: "block", fontSize: "0.8em" }}></span>hadden</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
