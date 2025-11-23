import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

export default function DutchLanguage_Chatbot_ScoreTrend() {
  const [data, setData] = useState([]);
  const [allDays, setAllDays] = useState([]);

  // Convert date array [YYYY, MM, DD] → "YYYY-MM-DD"
  const formatDate = (value) => {
    if (Array.isArray(value)) {
      const [year, month, day] = value;
      return `${year}-${String(month).padStart(2, "0")}-${String(day)
        .padStart(2, "0")}`;
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

        // Group data by date
        const grouped = {};
        entries.forEach((item) => {
          const dateKey = formatDate(item.date);
          if (!grouped[dateKey]) {
            grouped[dateKey] = {
              Grammar: [],
              Vocabulary: [],
              Spelling: [],
              Comprehensibility: [],
            };
          }
          grouped[dateKey].Grammar.push(item.grammar);
          grouped[dateKey].Vocabulary.push(item.vocabulary);
          grouped[dateKey].Spelling.push(item.spelling);
          grouped[dateKey].Comprehensibility.push(item.comprehensibility);
        });

        // Compute averages
        const averaged = Object.entries(grouped)
          .map(([date, scores]) => {
            const avg = (arr) =>
              arr.length
                ? arr.reduce((a, b) => a + b, 0) / arr.length
                : 0;
            return {
              date,
              Grammar: avg(scores.Grammar),
              Vocabulary: avg(scores.Vocabulary),
              Spelling: avg(scores.Spelling),
              Comprehensibility: avg(scores.Comprehensibility),
            };
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setAllDays(averaged);

        if (averaged.length > 0) {
          setData([averaged[averaged.length - 1]]);
        }
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchScores();
  }, []);

  // Custom vertical LABEL for the category name
  const VerticalCategoryLabel = ({ x, y, width, height, label }) => {
    const cx = x + width / 2;
    const cy = y + height / 2;

    return (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fontSize={12}
        fill="#333"
        transform={`rotate(-90, ${cx}, ${cy})`}
      >
        {label}
      </text>
    );
  };

  return (
    <div style={{ width: "100%", height: 340, marginTop: 20 }}>
      {/* Dropdown */}
      <select
        onChange={(e) => {
          const selected = allDays.find((x) => x.date === e.target.value);
          if (selected) setData([selected]);
        }}
        style={{
          padding: "6px",
          marginBottom: "10px",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
        {allDays.map((x) => (
          <option key={x.date} value={x.date}>
            {x.date}
          </option>
        ))}
      </select>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* Remove bottom date labels */}
          <XAxis dataKey="date" tick={false} axisLine={false} />

          <YAxis domain={[0, 2]} ticks={[0, 1, 2]} tick={{ fontSize: 10 }} />

          {/* <Legend wrapperStyle={{ fontSize: 10 }} /> */}

          {/* Bars with:
              - Score values inside the top
              - Vertical category names inside bars */}
          <Bar dataKey="Grammar" fill="#ffb3b3">
            <LabelList
              content={(props) => (
                <VerticalCategoryLabel {...props} label="Grammar" />
              )}
            />
            <LabelList
              dataKey="Grammar"
              position="insideTop"
              formatter={(v) => v.toFixed(2)}
              fontSize={12}
            />
          </Bar>

          <Bar dataKey="Vocabulary" fill="#b3d9ff">
            <LabelList
              content={(props) => (
                <VerticalCategoryLabel {...props} label="Vocabulary" />
              )}
            />
            <LabelList
              dataKey="Vocabulary"
              position="insideTop"
              formatter={(v) => v.toFixed(2)}
              fontSize={12}
            />
          </Bar>

          <Bar dataKey="Spelling" fill="#c2f0c2">
            <LabelList
              content={(props) => (
                <VerticalCategoryLabel {...props} label="Spelling" />
              )}
            />
            <LabelList
              dataKey="Spelling"
              position="insideTop"
              formatter={(v) => v.toFixed(2)}
              fontSize={12}
            />
          </Bar>

          <Bar dataKey="Comprehensibility" fill="#e6b3ff">
            <LabelList
              content={(props) => (
                <VerticalCategoryLabel {...props} label="Comprehensibility" />
              )}
            />
            <LabelList
              dataKey="Comprehensibility"
              position="insideTop"
              formatter={(v) => v.toFixed(2)}
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
