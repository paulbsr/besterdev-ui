// import { useState } from "react";
// import { toast } from "react-toastify";
// import { GiGiftOfKnowledge, GiSpiderWeb } from "react-icons/gi";
// import { TbBrandSocketIo, TbBrandOauth } from "react-icons/tb";
// import { BsSearch } from "react-icons/bs";
// import { MdTask } from "react-icons/md";
// import { useCyclopediaApi } from "../cyclopedia/CyclopediaAPIProvider";
// import { useWebsiteApi } from "../websites/WebSiteAPIProvider";
// import OAuth2APIClient from '../oauth2/OAuth2APIClient';
// import DatePicker from "react-datepicker";
// import DBSearchComponentBanner from "../dbsearch/DBSearchComponentBanner";
// import WebSocketComponent from "../websockets/WebSocketComponent";
// import BearerToken from "../oauth2/BearerToken";
// import "react-tooltip/dist/react-tooltip.css";
// import "../Fonts.css";

// const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1";

// export default function CombinedCreateFP() {
//   const current = new Date();

//   // --- State ---
//   const [isExpanded, setExpanded] = useState({
//     bearerToken: false,
//     cyclopedia: false,
//     webSocket: false,
//     website: false,
//     search: false,
//     task: false,
//   });

//   const toggleExpand = (key) =>
//     setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

//   // Cyclopedia
//   const { setRefreshCyclopediarootdata } = useCyclopediaApi();
//   const [cyclopedia, setCyclopedia] = useState({
//     name: "",
//     desc: "",
//     url: "",
//   });

//   // Website
//   const { websiterootdata, setRefreshWebsiterootdata } = useWebsiteApi();
//   const [website, setWebsite] = useState({
//     name: "",
//     desc: "",
//     url: "",
//     cat: "",
//   });

//   // Task
//   const [task, setTask] = useState({
//     name: "",
//     requirement: "",
//     targetDate: null,
//     owner: "Bester",
//     status: "START",
//     createdDate: current,
//     asms: "",
//     projectHandle: "",
//     nextStep: "",
//   });

//   // --- Handlers ---
//   const handleCyclopediaSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       cyclopediaName: cyclopedia.name,
//       cyclopediaDesc: cyclopedia.desc,
//       cyclopediaUrl: cyclopedia.url,
//     };
//     try {
//       const res = await OAuth2APIClient.post(`${API_BASE}/cyclopedia/create`, payload);
//       if (res.status === 200) {
//         setRefreshCyclopediarootdata((prev) => !prev);
//         toast.success(`${cyclopedia.name} memorialized.`);
//         setCyclopedia({ name: "", desc: "", url: "" });
//       }
//     } catch {
//       toast.error("Error submitting the form");
//     }
//   };

//   const handleWebsiteSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       websiteName: website.name,
//       websiteDesc: website.desc,
//       websiteUrl: website.url,
//       websiteCat: website.cat,
//     };
//     try {
//       const res = await OAuth2APIClient.post(`${API_BASE}/websites/create`, payload);
//       if (res.status === 200) {
//         setRefreshWebsiterootdata((prev) => !prev);
//         toast.success(`${website.name} added.`);
//         setWebsite({ name: "", desc: "", url: "", cat: "" });
//       }
//     } catch {
//       toast.error("Error submitting the form");
//     }
//   };

//   const handleTaskSubmit = async (e) => {
//     e.preventDefault();
//     if (!task.targetDate) return;

//     const payload = {
//       taskname: task.name,
//       taskrequirement: task.requirement,
//       taskowner: task.owner,
//       tasktargetdate: task.targetDate,
//       taskcreatedate: task.createdDate,
//       taskstatus: task.status,
//       asms: task.asms,
//       projecthandle: task.projectHandle,
//       tasknextstep: task.nextStep,
//     };

//     try {
//       const res = await OAuth2APIClient.post(`${API_BASE}/tasks/create`, payload);
//       res.status === 200
//         ? toast.success("Task added.")
//         : toast.error("Task not added");
//     } catch (err) {
//       console.error(err);
//       toast.error("Error adding task");
//     }
//   };

