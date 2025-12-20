import React, { useEffect, useState } from "react";
import axios from "axios";
import { PiEyeClosedThin, PiEyeThin } from "react-icons/pi";
import { TbQuestionMark } from "react-icons/tb";
import { MdOutlineSaveAlt } from "react-icons/md"
import { GrRevert } from "react-icons/gr";
import { GiCheckMark } from "react-icons/gi";
import { RiSpeakLine } from "react-icons/ri";
import { SiConvertio } from "react-icons/si";
import { BsPencil } from 'react-icons/bs'; //Edit
import DutchLanguage_WordExplain_Mini from "./DutchLanguage_WordExplain_Mini";
import DutchLanguage_WordContext_Mini from "./DutchLanguage_WordContext_Mini";
import DutchLanguage_SpellingChecker_Mini from "./DutchLanguage_SpellingChecker_Mini";
import DutchLanguage_Zintransformatie_Mini from "./DutchLanguage_Zintransformatie_Mini";
import { Tooltip } from '@mui/material';

const actionButtonStyle = {
  display: "flex",
  alignItems: "center",
  height: "27px",
  border: "1px solid #000000",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
  backgroundColor: "#FFFFFF",
  color: "#000000",
  gap: "4px"
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
    axios
      .put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mijn-nederlandse-boek/${paragraph.id}`,
        {
          chapterNumber: paragraph.chapterNumber,
          chapterName: paragraph.chapterName,
          paragraphNumber: paragraph.paragraphNumber,
          paragraphText: text,
          wordCount: text.trim().split(/\s+/).length,
          notas: null
        }
      )
      .then(() => {
        setEditing(false);
        resetMiniPanels();
      });
  };

  /* ---------------- Render ---------------- */
  return (
    <div style={{ marginBottom: "10px" }}>
      {/* Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ cursor: "pointer" }}
      >
        {open ? (
          <PiEyeThin size={25} color="#FF4F00" />
        ) : (
          <PiEyeClosedThin size={25} color="#FF4F00" />
        )}{" "}
        Paragraaf {paragraph.paragraphNumber}
      </div>

      {/* Body */}
      {open && (
        <div style={{ marginLeft: "25px", marginTop: "10px" }}>
          {loading ? (
            <em>Laden...</em>
          ) : !editing ? (
            <>
              <p>{text}

                <Tooltip title={`Edit Paragrapgh: ${paragraph.paragraphNumber}`} placement="top-end">
                  <span style={{ color: "#C0C0C0", cursor: "pointer" }}>  . . . .</span>
                  <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { setEditing(true) }}>
                    <BsPencil style={{ color: '#C0C0C0', display: 'round', margin: 'auto', fontSize: '15px' }} /></button>
                </Tooltip>
              </p>
            </>
          ) : (
            <>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows={9}
                style={{ width: "100%" }}
              />

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "8px"
                }}
              >
                <button
                  type="button"
                  onClick={saveParagraph}
                  style={actionButtonStyle}>
                  <MdOutlineSaveAlt size={16} />
                  Opslaan
                </button>

                <button
                  type="button"
                  onClick={cancelEdit}
                  style={actionButtonStyle}>
                  <GrRevert size={16} />
                  Annuleren
                </button>

                <button
                  type="button"
                  onClick={() => setShowExplain(v => !v)}
                  style={actionButtonStyle}
                >
                  <RiSpeakLine size={16} />
                  Verduidelijk
                </button>

                <button
                  type="button"
                  onClick={() => setShowContext(v => !v)}
                  style={actionButtonStyle}
                >
                  <TbQuestionMark size={16} />
                  Bepalen
                </button>

                <button
                  type="button"
                  onClick={() => setShowSpelling(v => !v)}
                  style={actionButtonStyle}
                >
                  <GiCheckMark size={16} />
                  Spelling
                </button>

                <button
                  type="button"
                  onClick={() => setShowConversion(v => !v)}
                  style={actionButtonStyle}
                >
                  <SiConvertio size={16} />
                  Convertie
                </button>

              </div>

              {/* Mini panels */}
              {showExplain && (
                <div style={{ marginTop: "10px" }}>
                  <DutchLanguage_WordExplain_Mini text={text} />
                </div>
              )}

              {showContext && (
                <div style={{ marginTop: "10px" }}>
                  <DutchLanguage_WordContext_Mini text={text} />
                </div>
              )}

              {showSpelling && (
                <div style={{ marginTop: "10px" }}>
                  <DutchLanguage_SpellingChecker_Mini text={text} />
                </div>
              )}

              {showConversion && (
                <div style={{ marginTop: "10px" }}>
                  <DutchLanguage_Zintransformatie_Mini text={text} />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
