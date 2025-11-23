import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

export default function DutchLanguage_Chatbot_ScoreTrend() {
  const [allDays, setAllDays] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  const formatDate = (value) => {
    if (Array.isArray(value)) {
      const [year, month, day] = value;
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
    return new Date(value).toISOString().split("T")[0];
  };

  const buildChartData = (dayObj) => {
    return [
      { category: "Grammar", value: dayObj.Grammar },
      { category: "Vocabulary", value: dayObj.Vocabulary },
      { category: "Spelling", value: dayObj.Spelling },
      { category: "Comprehensibility", value: dayObj.Comprehensibility },
    ];
  };

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(
          "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/chatbot/averagescores"
        );
        const entries = await res.json();

        const grouped = {};
        entries.forEach((item) => {
          const dateKey = formatDate(item.date);
          if (!grouped[dateKey]) {
            grouped[dateKey] = {
              Grammar: [],
              Vocabulary: [],
              Spelling: [],
              Comprehensibility: [],
              dailyCount: 0,
            };
          }
          grouped[dateKey].Grammar.push(item.grammar);
          grouped[dateKey].Vocabulary.push(item.vocabulary);
          grouped[dateKey].Spelling.push(item.spelling);
          grouped[dateKey].Comprehensibility.push(item.comprehensibility);
          grouped[dateKey].dailyCount += item.dailyCount || 1;
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
              dailyCount: scores.dailyCount,
            };
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setAllDays(averaged);

        if (averaged.length > 0) {
          const last = averaged[averaged.length - 1];
          setSelectedDay(last);
          setChartData(buildChartData(last));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchScores();
  }, []);

  const handleSelect = (date) => {
    const found = allDays.find((d) => d.date === date);
    if (found) {
      setSelectedDay(found);
      setChartData(buildChartData(found));
    }
  };

  return (
    <div style={{ width: "100%", height: 100, marginTop: 10, marginBottom: 20 }}>
      {/* Dropdown + daily count */}


      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          barCategoryGap="10%"   // tighter spacing
          barGap={2}             // very small gap between bars
          margin={{ top: 0, bottom: 0, left: 3, right: 1 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis
            type="category"
            dataKey="category"
            width={0}           // hide axis label spacing
            tick={false}        // completely remove ticks
          />

          <XAxis
            type="number"
            domain={[0, 2]}
            ticks={[0, 1, 2]}
            tick={{ fontSize: 10 }}
          />

          {/* <Bar dataKey="value" barSize={28} fill="#82ca9d"> */}
            <Bar dataKey="value" barSize={28} fill="#FFF0E6"   stroke="#1a1212ff"  strokeWidth={0.2}>

            {/* CATEGORY NAME INSIDE LEFT OF BAR */}
            <LabelList
              dataKey="category"
              position="insideLeft"
              fill="#1a1212ff"
              fontSize={11}
            />

            {/* VALUE ON RIGHT END */}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v) => v.toFixed(2)}
              fontSize={11}
                            fill="#1a1212ff"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

            <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 10,
          gap: 10,
          marginLeft: 1,
        }}
      >
        <select
          onChange={(e) => handleSelect(e.target.value)}
          style={{
            padding: "1px 4px",
            borderRadius: "4px",
            fontSize: "11px",
            height: "20px",
          }}
        >
          {allDays.map((x) => (
            <option key={x.date} value={x.date}>
              {x.date}
            </option>
          ))}
        </select>

        {selectedDay && (
          <span style={{ fontSize: 12 }}>
            Dagelijkse vermeldingen: {selectedDay.dailyCount}
          </span>
        )}
      </div>
    </div>
  );
}
