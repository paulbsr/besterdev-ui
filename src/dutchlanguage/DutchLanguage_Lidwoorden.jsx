// import { useState } from "react";
// import { GrArticle } from "react-icons/gr";

// export default function DutchLanguage_Lidwoorden() {
//     const [open, setOpen] = useState(false);

//     const pronouns = ["Ik", "Jij", "Hij", "Zij", "Het", "Wij", "Jullie", "Ze"];
//     const verbs = ["ben", "bent", "is", "is", "is", "zijn", "zijn", "zijn"];

//     return (
//         <div className="p-4">

//             {/* ---- Lidwoorden collapsible ---- */}
//             <div style={{ marginTop: "10px", marginBottom: "20px", width: "100%" }}>

//                 {/* Icon trigger */}
//                 <div
//                     onClick={() => setOpen(!open)}
//                     style={{
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "8px",
//                         marginBottom: "8px",
//                         fontFamily: "'Aptos Narrow', sans-serif",
//                         fontSize: "11px",
//                         color: "#444",
//                     }}
//                 >
//                     <GrArticle size={26} color="#FF4F00" /><span>Lidwoorden (Articles)</span></div>

//                 {/* Collapsible section */}
//                 {open && (
//                     // <div style={{ overflowX: "auto", marginTop: "8px" }}>
//                     <div
//                         style={{
//                             width: "100%",
//                             // height: 250,
//                             marginBottom: 16,
//                             border: "1px solid #FF4F00",
//                             borderRadius: "8px",
//                             padding: "10px",
//                             boxSizing: "border-box",
//                             overflowX: "auto",
//                             marginTop: "8px"
//                         }}
//                     >
//                         <table
//                             style={{
//                                 borderCollapse: "collapse",
//                                 border: "1px solid #ccc",
//                                 minWidth: "400px",
//                                 textAlign: "center",
//                                 fontFamily: "'Candara', sans-serif",
//                                 fontSize: "12px",
//                                 color: "#444",
//                                 borderRadius: "6px",
//                                 width: "100%",
//                             }}
//                         >
//                             <thead>
//                                 <tr>
//                                     <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>meervoud</b></th>
//                                     <th colSpan={2} style={{ border: "1px solid #ccc", padding: "2px" }}><b>enkelvoud</b></th>
//                                     <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>vorm</b></th>
//                                     <th colSpan={5} style={{ border: "1px solid #ccc", padding: "2px" }}><b>enkelvoud</b></th>
//                                     <th colSpan={3} style={{ border: "1px solid #ccc", padding: "2px" }}><b>meervoud</b></th>
//                                 </tr>

//                                 <tr>
//                                     <th colSpan={2} style={{ border: "1px solid #ccc", padding: "2px" }}><u>bepaalde</u></th>
//                                     <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>onbepaalde</u></th>
//                                     <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>gebruik</u></th>
//                                     <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Ik (1e)</u></th>
//                                     <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Jij (2e)</u></th>
//                                     <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Hij (3e)</u></th>
//                                     <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Zij (3e)</u></th>
//                                     <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Het (3e)</u></th>
//                                     <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Wij (3e)</u></th>
//                                     <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Jullie (3e)</u></th>
//                                     <th style={{ border: "1px solid #ccc", padding: "2px" }}><u>Ze (3e)</u></th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 <tr>
//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>de (75%)</td>
//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>het
//                                         <span style={{ display: "block", fontSize: "12px" }}>(-je/verkleining)</span> </td>
//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>een</td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>"I am.."
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>verlede</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>toekoms</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>ben
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>was</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>bent
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>was</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zult zijn</span></td>


//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>is
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>was</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>is
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>was</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span></td>


//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>is
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>was</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span></td>        


//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>zijn
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>waren</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen zijn</span></td>  

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>zijn
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF"}}>waren</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen zijn</span></td>  


//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>zijn
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>waren</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen zijn</span></td>
//                                 </tr>

//                                 <tr>
//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>deze & die
//                                         <span style={{ display: "block", fontSize: "0.8em" }}></span>Near (this / these)</td>
//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>dit & dat
//                                         <span style={{ display: "block", fontSize: "0.8em" }}></span>Far (that / those)</td>
//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}></td>

//                                         <td style={{ border: "1px solid #ccc", padding: "2px" }}>"I have.."
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF"}}>verlede</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>toekoms</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>heb
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>had</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebt
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>had</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zult hebben</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>heeft
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>had</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>heeft
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>had</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>heeft                                  
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>had</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebben                                  
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>hadden</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen hebben</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebben
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>hadden</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen hebben</span></td>

//                                     <td style={{ border: "1px solid #ccc", padding: "2px" }}>hebben
//                                         <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>hadden</span>
//                                         <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen hebben</span></td>

//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import { GrArticle } from "react-icons/gr";
import { IoLanguage } from "react-icons/io5";

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
                <GrArticle
          style={{
            color: "#FF4F00",
            fontSize: "30px",
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
                        <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>meervoud</b></th>
                        <th colSpan={2} style={{ border: "1px solid #ccc", padding: "2px" }}><b>enkelvoud</b></th>
                        <th colSpan={1} style={{ border: "1px solid #ccc", padding: "2px" }}><b>vorm</b></th>
                        <th colSpan={5} style={{ border: "1px solid #ccc", padding: "2px" }}><b>enkelvoud</b></th>
                        <th colSpan={3} style={{ border: "1px solid #ccc", padding: "2px" }}><b>meervoud</b></th>
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
                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>de (75%)</td>
                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            het
                            <span style={{ display: "block", fontSize: "12px" }}>(-je/verkleining)</span>
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>een</td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            "I am.."
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>verlede</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>toekoms</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            ben
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>was</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            bent
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>was</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zult zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            is
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>was</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            is
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>was</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            is
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>was</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            zijn
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>waren</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            zijn
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>waren</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen zijn</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            zijn
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>waren</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen zijn</span>
                        </td>
                    </tr>

                    {/* ---- second row ---- */}
                    <tr>
                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            deze & die
                            <span style={{ display: "block", fontSize: "0.8em" }}></span>
                            Near (this / these)
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            dit & dat
                            <span style={{ display: "block", fontSize: "0.8em" }}></span>
                            Far (that / those)
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "2px" }}></td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            "I have.."
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>verlede</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>toekoms</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            heb
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>had</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            hebt
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>had</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zult hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            heeft
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>had</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            heeft
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>had</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            heeft
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>had</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zal hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            hebben
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>hadden</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            hebben
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>hadden</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen hebben</span>
                        </td>

                        <td style={{ border: "1px solid #ccc", padding: "2px" }}>
                            hebben
                            <span style={{ display: "block", fontSize: "12px", color: "#0066FF" }}>hadden</span>
                            <span style={{ display: "block", fontSize: "12px", color: "#EA5C5F" }}>zullen hebben</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        //     </div >
        // </div >
        
    );
}