//   const handleDropdownChange = (e) => {
//     const selected = e.target.options[e.target.selectedIndex];
//     setTask((prev) => ({
//       ...prev,
//       asms: e.target.value,
//       projectHandle: selected.getAttribute("data-value2") || "",
//     }));
//   };

//   // --- JSX Sections ---
//   const IconButton = ({ icon: Icon, label, onClick }) => (
//     <span onClick={onClick} style={styles.iconSpan}>
//       <Icon style={styles.icon} />
//       {label}
//     </span>
//   );

//   return (
//     <div className="Font-Segoe-Small">
//       <div style={{ marginTop: "10px" }}>
//         <div style={styles.container}>
//           <div style={styles.iconRow}>
//             <IconButton
//               icon={GiGiftOfKnowledge}
//               label="Add to Cyclopedia"
//               onClick={() => toggleExpand("cyclopedia")}
//             />
//             <IconButton
//               icon={GiSpiderWeb}
//               label="Add a Website"
//               onClick={() => toggleExpand("website")}
//             />
//             <IconButton
//               icon={MdTask}
//               label="Add a Task"
//               onClick={() => toggleExpand("task")}
//             />
//             <IconButton
//               icon={TbBrandOauth}
//               label="OAuth2.0"
//               onClick={() => toggleExpand("bearerToken")}
//             />
//             <IconButton
//               icon={TbBrandSocketIo}
//               label="WebSocket"
//               onClick={() => toggleExpand("webSocket")}
//             />
//             <IconButton
//               icon={BsSearch}
//               label="Search"
//               onClick={() => toggleExpand("search")}
//             />
//           </div>

//           {/* Cyclopedia Form */}
//           {isExpanded.cyclopedia && (
//             <form onSubmit={handleCyclopediaSubmit} style={styles.form}>
//               <input
//                 style={styles.input}
//                 placeholder="Cyclopedia Name (required)"
//                 value={cyclopedia.name}
//                 onChange={(e) =>
//                   setCyclopedia((p) => ({ ...p, name: e.target.value }))
//                 }
//                 required
//               />
//               <input
//                 style={styles.inputWide}
//                 placeholder="Cyclopedia URL (optional)"
//                 value={cyclopedia.url}
//                 onChange={(e) =>
//                   setCyclopedia((p) => ({ ...p, url: e.target.value }))
//                 }
//               />
//               <button style={styles.button}>Memorialize</button>
//               <textarea
//                 style={styles.textarea}
//                 placeholder="Cyclopedia Description (required)"
//                 value={cyclopedia.desc}
//                 onChange={(e) =>
//                   setCyclopedia((p) => ({ ...p, desc: e.target.value }))
//                 }
//                 required
//               />
//             </form>
//           )}

//           {/* Website Form */}
//           {isExpanded.website && (
//             <form onSubmit={handleWebsiteSubmit} style={styles.form}>
//               <input
//                 style={styles.input}
//                 placeholder="Website (required)"
//                 value={website.name}
//                 onChange={(e) =>
//                   setWebsite((p) => ({ ...p, name: e.target.value }))
//                 }
//                 required
//               />
//               <input
//                 style={styles.inputWide}
//                 placeholder="Website URL (optional)"
//                 value={website.url}
//                 onChange={(e) =>
//                   setWebsite((p) => ({ ...p, url: e.target.value }))
//                 }
//               />
//               <button style={styles.button}>Memorialize</button>
//               <select
//                 style={styles.select}
//                 onChange={(e) =>
//                   setWebsite((p) => ({
//                     ...p,
//                     cat:
//                       e.target.options[e.target.selectedIndex].getAttribute(
//                         "data-category"
//                       ) || "",
//                   }))
//                 }
//                 required
//               >
//                 <option value="" disabled selected hidden>
//                   Category
//                 </option>
//                 {websiterootdata &&
//                   Array.from(
//                     new Set(websiterootdata.map((w) => w.websiteCat))
//                   )
//                     .sort()
//                     .filter((c) => !c.startsWith("HOWTO"))
//                     .map((c) => (
//                       <option key={c} data-category={c}>
//                         {c}
//                       </option>
//                     ))}
//               </select>
//             </form>
//           )}

