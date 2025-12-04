// import React, { useEffect, useState } from "react";
// import { TbTargetArrow } from "react-icons/tb";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
//   LabelList
// } from "recharts";

// const DutchLanguage_MLDataSet_ScoreTrend_Accuracy = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/daily-average-score")
//       .then((res) => res.json())
//       .then((json) => {
//         const formatted = json.map((item) => ({
//           ...item,
//           averageScore: parseFloat(item.averageScore.toFixed(1)),
//         }));
//         setData(formatted);
//       })
//       .catch((err) => console.error("Error fetching trend data:", err));
//   }, []);

//   // Custom tooltip to display count and averageScore
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div
//           style={{
//             backgroundColor: "#fff",
//             border: "1px solid #ccc",
//             padding: "8px",
//             borderRadius: "4px",
//             fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
//             fontSize: "12px",
//           }}
//         >
//           <p style={{ margin: 0 }}><strong>Date:</strong> {label}</p>
//           <p style={{ margin: 0 }}><strong>Entries:</strong> {payload[0].payload.count}</p>
//           <p style={{ margin: 0 }}><strong>Average Score:</strong> {payload[0].value}</p>
//           <p style={{ margin: 0 }}><strong>Average Word Count:</strong> {payload[0].payload.averageWordcount}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: 200,
//         marginBottom: 16,
//         border: "1px solid #FF4F00",
//         borderRadius: "8px",
//         padding: "10px",
//         boxSizing: "border-box",
//       }}
//     >
//       <h2
//         style={{
//           margin: 0,
//           marginBottom: 10,
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//         }}
//       >
//         <TbTargetArrow size={30} color="#FF4F00" />
//         Daily Accuracy (scores used by ML for predictive learning)
//       </h2>

//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" tick={{ fontSize: 9 }} padding={{ left: 20 }} interval="preserveStartEnd" />
//           <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fontSize: 10 }} />

//           {/* Horizontal dashed lines */}
//           <ReferenceLine y={1} stroke="#999" strokeDasharray="3 3" />
//           <ReferenceLine y={2} stroke="#999" strokeDasharray="3 3" />
//           <ReferenceLine y={3} stroke="#999" strokeDasharray="1 1" />
//           <ReferenceLine y={4} stroke="#999" strokeDasharray="1 1" />
//           <ReferenceLine y={5} stroke="#999" strokeDasharray="1 1" />

//           <Tooltip content={<CustomTooltip />} />

//           <Line
//             type="monotone"
//             dataKey="averageScore"
//             stroke="#FF4F00"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             strokeDasharray="5 0"
//           >
//             <LabelList
//               dataKey="averageScore"
//               position="top"
//               fontSize={11}        
//               offset={12}          
//               formatter={(value) => value.toFixed(1)}
//               fill="#1a1212ff"
//             />
//           </Line>
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default DutchLanguage_MLDataSet_ScoreTrend_Accuracy;


import React, { useEffect, useState } from "react";
import { TbTargetArrow } from "react-icons/tb";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList
} from "recharts";

const DutchLanguage_MLDataSet_ScoreTrend_Accuracy = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/daily-average-score")
      .then((res) => res.json())
      .then((json) => {
        const formatted = json.map((item) => ({
          ...item,
          // Convert score from 0–5 to percentage (0–100)
          averageScore: parseFloat((item.averageScore * 20).toFixed(1)),
          averageWordcount: Math.round(item.averageWordcount),
        }));
        setData(formatted);
      })
      .catch((err) => console.error("Error fetching trend data:", err));
  }, []);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "4px",
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            fontSize: "12px",
          }}
        >
          <p style={{ margin: 0 }}><strong>Date:</strong> {label}</p>
          <p style={{ margin: 0 }}><strong>Entries:</strong> {p.count}</p>
          <p style={{ margin: 0 }}><strong>Accuracy:</strong> {p.averageScore}%</p>
          <p style={{ margin: 0 }}><strong>Avg Word Count:</strong> {p.averageWordcount}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        width: "100%",
        height: 250,
        marginBottom: 16,
        border: "1px solid #FF4F00",
        borderRadius: "8px",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <TbTargetArrow size={30} color="#FF4F00" />
        Daily Accuracy (scores used by ML for predictive learning)
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 9 }}
            padding={{ left: 20 }}
            interval="preserveStartEnd"
          />

          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={{ fontSize: 10 }}
            tickFormatter={(v) => `${v}%`}
          />

          {/* Horizontal dashed reference lines */}
          <ReferenceLine y={20} stroke="#999" strokeDasharray="3 3" />
          <ReferenceLine y={40} stroke="#999" strokeDasharray="3 3" />
          <ReferenceLine y={60} stroke="#999" strokeDasharray="1 1" />
          <ReferenceLine y={80} stroke="#999" strokeDasharray="1 1" />
          <ReferenceLine y={100} stroke="#999" strokeDasharray="1 1" />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="averageScore"
            stroke="#FF4F00"
            strokeWidth={2}
            dot={{ r: 4 }}
            strokeDasharray="5 0"
          >
            <LabelList
              dataKey="averageScore"
              position="top"
              fontSize={11}
              offset={12}
              formatter={(value) => `${value}%`}
              fill="#1a1212ff"
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DutchLanguage_MLDataSet_ScoreTrend_Accuracy;
