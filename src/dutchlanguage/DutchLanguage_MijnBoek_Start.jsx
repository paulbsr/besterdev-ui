import React, { useEffect, useState } from "react";
import axios from "axios";
import DutchLanguage_MijnBoek_Chapter from "./DutchLanguage_MijnBoek_Chapter";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaPenAlt, FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md"
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

export default function MijnBoek() {
  const [chapters, setChapters] = useState([]);
  const [reload, setReload] = useState(false);
  const [creatingChapter, setCreatingChapter] = useState(false);
  const [newChapterName, setNewChapterName] = useState("");

  // Load book index
  useEffect(() => {
    axios
      .get(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mijn-nederlandse-boek/index"
      )
      .then((res) => {
        const grouped = {};
        res.data.forEach((row) => {
          const key = `${row.chapterNumber}-${row.chapterName}`;
          if (!grouped[key]) {
            grouped[key] = {
              chapterNumber: row.chapterNumber,
              chapterName: row.chapterName,
              paragraphs: []
            };
          }
          grouped[key].paragraphs.push({
            id: row.id,
            paragraphNumber: row.paragraphNumber
          });
        });
        setChapters(Object.values(grouped));
      });
  }, [reload]);

  // Create new chapter
  const createChapter = () => {
    const nextChapterNumber =
      chapters.length > 0
        ? Math.max(...chapters.map((c) => c.chapterNumber)) + 1
        : 1;

    axios
      .post(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mijn-nederlandse-boek",
        {
          chapterNumber: nextChapterNumber,
          chapterName: newChapterName || `Nieuw Hoofdstuk ${nextChapterNumber}`,
          paragraphNumber: 1,
          paragraphText: "",
          wordCount: 0,
          notas: null
        }
      )
      .then(() => {
        setNewChapterName("");
        setCreatingChapter(false);
        setReload(!reload);
      });
  };

  return (
    <div style={{
      border: "1px solid #FF4F00",
      borderRadius: "8px",
      padding: "16px",
      fontFamily: "Segoe UI",
      fontSize: "16px",
      marginBottom: "16px",
      marginTop: "16px",
    }}>
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          marginBottom: "16px",
          marginTop: "1px",
        }}
      >
        <FaPenAlt
          style={{
            color: "#FF4F00",
            fontSize: "22px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        />
        Mijn Nederlandse Boek
      </h2>

      {/* Add new chapter */}
      {!creatingChapter ? (
        <Tooltip title={`Add a Chapter`} placement="top-end">
          <FaPlus
            size={18}
            color="#777777"
            style={{ cursor: "pointer" }}
            onClick={() => setCreatingChapter(true)}
          /></Tooltip>
      )
        :
        (
          <div
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >

            <input
              type="text"
              placeholder="Hoofdstuk naam"
              value={newChapterName}
              onChange={(e) => setNewChapterName(e.target.value)}
              style={{
                width: "300px",
                height: "27px",
                border: "1px solid #000000",
                borderRadius: "6px",
                fontSize: "12px",
                backgroundColor: "#FFFFFF",
                color: "#000000"
              }}
            />

            <button
              type="button"
              onClick={createChapter}
              style={actionButtonStyle}>
              <IoIosCheckmarkCircle size={16} />
              Opslaan
            </button>

            <button
              type="button"
              onClick={() => setCreatingChapter(false)}
              style={actionButtonStyle}>
              <MdCancel size={16} />
              Annuleren
            </button>
          </div>
        )}

      {/* Chapters */}
      {chapters
        .sort((a, b) => a.chapterNumber - b.chapterNumber)
        .map((chapter) => (
          <DutchLanguage_MijnBoek_Chapter
            key={chapter.chapterNumber}
            chapter={chapter}
            reload={reload}
            setReload={setReload}
          />
        ))}
    </div>
  );
}
