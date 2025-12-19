import { PiArticleNyTimes } from "react-icons/pi";

export default function DutchLanguage_Lidwoorden() {

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
                <PiArticleNyTimes
                    style={{
                        color: "#FF4F00",
                        fontSize: "35px",
                        cursor: "pointer",
                        marginRight: "10px",
                    }}
                />
                Lidwoorden (Articles)
            </h2>

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
                    width: "100%",
                }}
            >
                <thead>
                    <tr>
                        <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px", backgroundColor: "#f5cba9ff" }}><b>meervoud</b></th>
                        <th colSpan={2} style={{ border: "1px solid #ccc", padding: "2px", backgroundColor: "#f3e5d5ff" }}><b>enkelvoud</b></th>
                        <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>vorm</b></th>
                        <th colSpan={5} style={{ border: "1px solid #ccc", padding: "2px", backgroundColor: "#f3e5d5ff" }}><b>enkelvoud</b></th>
                        <th colSpan={3} style={{ border: "1px solid #ccc", padding: "2px", backgroundColor: "#f5cba9ff" }}><b>meervoud</b></th>
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
                    {/* ---- first row ---- */}
                    <tr>
                        <td style={{ border: "1px solid #ccc", padding: "2px", backgroundColor: "#f5cba9ff" }}>de (75%)</td>
                        <td style={{ border: "1px solid #ccc", padding: "2px", backgroundColor: "#f3e5d5ff" }}>het
                            <span style={{ display: "block", fontSize: "12px" }}>(-je/verkleining)</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", backgroundColor: "#f3e5d5ff" }}>een</td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF" }}>verlede
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>"I am.."</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>toekoms</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f3e5d5ff" }}>was
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>ben</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f3e5d5ff" }}>was
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>bent</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zult zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f3e5d5ff" }}>was
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>is</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f3e5d5ff" }}>was
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>is</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f3e5d5ff" }}>was
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>is</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f5cba9ff" }}>waren
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>zijn</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f5cba9ff" }}>waren
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>zijn</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f5cba9ff" }}>waren
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>zijn</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen zijn</span>
                        </td>
                    </tr>

                    {/* ---- second row ---- */}
                    <tr>
                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>deze & die
                            <span style={{ display: "block", fontSize: "0.8em" }}></span>
                            Near (this / these)
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>dit & dat
                            <span style={{ display: "block", fontSize: "0.8em" }}></span>
                            Far (that / those)
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}></td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF" }}>verlede
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>"I have.."</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>toekoms</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f3e5d5ff" }}>had
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>heb</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f3e5d5ff" }}>had
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>hebt</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zult hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f3e5d5ff" }}>had
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>heeft</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f3e5d5ff" }}>had
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>heeft</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f3e5d5ff" }}>had
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>heeft</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f5cba9ff" }}>hadden
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>hebben</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f5cba9ff" }}>hadden
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>hebben</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px", color: "#0066FF", backgroundColor: "#f5cba9ff" }}>hadden
                            <span style={{ display: "block", fontSize: "12px", color: "#000000" }}>hebben</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen hebben</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
