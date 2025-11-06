// import React, { useState, useEffect } from "react";
// import { FaBookOpen } from "react-icons/fa6";
// import { IoBookOutline } from "react-icons/io5";
// import { PiBookOpenTextBold } from "react-icons/pi";

// function DutchLanguage_Dagboek() {
//     const [entry, setEntry] = useState("");
//     const [feedback, setFeedback] = useState("");
//     const [aiSentence, setAiSentence] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [allEntries, setAllEntries] = useState([]);
//     const [showEntries, setShowEntries] = useState(false);
//     const [expandedEntryId, setExpandedEntryId] = useState(null); // 👈 NEW: which date is open

//     const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/diary";
//     const AI_ENDPOINT = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

//     useEffect(() => {
//         fetchAllEntries();
//     }, []);

//     const fetchAllEntries = async () => {
//         try {
//             const res = await fetch(API_BASE);
//             const data = await res.json();
//             setAllEntries(Array.isArray(data) ? data : [data]);
//         } catch (err) {
//             console.error("Error fetching diary entries:", err);
//             setAllEntries([]);
//         }
//     };

//     // const formatDate = (dateString) => {
//     //     if (!dateString) return "Onbekend datum";
//     //     const d = new Date(dateString);
//     //     if (isNaN(d)) return "Onbekend datum";
//     //     const yyyy = d.getFullYear();
//     //     const mm = String(d.getMonth() + 1).padStart(2, "0");
//     //     const dd = String(d.getDate()).padStart(2, "0");
//     //     return `${yyyy}.${mm}.${dd}`;
//     // };

//     const formatDate = (dateString) => {
//         if (!dateString) return "Onbekend datum";
//         const d = new Date(dateString);
//         if (isNaN(d)) return "Onbekend datum";

//         const yyyy = d.getFullYear();
//         const mm = String(d.getMonth() + 1).padStart(2, "0");
//         const dd = String(d.getDate()).padStart(2, "0");
//         const hh = String(d.getHours()).padStart(2, "0");
//         const min = String(d.getMinutes()).padStart(2, "0");

//         return `${yyyy}.${mm}.${dd} @ ${hh}:${min}`;
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!entry.trim()) return;

//         setLoading(true);
//         setFeedback("");
//         setAiSentence("");

//         try {
//             const postRes = await fetch(API_BASE, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ myEntry: entry, aiEntry: "", feedback: "" }),
//             });

//             const saved = await postRes.json();
//             const savedId = saved.id;

//             const aiRes = await fetch(AI_ENDPOINT, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     question: `You are a Dutch language teacher. A student wrote: "${entry}". 
// Please respond ONLY in raw JSON with keys "feedback" and "suggestedSentence".`,
//                 }),
//             });

//             const aiData = await aiRes.json();
//             let aiText = aiData.answer || aiData.response || "";
//             aiText = aiText.replace(/^Optional\[/, "").replace(/\]$/, "").replace(/```json|```/g, "").trim();

//             let parsedFeedback = "";
//             let parsedSentence = "";
//             try {
//                 const parsed = JSON.parse(aiText);
//                 parsedFeedback = parsed.feedback || "";
//                 parsedSentence = parsed.suggestedSentence || "";
//             } catch {
//                 parsedFeedback = aiText;
//             }

//             setFeedback(parsedFeedback);
//             setAiSentence(parsedSentence);

//             await fetch(`${API_BASE}/${savedId}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ feedback: parsedFeedback, aiEntry: parsedSentence }),
//             });

//             setEntry("");
//             fetchAllEntries();
//         } catch (err) {
//             console.error(err);
//             setFeedback("Er is een fout opgetreden.");
//         } finally {
//             setLoading(false);
//         }
//     };


