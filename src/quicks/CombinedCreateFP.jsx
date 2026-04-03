import { useState } from "react";
import { toast } from "react-toastify";
import {
  GiGiftOfKnowledge,
  GiSpiderWeb,
} from "react-icons/gi";
import {
  TbBrandSocketIo,
  TbBrandOauth,
} from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import { MdTask } from "react-icons/md";

import { useCyclopediaApi } from "../cyclopedia/CyclopediaAPIProvider";
import { useWebsiteApi } from "../websites/WebSiteAPIProvider";
import OAuth2APIClient from "../oauth2/OAuth2APIClient";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DBSearchComponentBanner2 from "../dbsearch/DBSearchComponentBanner2";
import DBSearchComponentBanner from "../dbsearch/DBSearchComponentBanner";
import WebSocketComponent from "../websockets/WebSocketComponent";
import BearerToken from "../oauth2/BearerToken";

import "../Fonts.css";

const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1";

/* -------------------------------------------------------
   Small reusable UI pieces
------------------------------------------------------- */

const SectionButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 14px",
      borderRadius: 8,
      border: active ? "1.75px solid #336791" : "1px solid #ccc",
      background: active ? "#F7F7F7" : "#fff",
      cursor: "pointer",
      fontSize: 14,
      width: 150,
      justifyContent: "center"
    }}
  >
    <Icon size={18} />
    {label}
  </button>
);

const Card = ({ children }) => (
  <div
    style={{
      marginTop: 16,
      padding: 16,
      borderRadius: 10,
      background: "#fff",
      border: "1px solid #ddd",
    }}
  >
    {children}
  </div>
);

const Field = ({ label, children }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <span style={{ fontSize: 14, color: "#555" }}>{label}</span>
    {children}
  </label>
);

// styles.js or at top of the component file
export const inputStyle = {
  height: '27.5px',
  border: '1px solid #336791',
  borderRadius: '6px',
  backgroundColor: '#ffffff',
  cursor: 'pointer',
};

/* -------------------------------------------------------
   Main Component
------------------------------------------------------- */

