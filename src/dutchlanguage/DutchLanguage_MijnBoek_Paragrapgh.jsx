import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DutchLanguage_MijnBoek_Paragraph({ paragraph }) {
  const [open, setOpen] = useState(false);     // collapsed by default
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(null);      // lazy load
  const [loading, setLoading] = useState(false);

  // Load paragraph text ONLY when expanded
  useEffect(() => {
    if (open && text === null) {
      setLoading(true);
      axios
        .get(
          `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mijn-nederlandse-boek/paragraph/text/${paragraph.id}`
        )
        .then(res => {
          setText(res.data.paragraphText);
          setLoading(false);
        });
    }
  }, [open, text, paragraph.id]);

  const saveParagraph = () => {
    axios.put(
      `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mijn-nederlandse-boek/${paragraph.id}`,
      {
        chapterNumber: paragraph.chapterNumber,
        chapterName: paragraph.chapterName,
        paragraphNumber: paragraph.paragraphNumber,
        paragraphText: text,
        wordCount: text.trim().split(/\s+/).length,
        notas: null
      }
    ).then(() => {
      setEditing(false);
    });
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      {/* Paragraph header (always visible) */}
      <div
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={() => setOpen(!open)}
      >
        {open ? "▼" : "▶"} Paragraaf {paragraph.paragraphNumber}
      </div>

      {/* Paragraph body */}
      {open && (
        <div style={{ marginLeft: "25px" }}>
          {loading ? (
            <em>Laden...</em>
          ) : !editing ? (
            <>
              <p>{text}</p>
              <button onClick={() => setEditing(true)}>✏️ Bewerken</button>
            </>
          ) : (
            <>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />
              <br />
              <button onClick={saveParagraph}>💾 Opslaan</button>
              <button onClick={() => setEditing(false)}>❌ Annuleren</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
