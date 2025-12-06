import { useState } from "react";
import { GrArticle } from "react-icons/gr";

export default function DutchLanguage_Lidwoorden() {
    const [open, setOpen] = useState(false);

    return (
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
                <GrArticle size={20} />
                <span>Lidwoorden / Articles</span>
            </div>

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
                            color: "#444", // light grey
                            borderRadius: "6px",
                        }}
                    >
                        <thead>
                            <tr>
                                <th
                                    colSpan={2}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "6px",
                                    }}
                                >
                                    <b>near (this/these)</b>
                                </th>
                                <th
                                    colSpan={2}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "6px",
                                    }}
                                >
                                    <b>far (that/those)</b>
                                </th>

                                <th
                                    colSpan={1}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "6px",
                                    }}
                                >
                                    <b>meervoud</b>
                                </th>

                                <th
                                    colSpan={2}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "6px",
                                    }}
                                >
                                    <b>enkelvoud</b>
                                </th>

                            </tr>

                            <tr>
                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    <u>de-woord + meervoud</u>
                                </th>

                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    <u>het-woord (enkelvoud)</u>
                                </th>

                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    <u>de-woord + meervoud</u>
                                </th>

                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    <u>het-woord (enkelvoud)</u>
                                </th>

                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    <u></u>
                                </th>

                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    <u>definite</u>
                                </th>

                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    <u>indefinite</u>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    deze
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    dit
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    die
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    dat
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    de (75%)
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    het
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    een ('n)
                                </td>

                            </tr>
                                                        <tr>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    deze & die
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    dit & dat
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                                    
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