//           {/* Task Form */}
//           {isExpanded.task && (
//             <form onSubmit={handleTaskSubmit} style={styles.form}>
//               <select style={styles.select} onChange={handleDropdownChange}>
//                 <option value="" disabled selected>
//                   Task Module
//                 </option>
//                 <option value="188118" data-value2="UserStory">
//                   BesterDev User Story
//                 </option>
//                 <option value="171593" data-value2="Dutch Language">
//                   Dutch Language Staatsexamen NT2
//                 </option>
//                 <option value="168272" data-value2="Dissertation">
//                   Dissertation
//                 </option>
//               </select>

//               <input
//                 style={styles.inputWide}
//                 placeholder="Task Name"
//                 value={task.name}
//                 onChange={(e) =>
//                   setTask((p) => ({ ...p, name: e.target.value }))
//                 }
//                 required
//               />
//               <button style={styles.button}>Memorialize</button>

//               <div style={{ marginTop: "10px" }}>
//                 <input
//                   style={styles.inputWide}
//                   placeholder="Task Description"
//                   value={task.requirement}
//                   onChange={(e) =>
//                     setTask((p) => ({ ...p, requirement: e.target.value }))
//                   }
//                 />
//                 <div>..</div>
//                 <DatePicker
//                   selected={task.targetDate}
//                   onChange={(date) =>
//                     setTask((p) => ({ ...p, targetDate: date }))
//                   }
//                   dateFormat="yyyy.MM.dd"
//                   minDate={new Date()}
//                   placeholderText="Target Date"
//                 />
//               </div>
//             </form>
//           )}

//           {/* Conditional Components */}
//           {isExpanded.bearerToken && <BearerToken />}
//           {isExpanded.webSocket && <WebSocketComponent />}
//           {isExpanded.search && <DBSearchComponentBanner />}
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Styles ---
// const styles = {
//   container: {
//     border: "1px solid #e0dedeff",
//     borderRadius: "8px",
//     padding: "20px",
//     backgroundColor: "#f7f4f3",
//     width: "53%",
//     margin: "0 auto",
//     boxShadow: "20px 15px 10px rgba(0,0,0,0.7)",
//     fontFamily: "Segoe UI",
//     fontSize: "16px",
//   },
//   iconRow: {
//     display: "flex",
//     alignItems: "center",
//     flexWrap: "wrap",
//     gap: "20px",
//     cursor: "pointer",
//   },
//   iconSpan: {
//     display: "flex",
//     alignItems: "center",
//     cursor: "pointer",
//     gap: "6px",
//     marginLeft: "35px",
//   },
//   icon: { color: "#4D4D4D", fontSize: "18px" },
//   form: { marginTop: "10px" },
//   input: {
//     fontFamily: "Segoe UI",
//     height: "28px",
//     border: "1.25px solid #336791",
//     borderRadius: "4px",
//     paddingLeft: "4px",
//     width: "300px",
//     marginLeft: "50px",
//     marginTop: "10px",
//   },
//   inputWide: {
//     fontFamily: "Segoe UI",
//     height: "28px",
//     border: "1.25px solid #336791",
//     borderRadius: "4px",
//     paddingLeft: "4px",
//     width: "450px",
//     marginBottom: "20px",
//     marginLeft: "10px"
//   },
//   textarea: {
//     fontFamily: "Segoe UI",
//     border: "1.25px solid #336791",
//     borderRadius: "4px",
//     paddingLeft: "4px",
//     width: "770px",
//     height: "60px",
//     marginLeft: "50px",
//   },
//   select: {
//     height: "32.5px",
//     border: "1.25px solid #336791",
//     borderRadius: "4px",
//     paddingLeft: "4px",
//     width: "310px",
//     marginLeft: "50px",

