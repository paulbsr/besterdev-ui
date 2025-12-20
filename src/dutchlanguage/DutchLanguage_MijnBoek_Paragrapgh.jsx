import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";

import { PiEyeClosedThin, PiEyeThin } from "react-icons/pi";
import { BsPencil } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { RiSpeakFill } from "react-icons/ri";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { ImSpellCheck } from "react-icons/im";
import { SiConvertio } from "react-icons/si";

import DutchLanguage_WordExplain_Mini from "./DutchLanguage_WordExplain_Mini";
import DutchLanguage_WordContext_Mini from "./DutchLanguage_WordContext_Mini";
import DutchLanguage_SpellingChecker_Mini from "./DutchLanguage_SpellingChecker_Mini";
import DutchLanguage_Zintransformatie_Mini from "./DutchLanguage_Zintransformatie_Mini";

const iconButtonStyle = {
  height: "20px",
  width: "20px",
  padding: 0,
  border: "none",
  borderRadius: "3px",
  backgroundColor: "white",
  cursor: "pointer"
};

export default function DutchLanguage_MijnBoek_Paragraph({ paragraph }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showExplain, setShowExplain] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [showSpelling, setShowSpelling] = useState(false);
  const [showConversion, setShowConversion] = useState(false);

  /* ---------------- Load paragraph lazily ---------------- */
  useEffect(() => {
    if (!open || text !== null) return;

    setLoading(true);
    axios
      .get(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mijn-nederlandse-boek/paragraph/text/${paragraph.id}`
      )
      .then(res => setText(res.data.paragraphText))
      .finally(() => setLoading(false));
  }, [open, text, paragraph.id]);

  /* ---------------- Helpers ---------------- */
  const resetMiniPanels = () => {
    setShowExplain(false);
    setShowContext(false);
    setShowSpelling(false);
    setShowConversion(false);
  };

  const cancelEdit = () => {
    setEditing(false);
    resetMiniPanels();
  };

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
      resetMiniPanels();
    });
  };

  /* ---------------- Render ---------------- */
  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ cursor: "pointer" }}
      >
        {open ? (
          <PiEyeThin size={25} color="#FF4F00" />
        ) : (
          <PiEyeClosedThin size={25} color="#FF4F00" />
        )}{" "}
        <i>Paragraaf {paragraph.paragraphNumber}</i>
      </div>

      {open && (
        <div style={{ marginLeft: "25px", marginTop: "10px" }}>
          {loading ? (
            <em>Laden...</em>
          ) : !editing ? (
            <p>
              {text}
              <Tooltip
                title={`Bewerken Paragraaf ${paragraph.paragraphNumber}`}
                placement="top-end"
              >
                <button
                  type="button"
                  style={{ ...iconButtonStyle, marginLeft: "6px" }}
                  onClick={() => setEditing(true)}
                >
                  <BsPencil style={{ color: "#FF4F00", fontSize: "15px" }} />
                </button>
              </Tooltip>
            </p>
          ) : (
            <>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows={9}
                style={{
                  width: "100%",
                  border: "0.5px solid #FF4F00",
                  outline: "none",
                  fontFamily: "Segoe UI",
                  fontSize: "16px",
                  lineHeight: "1.5"
                }}
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <Tooltip title="Opslaan" placement="top-end">
                  <button style={iconButtonStyle} onClick={saveParagraph}>
                    <GiCheckMark style={{ color: "#D5441C", fontSize: "20px" }} />
                  </button>
                </Tooltip>

                <Tooltip title="Annuleren" placement="top-end">
                  <button style={iconButtonStyle} onClick={cancelEdit}>
                    <PiArrowCounterClockwiseBold
                      style={{ color: "#D5441C", fontSize: "20px" }}
                    />
                  </button>
                </Tooltip>

                <Tooltip title="Verduidelijk" placement="top-end">
                  <button
                    style={iconButtonStyle}
                    onClick={() => setShowExplain(v => !v)}
                  >
                    <RiSpeakFill style={{ color: "#D5441C", fontSize: "20px" }} />
                  </button>
                </Tooltip>

                <Tooltip title="Bepalen" placement="top-end">
                  <button
                    style={iconButtonStyle}
                    onClick={() => setShowContext(v => !v)}
                  >
                    <HiQuestionMarkCircle
                      style={{ color: "#D5441C", fontSize: "22px" }}
                    />
                  </button>
                </Tooltip>

                <Tooltip title="Spellingscontrole" placement="top-end">
                  <button
                    style={iconButtonStyle}
                    onClick={() => setShowSpelling(v => !v)}
                  >
                    <ImSpellCheck
                      style={{ color: "#D5441C", fontSize: "20px" }}
                    />
                  </button>
                </Tooltip>

                <Tooltip title="Convertie" placement="top-end">
                  <button
                    style={iconButtonStyle}
                    onClick={() => setShowConversion(v => !v)}
                  >
                    <SiConvertio
                      style={{ color: "#D5441C", fontSize: "20px" }}
                    />
                  </button>
                </Tooltip>
              </div>

              {showExplain && <DutchLanguage_WordExplain_Mini text={text} />}
              {showContext && <DutchLanguage_WordContext_Mini text={text} />}
              {showSpelling && <DutchLanguage_SpellingChecker_Mini text={text} />}
              {showConversion && <DutchLanguage_Zintransformatie_Mini text={text} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}
