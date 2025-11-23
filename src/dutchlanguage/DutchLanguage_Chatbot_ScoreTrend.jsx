// // // import React from "react";
// // // import {
// // //   LineChart,
// // //   Line,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   Legend,
// // //   ResponsiveContainer,
// // //   CartesianGrid,
// // // } from "recharts";

// // // export default function DutchLanguage_Chatbot_ScoreTrend({ entries }) {
// // //   // entries = array from DB: [{grammarScore, vocabularyScore, spellingScore, comprehensibilityScore, createdAtParsed}, ...]

// // //   // Prepare chart data
// // //   const data = entries
// // //     .sort((a, b) => new Date(a.createdAtParsed) - new Date(b.createdAtParsed))
// // //     .map((item, index) => ({
// // //       index: index + 1,
// // //       Grammar: item.grammarScore,
// // //       Vocabulary: item.vocabularyScore,
// // //       Spelling: item.spellingScore,
// // //       Comprehensibility: item.comprehensibilityScore,
// // //     }));

// // //   return (
// // //     <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
// // //       <h3 style={{ fontFamily: "Segoe UI", color: "#FF4F00" }}>
// // //         Trend van jouw scores
// // //       </h3>

// // //       <ResponsiveContainer width="100%" height="100%">
// // //         <LineChart data={data}>
// // //           <CartesianGrid strokeDasharray="3 3" />
// // //           <XAxis
// // //             dataKey="index"
// // //             label={{ value: "Oefening", position: "insideBottom", offset: -5 }}
// // //           />
// // //           <YAxis domain={[0, 5]} />
// // //           <Tooltip />
// // //           <Legend />

// // //           <Line type="monotone" dataKey="Grammar" stroke="#FF4F00" strokeWidth={2} />
// // //           <Line type="monotone" dataKey="Vocabulary" stroke="#0080FF" strokeWidth={2} />
// // //           <Line type="monotone" dataKey="Spelling" stroke="#00AA55" strokeWidth={2} />
// // //           <Line type="monotone" dataKey="Comprehensibility" stroke="#AA00AA" strokeWidth={2} />
// // //         </LineChart>
// // //       </ResponsiveContainer>
// // //     </div>
// // //   );
// // // }


// // import React from "react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   CartesianGrid,
// // } from "recharts";

// // export default function DutchLanguage_Chatbot_ScoreTrend({ entries }) {
// //   // 🟧 Dummy fallback data for UI testing
// //   const dummyData = [
// //     { grammarScore: 1, vocabularyScore: 2, spellingScore: 1, comprehensibilityScore: 2, createdAtParsed: "2025-01-01" },
// //     { grammarScore: 2, vocabularyScore: 3, spellingScore: 2, comprehensibilityScore: 3, createdAtParsed: "2025-01-02" },
// //     { grammarScore: 3, vocabularyScore: 2, spellingScore: 3, comprehensibilityScore: 2, createdAtParsed: "2025-01-03" },
// //     { grammarScore: 4, vocabularyScore: 4, spellingScore: 3, comprehensibilityScore: 4, createdAtParsed: "2025-01-04" },
// //     { grammarScore: 3, vocabularyScore: 4, spellingScore: 4, comprehensibilityScore: 3, createdAtParsed: "2025-01-05" },
// //     { grammarScore: 5, vocabularyScore: 5, spellingScore: 4, comprehensibilityScore: 5, createdAtParsed: "2025-01-06" },
// //     { grammarScore: 4, vocabularyScore: 3, spellingScore: 4, comprehensibilityScore: 4, createdAtParsed: "2025-01-07" },
// //     { grammarScore: 5, vocabularyScore: 4, spellingScore: 5, comprehensibilityScore: 5, createdAtParsed: "2025-01-08" },
// //   ];

// //   // 🟧 Use real data if available, otherwise use dummy data
// //   const source = entries && entries.length > 0 ? entries : dummyData;

// //   // Prepare chart data
// //   const data = source
// //     .sort((a, b) => new Date(a.createdAtParsed) - new Date(b.createdAtParsed))
// //     .map((item, index) => ({
// //       index: index + 1,
// //       Grammar: item.grammarScore,
// //       Vocabulary: item.vocabularyScore,
// //       Spelling: item.spellingScore,
// //       Comprehensibility: item.comprehensibilityScore,
// //     }));

// //   return (
// //     <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
// //       <h3 style={{ fontFamily: "Segoe UI", color: "#FF4F00" }}>
// //         Trend van jouw scores
// //       </h3>

// //       <ResponsiveContainer width="100%" height="100%">
// //         <LineChart data={data}>
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis
// //             dataKey="index"
// //             label={{ value: "Oefening", position: "insideBottom", offset: -5 }}
// //           />
// //           <YAxis domain={[0, 5]} />
// //           <Tooltip />
// //           <Legend />

