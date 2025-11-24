import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
      {/* <h3 style={{ fontFamily: "Segoe UI", marginBottom: "1px" }}>
        Daily Average Score Trend
      </h3> */}

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 2, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 9 }} />
          <YAxis
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            tick={{ fontSize: 9 }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="averageScore"
            stroke="#FF4F00"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DutchLanguage_Dagboek_ScoreTrend;
