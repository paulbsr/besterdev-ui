import { useState, useEffect, React } from 'react';
import { Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import '../Fonts.css'


export default function DutchLanguage_Ticker() {
  const [sentences, setSentences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDutchSentences = async () => {
      try {

        const res = await OAuth2APIClient.post("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
          {
            question: "Act like a Dutch language high school teacher and generate 8 complex Dutch language sentences on any topic. Just provide them as natural Dutch. No introductions."
          },
          {
            headers: { "Content-Type": "application/json" }
          }
        );

        const data = res.data;

        let cleaned = (data.answer || "")
          .replace(/optional/i, "")
          .replace(/[\[\]]/g, "")
          .replace(/Sure!.*translations:?/i, "")
          // 🔴 remove numbered list prefixes
          .replace(/^\s*\d+[\.\)\-]\s*/gm, "")
          .trim();

        // Split into sentences (assuming they come separated by newlines or periods)
        const splitSentences = cleaned
          .split(/[\n.]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        setSentences(splitSentences);
      } catch (err) {
        console.error("Error fetching Dutch sentences:", err);
      }
    };

    fetchDutchSentences();
  }, []);

  return (
    <>
      {sentences.length > 0 ? (
        <marquee scrollamount="5">
          <Stack direction="row">
            {sentences.map((sentence, index) => (
              <div className="ticker" key={index}>
                <span
                  style={{
                    fontFamily: "Segoe UI",
                    fontSize: "18px",
                    fontStyle: "italic",
                    color: "#FF4F00",
                    cursor: "pointer",
                  }}
                >
                  {sentence}
                </span>
              </div>
            ))}
          </Stack>
        </marquee>
      ) : (
        <div></div>
      )}
    </>
  );
}
