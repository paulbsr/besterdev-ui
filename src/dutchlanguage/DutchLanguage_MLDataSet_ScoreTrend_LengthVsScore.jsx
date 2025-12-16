import React, { useEffect, useState, useContext, useRef } from "react";
import { RefreshContext } from "./RefreshContext";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    LabelList,
    ReferenceArea
} from "recharts";
import axios from "axios";
import { RiNumbersFill } from "react-icons/ri";
import { ImTextWidth } from "react-icons/im";

const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/daily-average-score";

export default function MultiAxis_LengthVsScore_Enhanced() {
    const [data, setData] = useState([]);
    const [showWordCount, setShowWordCount] = useState(true);
    const [showScore, setShowScore] = useState(true);
    const { refreshKey } = useContext(RefreshContext);
    const chartRef = useRef(null);

    // Fetch data
    const fetchDailyCounts = () => {
        axios
            .get(API_URL)
            .then((res) => setData(res.data))
            .catch((err) => console.error("Error loading ML dataset:", err));
    };

    useEffect(() => { fetchDailyCounts(); }, [refreshKey]);
    useEffect(() => { fetchDailyCounts(); }, []);

    // Export CSV
    const exportCSV = () => {
        const headers = "date,averageWordcount,averageScore,count\n";
        const rows = data
            .map(
                (d) =>
                    `${d.date},${d.averageWordcount},${d.averageScore},${d.count}`
            )
            .join("\n");

        const blob = new Blob([headers + rows], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "length_vs_score.csv";
        a.click();
    };

    // Export PNG
    const exportPNG = () => {
        const svg = chartRef.current.container.children[0].innerHTML;
        const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "chart.png";
        a.click();
    };

    return (
        <div
            style={{
                width: "100%",
                height: 300,
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
            ><ImTextWidth size={27} color="#FF4F00" />Correlation between Sentence Length and Score</h2>

            {/* Controls */}
            <div style={{ marginBottom: "10px" }}>
                <label style={{ marginRight: "10px" }}>
                    <input
                        type="checkbox"
                        checked={showWordCount}
                        onChange={() => setShowWordCount(!showWordCount)}
                        style={{ accentColor: "#FF4F00" }}
                    />{" "}
                    Word Count
                </label>

                <label style={{ marginRight: "10px" }}>
                    <input
                        type="checkbox"
                        checked={showScore}
                        onChange={() => setShowScore(!showScore)}
                        style={{ accentColor: "#FF4F00" }}
                    />{" "}
                    Score
                </label>

                {/* <button onClick={exportCSV} style={{ marginRight: "10px" }}>
                    Export CSV
                </button>
                <button onClick={exportPNG}>Export PNG</button> */}
            </div>

            <ResponsiveContainer>
                <LineChart
                    ref={chartRef}
                    data={data}
                    margin={{ top: 20, right: 1, bottom: 70, left: 1 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#333" }} />

                    <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 1, fill: "#ffffff" }}
                    />

                    <YAxis
                        tick={{ fontSize: 1, fill: "#ffffff" }}
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 10]}
                    />

                    <ReferenceArea
                        yAxisId="left"
                        x1={data[0]?.date}
                        x2={data[data.length - 1]?.date}
                        y1={7}
                        y2={20}
                        fill="#ffcccc"
                        fillOpacity={0.2}
                    />

                    <Tooltip
                        content={({ active, payload }) =>
                            active && payload?.length ? (
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
                                    <br />Avg Word Count: {Math.round(payload[0].payload.averageWordcount)}
                                    <br />Score: <strong>{(payload[0].payload.averageScore / 5 * 100).toFixed(0)}%</strong>
                                    <br />Submissions: {payload[0].payload.count}
                                </div>
                            ) : null
                        }
                    />

                    <Legend />

                    {/* Word Count line */}
                    {showWordCount && (
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="averageWordcount"
                            stroke="#581f05ff"
                            strokeWidth={2}
                            name="Avg Word Count"
                        >
                            <LabelList
                                fontFamily="Segoe UI"
                                dataKey="averageWordcount"
                                position="top"
                                fontSize={14}
                                offset={10}
                                fill="#000000"
                                formatter={(value) => Math.round(value)}
                            />
                        </Line>
                    )}

                    {/* Score line */}
                    {showScore && (
                        <Line
                            yAxisId="right"
                            dataKey="averageScore"
                            type="monotone"
                            stroke="#FF4F00"
                            strokeWidth={2}
                            name="Avg Score"
                            dot={(props) => {
                                const { cx, cy } = props;
                                return (
                                    <circle
                                        cx={cx}
                                        cy={cy}
                                        r={4}
                                        fill="#FF4F00"
                                        stroke="#FF4F00"
                                    />
                                );
                            }}
                        >
                            <LabelList
                                dataKey="averageScore"
                                position="bottom"
                                fontSize={14}
                                offset={10}
                                fontFamily="Segoe UI"
                                color="#000000"
                                fill="#FF4F00"
                                formatter={(value) => `${Math.round((value / 5) * 100)}%`}
                            />
                        </Line>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