// //           <Line type="monotone" dataKey="Grammar" stroke="#FF4F00" strokeWidth={2} />
// //           <Line type="monotone" dataKey="Vocabulary" stroke="#0080FF" strokeWidth={2} />
// //           <Line type="monotone" dataKey="Spelling" stroke="#00AA55" strokeWidth={2} />
// //           <Line type="monotone" dataKey="Comprehensibility" stroke="#AA00AA" strokeWidth={2} />
// //         </LineChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // }

// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from "recharts";

// export default function DutchLanguage_Chatbot_ScoreTrend({ entries }) {
//   // Convert date (string or Date or timestamp) to "YYYY-MM-DD"
//   const toDateKey = (value) => {
//     const d = new Date(value);
//     return d.toISOString().split("T")[0];
//   };

//   // Use real data or empty array
//   const source = Array.isArray(entries) ? entries : [];

//   // --- GROUP BY DATE ---
//   const grouped = {}; // { "2025-01-02": { Grammar: [...], Vocabulary: [...], ... }}

//   source.forEach((item) => {
//     const dateKey = toDateKey(item.createdAtParsed);

//     if (!grouped[dateKey]) {
//       grouped[dateKey] = {
//         Grammar: [],
//         Vocabulary: [],
//         Spelling: [],
//         Comprehensibility: [],
//       };
//     }

//     grouped[dateKey].Grammar.push(item.grammarScore);
//     grouped[dateKey].Vocabulary.push(item.vocabularyScore);
//     grouped[dateKey].Spelling.push(item.spellingScore);
//     grouped[dateKey].Comprehensibility.push(item.comprehensibilityScore);
//   });

//   // --- COMPUTE DAILY AVERAGES ---
//   const averaged = Object.entries(grouped).map(([date, scores]) => {
//     const avg = (arr) =>
//       arr.length ? arr.reduce((a, b) => a + b) / arr.length : 0;

//     return {
//       date,
//       Grammar: avg(scores.Grammar),
//       Vocabulary: avg(scores.Vocabulary),
//       Spelling: avg(scores.Spelling),
//       Comprehensibility: avg(scores.Comprehensibility),
//     };
//   });

//   // --- SORT + GET LAST 7 DAYS ---
//   const data = averaged
//     .sort((a, b) => new Date(a.date) - new Date(b.date))
//     .slice(-7);

//   return (
//     <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
//       <h3 style={{ fontFamily: "Segoe UI", color: "#FF4F00" }}>
//         Dagelijkse Gemiddelde Scores
//       </h3>

//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis domain={[0, 5]} />
//           <Tooltip />
//           <Legend />

//           <Bar dataKey="Grammar" stackId="a" fill="#FF4F00" />
//           <Bar dataKey="Vocabulary" stackId="a" fill="#0080FF" />
//           <Bar dataKey="Spelling" stackId="a" fill="#00AA55" />
//           <Bar dataKey="Comprehensibility" stackId="a" fill="#AA00AA" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DutchLanguage_Chatbot_ScoreTrend() {
  const [data, setData] = useState([]);

  // Convert date array [YYYY, MM, DD] to "YYYY-MM-DD"
  const formatDate = (value) => {
    if (Array.isArray(value)) {
      const [year, month, day] = value;
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
    return new Date(value).toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(
          "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/chatbot/averagescores"
        );
        const entries = await res.json();

        // Group by date and compute averages
        const grouped = {};
        entries.forEach((item) => {
          const dateKey = formatDate(item.date);
          if (!grouped[dateKey]) {
            grouped[dateKey] = { Grammar: [], Vocabulary: [], Spelling: [], Comprehensibility: [] };
          }
          grouped[dateKey].Grammar.push(item.grammar);
          grouped[dateKey].Vocabulary.push(item.vocabulary);
          grouped[dateKey].Spelling.push(item.spelling);
          grouped[dateKey].Comprehensibility.push(item.comprehensibility);
        });

        const averaged = Object.entries(grouped)
          .map(([date, scores]) => {
            const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
            return {
              date,
              Grammar: avg(scores.Grammar),
              Vocabulary: avg(scores.Vocabulary),
              Spelling: avg(scores.Spelling),
              Comprehensibility: avg(scores.Comprehensibility),
            };
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(-7);

        setData(averaged);
      } catch (err) {
        console.error("Failed to fetch scores:", err);
      }
    };

    fetchScores();
  }, []);

  return (
    <div style={{ width: "100%", height: 300, marginTop: 20 }}>
      {/* <h3 style={{ fontFamily: "Segoe UI", color: "#FF4F00" }}>Dagelijkse Gemiddelde Scores</h3> */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Grammar" stackId="a" fill="#FF4F00" />
          <Bar dataKey="Vocabulary" stackId="a" fill="#0080FF" />
          <Bar dataKey="Spelling" stackId="a" fill="#00AA55" />
          <Bar dataKey="Comprehensibility" stackId="a" fill="#AA00AA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
