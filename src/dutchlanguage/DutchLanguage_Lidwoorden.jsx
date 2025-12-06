import { useState } from "react";
import { GrArticle } from "react-icons/gr";

export default function DutchLanguage_Lidwoorden() {
    const [open, setOpen] = useState(false);

    const pronouns = ["Ik", "Jij", "Hij", "Zij", "Het", "Wij", "Jullie", "Ze"];
    const verbs = ["ben", "bent", "is", "is", "is", "zijn", "zijn", "zijn"];

    return (
        <div className="p-4">

            {/* ---- Lidwoorden collapsible ---- */}
            <div style={{ marginTop: "10px", marginBottom: "20px" }}>

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
                    <GrArticle size={20} /><span>Lidwoorden / Articles</span></div>

                {/* Collapsible section */}
                {open && (
                    <div style={{ overflowX: "auto", marginTop: "8px" }}>
                        <table
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid #ccc",
                                minWidth: "400px",
                                textAlign: "center",
                                fontFamily: "'Candara', sans-serif",
                                fontSize: "12px",
                                color: "#444",
                                borderRadius: "6px",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th colSpan={2} style={{ border: "1px solid #ccc", padding: "2px" }}><b>near (this/these)</b></th>
                                    <th colSpan={2} style={{ border: "1px solid #ccc", padding: "2px" }}><b>far (that/those)</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>meervoud</b></th>
                                    <th colSpan={2} style={{ border: "1px solid #ccc", padding: "2px" }}><b>enkelvoud</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>1e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>2e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>3e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>3e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>3e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>3e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>3e</b></th>
                                    <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>3e</b></th>
                                </tr>

                                <tr>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>de-woord + meervoud</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>het-woord</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>de-woord + meervoud</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>het-woord</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>definite</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>indefinite</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Ik</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Jij</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Hij</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Zij</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Het</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Wij</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Jullie</u></th>
                                    <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Ze</u></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>deze</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>dit</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>die</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>dat</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>de (75%)</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>het</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>een</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>ben..was</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>bent..was</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>is..was</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>is..was</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>is..was</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>zijn..waren</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>zijn..waren</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>zijn..waren</td>
                                </tr>

                                <tr>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}></td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}></td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}></td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}></td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>deze & die</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>dit & dat</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}></td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>heb..had</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebt..had</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>heeft..had</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>heeft..had</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>heeft..had</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebben..hadden</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebben..hadden</td>
                                    <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebben..hadden</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