//     const styles = {
//         container: {
//             border: "1px solid #FF4F00",
//             borderRadius: "8px",
//             padding: "16px",
//             fontFamily: "Segoe UI",
//             fontSize: "16px",
//             maxWidth: "1100px",
//             marginTop: "16px",
//             marginBottom: "16px"
//         },
//         headerRow: {
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginBottom: "6px",
//         },
//         title: {
//             fontWeight: "bold",
//             fontSize: "22px",
//             margin: 0,
//         },
//         button: {
//             height: "40.5px",
//             border: "1px solid #777",
//             borderRadius: "4px",
//             padding: "8px 8px",
//             fontSize: "16px",
//         },
//         collapseButton: {
//             border: "1px solid #ccc",
//             backgroundColor: "#fff",
//             borderRadius: "4px",
//             padding: "5px 10px",
//             cursor: "pointer",
//             fontSize: "10px",
//         },
//         questionBox: {
//             backgroundColor: "#f9f9f9",
//             borderLeft: "12px solid #c0c0c0",
//             padding: "12px 16px",
//             borderRadius: "6px",
//             marginTop: "10px",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//         },
//         questionText: {
//             fontSize: "18px",
//             color: "#FF4F00",
//             fontStyle: "italic",
//             marginTop: "10px",
//         },
//         optionList: {
//             listStyleType: "none",
//             padding: "0",
//             marginTop: "10px",
//             lineHeight: "1.8",
//         },
//         select: {
//             height: "40.5px",
//             border: "1px solid #777",
//             borderRadius: "4px",
//             paddingLeft: "10px",
//             width: "750px",
//             fontSize: "16px",
//             backgroundColor: "#fff",
//         },
//     };

//     return (
//         // <div
//         //     style={{
//         //         maxWidth: "1100px",
//         //         margin: "16px auto",
//         //         padding: "20px",
//         //         borderRadius: "10px",
//         //         border: "1px solid #FF4F00",
//         //         fontFamily: "Segoe UI",
//         //         fontSize: "11pt",
//         //     }}
//         // >
//         //     <h2
//         //         style={{
//         //             // fontWeight: "bold",
//         //             fontSize: "22px",
//         //             marginBottom: "6px",
//         //             marginTop: "1px",
//         //         }}
//         //     ><PiBookOpenTextBold style={{ color: '#FF4F00', fontSize: '32px', cursor: 'pointer', marginRight: '10px' }}/>
//         //         Mijn Dagboek in het Nederlands
//         //     </h2>

//         <div style={styles.container}>
//             {/* <div style={styles.headerRow}> */}
//             <h2 style={styles.title}><PiBookOpenTextBold style={{ color: '#FF4F00', fontSize: '35px', cursor: 'pointer', marginRight: '10px' }} />Mijn Dagboek in het Nederlands</h2>