//     marginBottom: "20px",
//     fontFamily: "Segoe UI",
//   },
//   button: {
//     marginLeft: "20px",
//     height: "28px",
//     border: "1px solid #336791",
//     borderRadius: "4px",
//     backgroundColor: "#fff",
//     color: "#336791",
//     cursor: "pointer",
//   },
// };


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
  marginBottom: '10px',
  height: '24.5px',
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
          label="Website"
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
        {/* <SectionButton
          icon={BsSearch}
          label="Search"
          active={open === "search"}
          onClick={() => toggle("search")}
        /> */}

                <DBSearchComponentBanner2 />
      </div>

      {open === "cyclopedia" && (
        <Card>
          <form onSubmit={submitCyclopedia} className="grid-2">
            <Field label="Name">
              <input
                style={inputStyle}
                value={cyclopedia.name}
                onChange={(e) =>
                  setCyclopedia((p) => ({
                    ...p,
                    name: e.target.value,
                  }))
                }
                required
              />
            </Field>

            <Field label="URL">
              <input
                style={inputStyle}
                value={cyclopedia.url}
                onChange={(e) =>
                  setCyclopedia((p) => ({
                    ...p,
                    url: e.target.value,
                  }))
                }
              />
            </Field>

            <Field label="Description">
              <textarea
                style={inputStyle}
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

            <button type="submit" 
            style={{
              marginLeft: '1px',
              marginTop: '10px',
              height: '30.5px',
              border: '1px solid #336791',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: '#336791',
              cursor: 'pointer',
            }}
            >Save</button>

          </form>
        </Card>
      )}

      {open === "website" && (
        <Card>
          <form onSubmit={submitWebsite} className="grid-2">
            <Field label="Name">
              <input
                style={inputStyle}
                value={website.name}
                onChange={(e) =>
                  setWebsite((p) => ({
                    ...p,
                    name: e.target.value,
                  }))
                }
                required
              />
            </Field>

            <Field label="URL">
              <input
                style={inputStyle}
                value={website.url}
                onChange={(e) =>
                  setWebsite((p) => ({
                    ...p,
                    url: e.target.value,
                  }))
                }
              />
            </Field>

            <Field label="Category...........">
              <select
                style={inputStyle}
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
                  Select category
                </option>
                {websiteCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <button type="submit" style={{
              marginLeft: '1px',
              marginTop: '10px',
              height: '30.5px',
              border: '1px solid #336791',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: '#336791',
              cursor: 'pointer',
            }}>Save</button>
          </form>
        </Card>
      )}

      {open === "task" && (
        <Card>
          <form onSubmit={submitTask} className="grid-2">
            <Field label="Module">
              <select
                style={inputStyle}
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
                  Select module
                </option>
                {TASK_MODULES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Task name">
              <input
                style={inputStyle}
                value={task.name}
                onChange={(e) =>
                  setTask((p) => ({
                    ...p,
                    name: e.target.value,
                  }))
                }
                required
              />
            </Field>

            <Field label="Description">
              <input
                style={inputStyle}
                value={task.requirement}
                onChange={(e) =>
                  setTask((p) => ({
                    ...p,
                    requirement: e.target.value,
                  }))
                }
              />
            </Field>

            <Field label="Target date">
              <DatePicker
                style={inputStyle}
                selected={task.targetDate}
                onChange={(date) =>
                  setTask((p) => ({
                    ...p,
                    targetDate: date,
                  }))
                }
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
              />
            </Field>

            <button type="submit"
              style={{
                marginLeft: '1px',
                marginTop: '10px',
                height: '30.5px',
                border: '1px solid #336791',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                color: '#336791',
                cursor: 'pointer',
              }}>Create task</button>
          </form>
        </Card>
      )}

      {open === "oauth" && <Card><BearerToken /></Card>}
      {open === "ws" && <Card><WebSocketComponent /></Card>}
      {open === "search" && <Card><DBSearchComponentBanner /></Card>}
    </div>
  );
}