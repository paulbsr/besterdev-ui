import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const DutchLanguage_Dagboek_ScoreTrend = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/diary/daily-average-score")
      .then((res) => res.json())
      .then((json) => {
        // Ensure one decimal place for averageScore
        const formatted = json.map((item) => ({
          ...item,
          averageScore: parseFloat(item.averageScore.toFixed(1)),
        }));
        setData(formatted);
      })
      .catch((err) => console.error("Error fetching trend data:", err));
  }, []);

  return (
    <div style={{ width: "100%", height: 150 }}>

<ResponsiveContainer width="100%" height="100%">
  <LineChart data={data} margin={{ top: 20, right: 30, left: 2, bottom: 10 }}>
    <CartesianGrid strokeDasharray="5 5" />
    <XAxis dataKey="date" tick={{ fontSize: 9 }} />
    <YAxis
      domain={[0, 5]}
      ticks={[0, 1, 2, 3, 4, 5]}
      tick={{ fontSize: 9 }}
    />
    <Tooltip />

    {/* Horizontal dashed lines */}
    <ReferenceLine y={1} stroke="#999" strokeDasharray="1 1" />
    <ReferenceLine y={2} stroke="#999" strokeDasharray="1 1" />
    <ReferenceLine y={3} stroke="#999" strokeDasharray="1 1" />
    <ReferenceLine y={4} stroke="#999" strokeDasharray="1 1" />
    <ReferenceLine y={5} stroke="#999" strokeDasharray="1 1" />
    <Line
      type="monotone"
      dataKey="averageScore"
      stroke="#FF4F00"
      strokeWidth={2}
      dot={{ r: 3 }}
      strokeDasharray="1 1"
    />
  </LineChart>
</ResponsiveContainer>

    </div>
  );
};

export default DutchLanguage_Dagboek_ScoreTrend;