//             {/* Form */}
//             <form onSubmit={handleSubmit}>
//                 <textarea
//                     value={entry}
//                     onChange={(e) => setEntry(e.target.value)}
//                     placeholder="Typ hier jouw dagboektekst..."
//                     // rows="2"
//                     style={{
//                         marginTop: "10px",
//                         height: "40.5px",
//                         width: "100%",
//                         padding: "4px",
//                         fontFamily: "Segoe UI",
//                         fontSize: "12pt",
//                         borderRadius: "4px",
//                         border: "0.75px solid #777777",
//                     }}
//                 />
//                 <div>
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         style={{
//                             // marginLeft: "5px",
//                             height: "35.5px",
//                             width: "75px",
//                             border: "1px solid #FF4F00",
//                             borderRadius: "4px",
//                             backgroundColor: "#FFFFFF",
//                             color: "#000000",
//                             cursor: "pointer",
//                             fontFamily: "Segoe UI",
//                             fontSize: "16px",

//                         }}
//                     >
//                         {loading ? "Bezig..." : "Verstuur"}
//                     </button>
//                 </div>
//             </form>

//             {/* Toggle diary list */}
//             <div style={{ marginTop: "20px" }}>
//                 <button
//                     onClick={() => setShowEntries(!showEntries)}
//                     style={{
//                         fontFamily: "Segoe UI",
//                         padding: "6px 10px",
//                         fontSize: "11pt",
//                         borderRadius: "4px",
//                         border: "1px solid #ccc",
//                         background: "#f8f8f8",
//                         cursor: "pointer",
//                         marginBottom: "10px",
//                     }}
//                 >
//                     {showEntries ? "Verberg dagboek" : "Toon dagboek"}
//                 </button>

//                 {/* Show only dates when expanded */}
//                 {showEntries && (
//                     <div>
//                         {allEntries
//                             .slice()
//                             .sort((a, b) => new Date(b.createdate) - new Date(a.createdate))
//                             .map((item) => (
//                                 <div key={item.id}>
//                                     {/* Date clickable */}
//                                     <div
//                                         onClick={() =>
//                                             setExpandedEntryId(
//                                                 expandedEntryId === item.id ? null : item.id
//                                             )
//                                         }
//                                         style={{
//                                             cursor: "pointer",
//                                             color:
//                                                 expandedEntryId === item.id ? "#000000" : "black",
//                                             fontWeight:
//                                                 expandedEntryId === item.id ? "normal" : "normal",
//                                             marginBottom: "4px",
//                                         }}
//                                     >
//                                         {formatDate(item.createdate)}
//                                     </div>

//                                     {/* Content shown only if this date is expanded */}
//                                     {expandedEntryId === item.id && (
//                                         <div
//                                             style={{
//                                                 marginLeft: "15px",
//                                                 marginBottom: "6px",
//                                                 paddingBottom: "6px",
//                                                 borderBottom: "1px solid #eee",
//                                             }}
//                                         >
//                                             <div style={{ color: "#000000" }}>{item.myEntry}</div>
//                                             {item.aiEntry && (
//                                                 <div style={{ color: "#FF4F00" }}>
//                                                     {item.aiEntry}
//                                                 </div>
//                                             )}
//                                             {item.feedback && (
//                                                 <div
//                                                     style={{
//                                                         color: "grey",
//                                                         fontStyle: "italic",
//                                                         marginTop: "2px",
//                                                     }}
//                                                 >
//                                                     {item.feedback}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                     </div>
//                 )}
//             </div>

//         </div>
//     );
// }

// export default DutchLanguage_Dagboek;


import React, { useState, useEffect } from "react";
import { PiBookOpenTextBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DutchLanguage_Dagboek() {
    const [entry, setEntry] = useState("");
    const [feedback, setFeedback] = useState("");
    const [aiSentence, setAiSentence] = useState("");
    const [loading, setLoading] = useState(false);
    const [allEntries, setAllEntries] = useState([]);
    const [showEntries, setShowEntries] = useState(false);
    const [expandedEntryId, setExpandedEntryId] = useState(null);

    const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/diary";
    const AI_ENDPOINT = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

    useEffect(() => {
        fetchAllEntries();
    }, []);

    const fetchAllEntries = async () => {
        try {
            const res = await fetch(API_BASE);
            const data = await res.json();
            setAllEntries(Array.isArray(data) ? data : [data]);
        } catch (err) {
            console.error("Error fetching diary entries:", err);
            setAllEntries([]);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Onbekend datum";
        const d = new Date(dateString);
        if (isNaN(d)) return "Onbekend datum";

        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const hh = String(d.getHours()).padStart(2, "0");
        const min = String(d.getMinutes()).padStart(2, "0");

        return `${yyyy}.${mm}.${dd} @ ${hh}:${min}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!entry.trim()) return;

        setLoading(true);
        setFeedback("");
        setAiSentence("");

        try {
            const postRes = await fetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ myEntry: entry, aiEntry: "", feedback: "" }),
            });

            const saved = await postRes.json();
            const savedId = saved.id;

            const aiRes = await fetch(AI_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: `You are a Dutch language teacher. A student wrote: "${entry}". 
Please respond ONLY in raw JSON with keys "feedback" and "suggestedSentence".`,
                }),
            });

            const aiData = await aiRes.json();
            let aiText = aiData.answer || aiData.response || "";
            aiText = aiText.replace(/^Optional\[/, "").replace(/\]$/, "").replace(/```json|```/g, "").trim();

            let parsedFeedback = "";
            let parsedSentence = "";
            try {
                const parsed = JSON.parse(aiText);
                parsedFeedback = parsed.feedback || "";
                parsedSentence = parsed.suggestedSentence || "";
            } catch {
                parsedFeedback = aiText;
            }

            setFeedback(parsedFeedback);
            setAiSentence(parsedSentence);

            await fetch(`${API_BASE}/${savedId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback: parsedFeedback, aiEntry: parsedSentence }),
            });

            setEntry("");
            fetchAllEntries();
        } catch (err) {
            console.error(err);
            setFeedback("Er is een fout opgetreden.");
        } finally {
            setLoading(false);
        }
    };

    // 🧹 Delete entry
    const handleDelete = async (id) => {
        if (!window.confirm("Weet je zeker dat je dit dagboekitem wilt verwijderen?")) return;

        try {
            const res = await fetch(`${API_BASE}/${id}`, {
                method: "DELETE",
            });

            if (res.status === 204) {
                toast.success("Item succesvol verwijderd!", { position: "top-center", autoClose: 2000 });
                setAllEntries((prev) => prev.filter((e) => e.id !== id));
            } else {
                toast.error("Verwijderen mislukt.", { position: "top-center" });
            }
        } catch (err) {
            console.error("Error deleting entry:", err);
            toast.error("Fout bij verwijderen.", { position: "top-center" });
        }
    };

    const styles = {
        container: {
            border: "1px solid #FF4F00",
            borderRadius: "8px",
            padding: "16px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            maxWidth: "1100px",
            marginTop: "16px",
            marginBottom: "16px",
        },
        deleteIcon: {
            color: "#c0c0c0",
            marginLeft: "8px",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.container}>
            <ToastContainer />
            <h2 style={{ fontWeight: "bold", fontSize: "22px", margin: 0 }}>
                <PiBookOpenTextBold
                    style={{
                        color: "#FF4F00",
                        fontSize: "35px",
                        cursor: "pointer",
                        marginRight: "10px",
                    }}
                />
                Mijn Dagboek in het Nederlands
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Typ hier jouw dagboektekst..."
                    style={{
                        marginTop: "10px",
                        height: "40.5px",
                        width: "100%",
                        padding: "4px",
                        fontFamily: "Segoe UI",
                        fontSize: "12pt",
                        borderRadius: "4px",
                        border: "0.75px solid #777777",
                    }}
                />
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            height: "35.5px",
                            width: "75px",
                            border: "1px solid #FF4F00",
                            borderRadius: "4px",
                            backgroundColor: "#FFFFFF",
                            color: "#000000",
                            cursor: "pointer",
                            fontFamily: "Segoe UI",
                            fontSize: "16px",
                        }}
                    >
                        {loading ? "Bezig..." : "Verstuur"}
                    </button>
                </div>
            </form>

            {/* Toggle diary list */}
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => setShowEntries(!showEntries)}
                    style={{
                        fontFamily: "Segoe UI",
                        padding: "6px 10px",
                        fontSize: "11pt",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        background: "#f8f8f8",
                        cursor: "pointer",
                        marginBottom: "10px",
                    }}
                >
                    {showEntries ? "Verberg dagboek" : "Toon dagboek"}
                </button>

                {showEntries && (
                    <div>
                        {allEntries
                            .slice()
                            .sort((a, b) => new Date(b.createdate) - new Date(a.createdate))
                            .map((item) => (
                                <div key={item.id}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div
                                            onClick={() =>
                                                setExpandedEntryId(
                                                    expandedEntryId === item.id ? null : item.id
                                                )
                                            }
                                            style={{
                                                cursor: "pointer",
                                                color: "black",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            {formatDate(item.createdate)}
                                        </div>
                                        <FaTimes
                                            title="Delete"
                                            style={styles.deleteIcon}
                                            onClick={() => handleDelete(item.id)}
                                        />
                                    </div>

                                    {expandedEntryId === item.id && (
                                        <div
                                            style={{
                                                marginLeft: "15px",
                                                marginBottom: "6px",
                                                paddingBottom: "6px",
                                                borderBottom: "1px solid #eee",
                                            }}
                                        >
                                            <div style={{ color: "#000000" }}>{item.myEntry}</div>
                                            {item.aiEntry && (
                                                <div style={{ color: "#FF4F00" }}>{item.aiEntry}</div>
                                            )}
                                            {item.feedback && (
                                                <div
                                                    style={{
                                                        color: "grey",
                                                        fontStyle: "italic",
                                                        marginTop: "2px",
                                                    }}
                                                >
                                                    {item.feedback}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DutchLanguage_Dagboek;

