import React, { useState } from "react";
import axios from "axios";
import DutchLanguage_MijnBoek_Paragrapgh from "./DutchLanguage_MijnBoek_Paragrapgh";
import { PiShootingStarThin, PiRocketLaunchThin } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import { Tooltip } from '@mui/material';
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard


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


  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Chapter header */}
      <h3
        style={{ fontFamily: "Segoe UI", fontSize: "18px", cursor: "pointer", color: "black" }}
        onClick={() => setOpen(!open)}
      >

        {open ? <PiShootingStarThin size={25} color="#FF4F00" /> : <PiRocketLaunchThin size={25} color="#FF4F00" />} <u>Hoofdstuk {chapter.chapterNumber}</u>: {chapter.chapterName}</h3>

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

            <Tooltip title='Voeg een Paragraaf toe' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => setCreating(true)}><FaPlus style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
          ) : (
            <div style={{ marginTop: "10px" }}>
              <b>Paragraaf {nextParagraphNumber}</b>
              <textarea
                value={newText}
                onChange={e => setNewText(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  border: "0.5px solid #FF4F00",
                  outline: "none"        // removes default blue focus ring
                }}
              />
              <br />

              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={createParagraph}><GiCheckMark style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
                <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => setCreating(false)}><PiArrowCounterClockwiseBold style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
