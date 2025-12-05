import React, { useEffect, useState, useContext } from "react";
import { RefreshContext } from "./RefreshContext";
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

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/daily-average-score";

const DutchLanguage_MLDataSet_ScoreTrend_Accuracy = () => {
  const [data, setData] = useState([]);
  const { refreshKey } = useContext(RefreshContext);

  // -----------------------
  //  FETCH FUNCTION (Fix)
  // -----------------------
  const fetchChartData = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        const formatted = json.map((item) => ({
          ...item,
          averageScore: parseFloat((item.averageScore * 20).toFixed(1)),
          averageWordcount: Math.round(item.averageWordcount),
        }));
        setData(formatted);
      })
      .catch((err) => console.error("Error fetching trend data:", err));
  };

  // Load on first mount
  useEffect(() => {
    fetchChartData();
  }, []);

  // Refresh when refreshKey changes
  useEffect(() => {
    fetchChartData();
  }, [refreshKey]);

  // -----------------------
  // Custom Tooltip
  // -----------------------
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div
          style={{
            background: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontFamily: "Segoe UI",
            fontSize: "12px",
          }}
        >
          <p>Accuracy: <strong>{p.averageScore}%</strong></p>
          <p>Avg Word Count: {p.averageWordcount}</p>
          <p>Submissions: {p.count}</p>
          <p>Date: {label}</p>

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
        Daily Accuracy
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
