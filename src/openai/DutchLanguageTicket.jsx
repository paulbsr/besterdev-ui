import { useState, useEffect, React } from 'react';
import { Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function DutchLanguageTicker() {
  const [sentences, setSentences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDutchSentences = async () => {
      try {
        // Call your API that wraps OpenAI
        const res = await fetch(
          "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question:
                "Generate 8 completely random Dutch sentences. Then translate each to Afrikaans. Just provide them as natural Dutch."
            }),
          }
        );

        const data = await res.json();

        // Clean response
        let cleaned = (data.answer || "")
          .replace(/optional/i, "")
          .replace(/[\[\]]/g, "")
          .replace(/Sure!.*translations:?/i, "")
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
            {sentences.map((sentence, idx) => (
              <div className="ticker" key={idx}>
                <span
                  style={{
                    fontFamily: "Segoe UI",
                    fontSize: "medium",
                    fontStyle: "italic",
                    color: "#ff8500",
                    cursor: "default",
                  }}
                >
                  {sentence}
                </span>
              </div>
            ))}
          </Stack>
        </marquee>
      ) : (
        <div style={{ paddingTop: 8 }}></div>
      )}
    </>
  );
}
