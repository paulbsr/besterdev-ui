import React, { useEffect, useState, useRef } from "react";
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
import { Bold } from "lucide-react";

const API_URL =
    "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/daily-average-score";

export default function MultiAxis_LengthVsScore_Enhanced() {
    const [data, setData] = useState([]);
    const [showWordCount, setShowWordCount] = useState(true);
    const [showScore, setShowScore] = useState(true);
    const [showRegression, setShowRegression] = useState(true);

    const chartRef = useRef(null);

    // ----------------------------------------------------------
    // Fetch Dataset
    // ----------------------------------------------------------
    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => setData(res.data))
            .catch((err) => console.error("Error loading ML dataset:", err));
    }, []);

    // ----------------------------------------------------------
    // Regression Line Calculator
    // ----------------------------------------------------------
    const calculateRegression = (points, xKey, yKey) => {
        if (!points.length) return [];

        const n = points.length;
        const sumX = points.reduce((s, p) => s + p[xKey], 0);
        const sumY = points.reduce((s, p) => s + p[yKey], 0);
        const sumXY = points.reduce((s, p) => s + p[xKey] * p[yKey], 0);
        const sumX2 = points.reduce((s, p) => s + p[xKey] * p[xKey], 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = sumY / n - (slope * sumX) / n;

        const xs = points.map((p) => p[xKey]);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);

        return [
            { date: points[0].date, value: slope * minX + intercept },
            { date: points[n - 1].date, value: slope * maxX + intercept }
        ];
    };

    const regressionWordCount = calculateRegression(data, "averageWordcount", "averageWordcount");
    const regressionScore = calculateRegression(data, "averageWordcount", "averageScore");

    // ----------------------------------------------------------
    // Export CSV
    // ----------------------------------------------------------
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

    // ----------------------------------------------------------
    // Export PNG
    // ----------------------------------------------------------
    const exportPNG = () => {
        const svg = chartRef.current.container.children[0].innerHTML;
        const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "chart.png";
        a.click();
    };

    // ----------------------------------------------------------
    // Dynamic Score Color
    // ----------------------------------------------------------
    const scoreColor = (d) => {
        const expected = 5 - d.averageWordcount * 0.25; // simple heuristic
        return d.averageScore < expected ? "#f44336" : "#8884d8";
    };

    return (
        // <div style={{ width: "100%", height: 420 }}>

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
            ><RiNumbersFill size={30} color="#FF4F00" />Correlation between Sentence Length and Score</h2>

            {/* Controls */}
            <div style={{ marginBottom: "10px" }}>
                <label style={{ marginRight: "10px" }}>
                    <input
                        type="checkbox"
                        checked={showWordCount}
                        onChange={() => setShowWordCount(!showWordCount)}
                    />{" "}
                    Word Count
                </label>

                <label style={{ marginRight: "10px" }}>
                    <input
                        type="checkbox"
                        checked={showScore}
                        onChange={() => setShowScore(!showScore)}
                    />{" "}
                    Score
                </label>

                <label style={{ marginRight: "20px" }}>
                    <input
                        type="checkbox"
                        checked={showRegression}
                        onChange={() => setShowRegression(!showRegression)}
                    />{" "}
                    Regression Lines
                </label>

                <button onClick={exportCSV} style={{ marginRight: "10px" }}>
                    Export CSV
                </button>
                <button onClick={exportPNG}>Export PNG</button>
            </div>

            <ResponsiveContainer>
                <LineChart
                    ref={chartRef}
                    data={data}
                    margin={{ top: 20, right: 1, bottom: 70, left: 1 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* X-axis = date */}
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#333" }} />

                    {/* Left axis (Word Count) */}
                    <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 1, fill: "#ffffff" }}
                    // tick={{ fontSize: 10, fill: "#333" }}
                    // label={{value: "Average Word Count", angle: -90, position: "insideLeft" }}
                    />

                    {/* Right axis (Score) */}
                    <YAxis
                        tick={{ fontSize: 1, fill: "#ffffff" }}
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 10]}
                    // label={{ value: "Average Score", angle: -90, position: "insideRight"}}
                    />

                    {/* Threshold band — highlight when Average Word Count > 7 */}
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
                        content={({ active, payload, label }) =>
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
                                    <br />Score: {(payload[0].payload.averageScore / 5 * 100).toFixed(0)}%
                                    <br />Submissions: {payload[0].payload.count}
                                </div>
                            ) : null
                        }
                    />
                    <Legend />

                    {/* Main Word Count line */}
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
                                fontFamily="Segoe UI" // set font family
                                dataKey="averageWordcount"
                                position="top"
                                fontSize={12}      // ← add this line to change size
                                offset={10}         // optional: space above the dot
                                formatter={(value) => Math.round(value)} // ← ensures integers
                            />

                        </Line>
                    )}

                    {showScore && (
                        <Line
                            yAxisId="right"
                            dataKey="averageScore"
                            type="monotone"
                            stroke="#FF4F00"
                            strokeWidth={2}
                            name="Avg Score"
                            fontSize={20}
                            dot={(props) => {
                                const { cx, cy, payload } = props;
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
                                fontSize={12}
                                offset={10}
                                formatter={(value) => `${value}/5.0`} // <-- adds "/5.0" to the value
                            />
                        </Line>
                    )}

                    {/* Regression Lines */}
                    {showRegression && (
                        <>
                            {/* Word Count Regression */}
                            <Line
                                yAxisId="left"
                                type="linear"
                                data={[
                                    { date: regressionWordCount[0]?.date, value: regressionWordCount[0]?.value },
                                    { date: regressionWordCount[1]?.date, value: regressionWordCount[1]?.value }
                                ]}
                                dataKey="value"
                                stroke="#4caf50"
                                strokeDasharray="4 4"
                                dot={false}
                                name="WC Trend"
                            />

                            {/* Score Regression */}
                            <Line
                                yAxisId="right"
                                type="linear"
                                data={[
                                    { date: regressionScore[0]?.date, value: regressionScore[0]?.value },
                                    { date: regressionScore[1]?.date, value: regressionScore[1]?.value }
                                ]}
                                dataKey="value"
                                stroke="#ff5722"
                                strokeDasharray="4 4"
                                dot={false}
                                name="Score Trend"
                            />
                        </>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
