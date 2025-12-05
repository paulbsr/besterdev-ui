import React, { useEffect, useState, useContext } from "react";
import { RefreshContext } from "./RefreshContext";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
    LabelList,
} from "recharts";

import { SiPagespeedinsights } from "react-icons/si";


export default function DutchLanguage_MLDataSet_ScoreTrend_Scores() {
    const [chartData, setChartData] = useState([]);
    const { refreshKey } = useContext(RefreshContext);

    const buildChartData = (obj) => {
        return [
            { category: "Word Order", value: obj.avgWordorder },
            { category: "Grammar", value: obj.avgGrammar },
            { category: "Vocabulary", value: obj.avgVocabulary },
            { category: "Spelling", value: obj.avgSpelling },
            { category: "Comprehensibility", value: obj.avgComprehensibility },
            { category: "Nouns", value: obj.avgNoun },
            { category: "Articles", value: obj.avgArticle },
        ];
    };

    // ✅ MOVE THIS OUTSIDE useEffect
    const fetchGlobalAverages = async () => {
        try {
            const res = await fetch(
                "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/global-averages"
            );
            const data = await res.json();
            setChartData(buildChartData(data));
        } catch (err) {
            console.error(err);
        }
    };

    // load on component mount
    useEffect(() => {
        fetchGlobalAverages();
    }, []);

    // reload when refreshKey changes
    useEffect(() => {
        fetchGlobalAverages();
    }, [refreshKey]);


    return (
        <div
            style={{
                width: "100%",
                height: 200,
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
            ><SiPagespeedinsights size={30} color="#FF4F00" />Score Insight</h2>


            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" barCategoryGap="10%" barGap={2}
                    margin={{ top: 1, bottom: 30, left: 45, right: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <YAxis
                        type="category"
                        dataKey="category"
                        width={0}
                        tick={false}
                    />

                    <XAxis
                        type="number"
                        domain={[0, 5]}
                        ticks={[0, 1, 2, 3, 4, 5]}
                        tick={{ fontSize: 10 }}
                    />

                    <Bar dataKey="value" barSize={28} fill="#FFE0CC">
                        <LabelList
                            dataKey="category"
                            position="insideLeft"
                            fill="#2b2121ff"
                            fontSize={11}
                        />
                        <LabelList
                            dataKey="value"
                            formatter={(v) => v.toFixed(2)}
                            position="right"
                            fontSize={11}
                            fill="#1a1212"
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
