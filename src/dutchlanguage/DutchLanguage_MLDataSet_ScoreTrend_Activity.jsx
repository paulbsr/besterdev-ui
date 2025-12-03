import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";

import { RiNumbersFill } from "react-icons/ri";

export default function DailyCountVerticalBarchart() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDailyCounts = async () => {
            try {
                const response = await fetch(
                    "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/daily-average-score"
                );
                const json = await response.json();

                const mapped = json.map((item) => {
                    const d = new Date(item.date);
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, "0");
                    const day = String(d.getDate()).padStart(2, "0");

                    return {
                        date: `${year}-${month}-${day}`, // 2025-MM-DD
                        count: item.count,
                    };
                });

                setData(mapped);
            } catch (err) {
                console.error("Error fetching daily counts:", err);
            }
        };

        fetchDailyCounts();
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: 220,
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
                <RiNumbersFill size={30} color="#FF4F00" />
                Daily Activity
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10 }}
                        textAnchor="middle"
                        height={50}
                    />

                    <YAxis tick={{ fontSize: 10 }} />

                    <Bar
                        dataKey="count"
                        fill="#FF4F00"
                        barSize={20}
                        radius={[4, 4, 0, 0]}
                    >
                        <LabelList
                            dataKey="count"
                            position="top"
                            fontSize={11}
                            fill="#1a1212"
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}