export default function CombinedCreateFP() {
  const [open, setOpen] = useState(null);

  const toggle = (key) =>
    setOpen((prev) => (prev === key ? null : key));

  /* ---------------- Cyclopedia ---------------- */

  const { setRefreshCyclopediarootdata } = useCyclopediaApi();

  const [cyclopedia, setCyclopedia] = useState({
    name: "",
    desc: "",
    url: "",
  });

  const submitCyclopedia = async (e) => {
    e.preventDefault();

    try {
      await OAuth2APIClient.post(
        `${API_BASE}/cyclopedia/create`,
        {
          cyclopediaName: cyclopedia.name,
          cyclopediaDesc: cyclopedia.desc,
          cyclopediaUrl: cyclopedia.url,
        }
      );

      toast.success("Cyclopedia entry saved");
      setCyclopedia({ name: "", desc: "", url: "" });
      setRefreshCyclopediarootdata((v) => !v);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save cyclopedia entry");
    }
  };

  /* ---------------- Website ---------------- */

  const { websiterootdata, setRefreshWebsiterootdata } =
    useWebsiteApi();

  const [website, setWebsite] = useState({
    name: "",
    url: "",
    cat: "",
  });

  const submitWebsite = async (e) => {
    e.preventDefault();

    try {
      await OAuth2APIClient.post(
        `${API_BASE}/websites/create`,
        {
          websiteName: website.name,
          websiteUrl: website.url,
          websiteCat: website.cat,
        }
      );

      toast.success("Website added");
      setWebsite({ name: "", url: "", cat: "" });
      setRefreshWebsiterootdata((v) => !v);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add website");
    }
  };

  const websiteCategories = websiterootdata
    ? [...new Set(websiterootdata.map((w) => w.websiteCat))]
      .filter((c) => !c.startsWith("HOWTO"))
      .sort()
    : [];

  /* ---------------- Task ---------------- */

  const [task, setTask] = useState({
    moduleId: "",
    projectHandle: "",
    name: "",
    requirement: "",
    targetDate: null,
  });

  const TASK_MODULES = [
    { id: "188118", handle: "UserStory", label: "BesterDev User Story" },
    { id: "171593", handle: "Dutch Language", label: "Dutch NT2" },
    { id: "168272", handle: "Dissertation", label: "Dissertation" },
  ];

  const submitTask = async (e) => {
    e.preventDefault();

    if (!task.targetDate) {
      toast.error("Target date required");
      return;
    }

    try {
      await OAuth2APIClient.post(
        `${API_BASE}/tasks/create`,
        {
          taskname: task.name,
          taskrequirement: task.requirement,
          taskowner: "Bester",
          taskstatus: "START",
          tasktargetdate: task.targetDate.toISOString(),
          taskcreatedate: new Date().toISOString(),
          asms: task.moduleId,
          projecthandle: task.projectHandle,
        }
      );

      toast.success("Task created");
      setTask({
        moduleId: "",
        projectHandle: "",
        name: "",
        requirement: "",
        targetDate: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create task");
    }
  };

  /* -------------------------------------------------------
     Render
  ------------------------------------------------------- */

  return (
    <div
      className="Font-Segoe-Small"
      style={{
        maxWidth: 1010,
        margin: "20px auto",
        padding: 10,
        background: "#f7f7f7",
        borderRadius: 8,
        boxShadow: "10px 10px 10px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >

        <SectionButton
          icon={GiGiftOfKnowledge}
          label="Cyclopedia"
          active={open === "cyclopedia"}
          onClick={() => toggle("cyclopedia")}
        />
        <SectionButton
          icon={GiSpiderWeb}
          label="Web Resource"
          active={open === "website"}
          onClick={() => toggle("website")}
        />
        <SectionButton
          icon={MdTask}
          label="Task"
          active={open === "task"}
          onClick={() => toggle("task")}
        />
        <SectionButton
          icon={TbBrandOauth}
          label="OAuth2"
          active={open === "oauth"}
          onClick={() => toggle("oauth")}
        />
        <SectionButton
          icon={TbBrandSocketIo}
          label="WebSocket"
          active={open === "ws"}
          onClick={() => toggle("ws")}
        />
        <SectionButton
          icon={BsSearch}
          label="Search"
          active={open === "search"}
          onClick={() => toggle("search")}
        />

        {/* <DBSearchComponentBanner /> */}
      </div>

      {open === "cyclopedia" && (
        <Card>
          <form onSubmit={submitCyclopedia} className="grid-2">
            <input
              placeholder="Cyclopedia Name"
              style={{ ...inputStyle, width: '370px', marginRight: '10px' }}
              value={cyclopedia.name}
              onChange={(e) =>
                setCyclopedia((p) => ({
                  ...p,
                  name: e.target.value,
                }))
              }
              required
            />

            <input
              placeholder="Supporting URL"
              style={{ ...inputStyle, width: '510px', marginRight: '10px', background: '#F7F7F7', }}
              value={cyclopedia.url}
              onChange={(e) =>
                setCyclopedia((p) => ({
                  ...p,
                  url: e.target.value,
                }))
              }
            />


            <button type="submit"
              style={{
                marginTop: '10px',
                height: '30.5px',
                border: '1px solid #336791',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                color: '#336791',
                cursor: 'pointer',
                width: '60px'
              }}
            >Save</button>


            <Field>
              <textarea
                placeholder="Description"
                style={{ inputStyle, marginTop: '10px', borderRadius: '6px', border: '1px solid #336791', }}
                rows={3}
                value={cyclopedia.desc}
                onChange={(e) =>
                  setCyclopedia((p) => ({
                    ...p,
                    desc: e.target.value,
                  }))
                }
                required
              />
            </Field>



          </form>
        </Card>
      )}

      {open === "website" && (
        <Card>
          <form onSubmit={submitWebsite} className="grid-2">
            {/* <Field> */}
            <input
              placeholder="Web-based resource"
              style={{ ...inputStyle, width: '300px', marginRight: '10px' }}
              value={website.name}
              onChange={(e) =>
                setWebsite((p) => ({
                  ...p,
                  name: e.target.value,
                }))
              }
              required
            />

            <input
              placeholder="URL"
              style={{ ...inputStyle, width: '450px', marginRight: '10px' }}
              value={website.url}
              onChange={(e) =>
                setWebsite((p) => ({
                  ...p,
                  url: e.target.value,
                }))
              }
            />

            <select
              style={{ ...inputStyle, width: '120px', marginRight: '10px', height: '30.5px' }}
              value={website.cat}
              onChange={(e) =>
                setWebsite((p) => ({
                  ...p,
                  cat: e.target.value,
                }))
              }
              required
            >
              <option value="" disabled>
                Category
              </option>
              {websiteCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {/* </Field> */}

            <button type="submit"
              style={{
                marginTop: '10px',
                height: '30.5px',
                border: '1px solid #336791',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                color: '#336791',
                cursor: 'pointer',
                width: '60px'
              }}>Save</button>
          </form>
        </Card>
      )}

      {open === "task" && (
        <Card>
          <form onSubmit={submitTask} className="grid-2">


            <input
              placeholder="Task name"
              style={{ ...inputStyle, width: '410px', marginRight: '10px', marginTop: '10px', }}
              value={task.name}
              onChange={(e) =>
                setTask((p) => ({
                  ...p,
                  name: e.target.value,
                }))
              }
              required
            />


            <input
              placeholder="Task Description"
              style={{ ...inputStyle, width: '170px', marginRight: '10px' }}
              value={task.requirement}
              onChange={(e) =>
                setTask((p) => ({
                  ...p,
                  requirement: e.target.value,
                }))
              }
            />






            <select
              style={{ ...inputStyle, width: '139px', marginRight: '10px', height: '32.5px', padding: "6px 14px" }}
              value={task.moduleId}
              onChange={(e) => {
                const mod = TASK_MODULES.find(
                  (m) => m.id === e.target.value
                );
                setTask((p) => ({
                  ...p,
                  moduleId: mod.id,
                  projectHandle: mod.handle,
                }));
              }}
              required
            >
              <option value="" disabled>
                Module
              </option>
              {TASK_MODULES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>

            <DatePicker
              selected={task.targetDate}
              onChange={(date) =>
                setTask((p) => ({ ...p, targetDate: date }))
              }
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="custom-datepicker-input"
            />

            <button type="submit"
              style={{
                width: '60px',
                height: '32.5px',
                border: '1px solid #336791',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                color: '#336791',
                cursor: 'pointer',
              }}>Save
            </button>

          </form>
        </Card>
      )}

      {open === "oauth" && <Card><BearerToken /></Card>}
      {open === "ws" && <Card><WebSocketComponent /></Card>}
      {open === "search" && <Card><DBSearchComponentBanner /></Card>}
    </div>
  );
}