import React, { useState } from "react";
import axios from "axios";
import DutchLanguage_MijnBoek_Paragrapgh from "./DutchLanguage_MijnBoek_Paragrapgh";
import { PiShootingStarThin, PiStarThin, PiRocketLaunchThin } from "react-icons/pi";
import { GiFireworkRocket, GiBrightExplosion } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";

export default function DutchLanguage_MijnBoek_Chapter({
  chapter,
  reload,
  setReload
}) {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newText, setNewText] = useState("");

  const nextParagraphNumber =
    chapter.paragraphs.length > 0
      ? Math.max(...chapter.paragraphs.map(p => p.paragraphNumber)) + 1
      : 1;

  const createParagraph = () => {
    axios
      .post(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mijn-nederlandse-boek",
        {
          chapterNumber: chapter.chapterNumber,
          chapterName: chapter.chapterName,
          paragraphNumber: nextParagraphNumber,
          paragraphText: newText,
          wordCount: newText.trim().split(/\s+/).length,
          notas: null
        }
      )
      .then(() => {
        setCreating(false);
        setNewText("");
        setReload(!reload);
      });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Chapter header */}
      <h3
        style={{ fontFamily: "Segoe UI", fontSize: "18px", cursor: "pointer", color: "black" }}
        onClick={() => setOpen(!open)}
      >

        {open ? <PiShootingStarThin size={25} color="#FF4F00" /> : <PiRocketLaunchThin size={25} color="#FF4F00" />} Hoofdstuk {chapter.chapterNumber}:

        {chapter.chapterName}
      </h3>

      {/* Paragraph numbers */}
      {open && (
        <div style={{ marginLeft: "25px" }}>
          {chapter.paragraphs
            .sort((a, b) => a.paragraphNumber - b.paragraphNumber)
            .map(p => (
              <DutchLanguage_MijnBoek_Paragrapgh
                key={p.id}
                paragraph={p}
              />
            ))}

          {/* Create new paragraph */}
          {!creating ? (
            <FaPlus
              size={18}
              color="#777777"
              style={{ cursor: "pointer" }}
              onClick={() => setCreating(true)}
            />
          ) : (
            <div style={{ marginTop: "10px" }}>
              <b>Paragraaf {nextParagraphNumber}</b>
              <textarea
                value={newText}
                onChange={e => setNewText(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />
              <br />
              <button onClick={createParagraph}>💾 Opslaan</button>
              <button onClick={() => setCreating(false)}>❌ Annuleren</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
