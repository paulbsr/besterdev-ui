import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";

import {
  PiEyeClosedThin,
  PiEyeThin,
  PiArrowCounterClockwiseBold
} from "react-icons/pi";
import { BsPencil } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { RiSpeakFill } from "react-icons/ri";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { ImSpellCheck } from "react-icons/im";
import { SiConvertio } from "react-icons/si";

import DutchLanguage_WordExplain_Mini from "./DutchLanguage_WordExplain_Mini";
import DutchLanguage_WordContext_Mini from "./DutchLanguage_WordContext_Mini";
import DutchLanguage_SpellingChecker_Mini from "./DutchLanguage_SpellingChecker_Mini";
import DutchLanguage_Zintransformatie_Mini from "./DutchLanguage_Zintransformatie_Mini";

const API_BASE =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mijn-nederlandse-boek";

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
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [notas, setNotas] = useState("");
  const [updated, setUpdated] = useState(null);

  const [panels, setPanels] = useState({
    explain: false,
    context: false,
    spelling: false,
    conversion: false
  });

  /* ---------------- Load paragraph lazily ---------------- */
  useEffect(() => {
    if (!open || text) return;

    setLoading(true);
    axios
      .get(`${API_BASE}/paragraph/text/${paragraph.id}`)
      .then(res => {
        setText(res.data.paragraphText ?? "");
        setNotas(res.data.notas ?? "");
        setUpdated(res.data.updated ?? null);
      })
      .finally(() => setLoading(false));
  }, [open, paragraph.id, text]);

  /* ---------------- Helpers ---------------- */
  const resetPanels = () =>
    setPanels({
      explain: false,
      context: false,
      spelling: false,
      conversion: false
    });

  const togglePanel = key =>
    setPanels(p => ({ ...p, [key]: !p[key] }));

  const cancelEdit = () => {
    setEditing(false);
    resetPanels();
  };

  const saveParagraph = () => {
    axios
      .put(`${API_BASE}/${paragraph.id}`, {
        chapterNumber: paragraph.chapterNumber,
        chapterName: paragraph.chapterName,
        paragraphNumber: paragraph.paragraphNumber,
        paragraphText: text,
        wordCount: text.trim().split(/\s+/).length,
        notas
      })
      .then(() => {
        setEditing(false);
        resetPanels();
      });
  };

  /* ---------------- Render helpers ---------------- */
  const renderToolbar = () => (
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
          onClick={() => togglePanel("explain")}
        >
          <RiSpeakFill style={{ color: "#D5441C", fontSize: "20px" }} />
        </button>
      </Tooltip>

      <Tooltip title="Bepalen" placement="top-end">
        <button
          style={iconButtonStyle}
          onClick={() => togglePanel("context")}
        >
          <HiQuestionMarkCircle
            style={{ color: "#D5441C", fontSize: "22px" }}
          />
        </button>
      </Tooltip>

      <Tooltip title="Spellingscontrole" placement="top-end">
        <button
          style={iconButtonStyle}
          onClick={() => togglePanel("spelling")}
        >
          <ImSpellCheck style={{ color: "#D5441C", fontSize: "20px" }} />
        </button>
      </Tooltip>

      <Tooltip title="Convertie" placement="top-end">
        <button
          style={iconButtonStyle}
          onClick={() => togglePanel("conversion")}
        >
          <SiConvertio style={{ color: "#D5441C", fontSize: "20px" }} />
        </button>
      </Tooltip>
    </div>
  );

  const formatUpdated = updated => {
    if (!updated) return null;

    const [y, m, d, h, min] = updated;

    // Pad numbers to 2 digits
    const pad = n => n.toString().padStart(2, "0");

    // Format as yy-mm-dd @ hh:mm
    return `${y.toString().slice(-2)}-${pad(m)}-${pad(d)} @ ${pad(h)}:${pad(min)} :: `;
  };


  /* ---------------- Render ---------------- */
  return (
    <div style={{ marginBottom: "10px" }}>
      <Tooltip
        placement="top-start"
        componentsProps={{
          tooltip: {
            sx: {
              maxWidth: 900,          // no width cap
              whiteSpace: "normal",      // wrap text
              wordBreak: "break-word",
              fontSize: "0.85rem",       // ⬅ increase font size
              lineHeight: 1.0,           // ⬅ improves readability
              // padding: "8px 12px"        // ⬅ breathing room
            }
          }
        }}
        title={`${formatUpdated(updated)} ${notas || "Klik om de notities te bekijken."}`}
      >
        <div
          onClick={() => setOpen(o => !o)}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          {open ? (
            <PiEyeThin size={25} color="#FF4F00" />
          ) : (
            <PiEyeClosedThin size={25} color="#FF4F00" />
          )}
          <i>Paragraaf {paragraph.paragraphNumber}</i>
        </div>
      </Tooltip>

      {open && (
        
        <div style={{ marginLeft: "25px", marginTop: "10px" }}>
          {loading && <em>Laden...</em>}

          {!loading && !editing && (
            <>
              <div
                style={{
                  whiteSpace: "pre-wrap",    // preserves line breaks
                  fontFamily: "Segoe UI",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  position: "relative"
                }}
              >
                {text}

                <Tooltip placement="top-end"
                  title={`Bewerken Paragraaf ${paragraph.paragraphNumber} (ID#${paragraph.id})`}
                >
                  <button
                    type="button"
                    style={{
                      ...iconButtonStyle,
                      position: "absolute",
                      top: 0,
                      right: 0
                    }}
                    onClick={() => setEditing(true)}
                  >
                    <BsPencil style={{ color: "#FF4F00", fontSize: "15px" }} />
                  </button>
                </Tooltip>
              </div>

              {notas && (
                <p style={{ fontStyle: "italic", color: "#666" }}>
                  {/* <strong>Notitie:</strong> {notas} */}
                </p>
              )}
            </>
          )}

          {!loading && editing && (
            <>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows={9}
                style={{
                  width: "100%",
                  border: "0.5px solid #D5441C",
                  borderRadius: "6px",
                  outline: "none",
                  fontFamily: "Segoe UI",
                  fontSize: "16px",
                  lineHeight: "1.5"
                }}
              />

              <input
                value={notas}
                onChange={e => setNotas(e.target.value)}
                placeholder="Notitie bij deze paragraaf…"
                style={{
                  width: "99%",
                  marginTop: "6px",
                  padding: "6px 8px",
                  border: "0.5px solid #0099FF",
                  outline: "none",
                  fontSize: "14px",
                  borderRadius: "8px"
                }}
              />

              {renderToolbar()}

              {panels.explain && (
                <DutchLanguage_WordExplain_Mini text={text} />
              )}
              {panels.context && (
                <DutchLanguage_WordContext_Mini text={text} />
              )}
              {panels.spelling && (
                <DutchLanguage_SpellingChecker_Mini text={text} />
              )}
              {panels.conversion && (
                <DutchLanguage_Zintransformatie_Mini text={text} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
