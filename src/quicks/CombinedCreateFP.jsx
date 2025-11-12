import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { GiGiftOfKnowledge, GiSpiderWeb } from "react-icons/gi";
import { TbBrandSocketIo, TbBrandOauth } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import { MdTask } from "react-icons/md";

import DBSearchComponentBanner from "../dbsearch/DBSearchComponentBanner";
import WebSocketComponent from "../websockets/WebSocketComponent";
import BearerToken from "../oauth2.0/BearerToken";

import { useCyclopediaApi } from "../cyclopedia/CyclopediaAPIProvider";
import { useWebsiteApi } from "../websites/WebSiteAPIProvider";

import "react-tooltip/dist/react-tooltip.css";
import "../Fonts.css";

const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1";

export default function CombinedCreateFP() {
  const current = new Date();

  // --- State ---
  const [isExpanded, setExpanded] = useState({
    bearerToken: false,
    cyclopedia: false,
    webSocket: false,
    website: false,
    search: false,
    task: false,
  });

  const toggleExpand = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  // Cyclopedia
  const { setRefreshCyclopediarootdata } = useCyclopediaApi();
  const [cyclopedia, setCyclopedia] = useState({
    name: "",
    desc: "",
    url: "",
  });

  // Website
  const { websiterootdata, setRefreshWebsiterootdata } = useWebsiteApi();
  const [website, setWebsite] = useState({
    name: "",
    desc: "",
    url: "",
    cat: "",
  });

  // Task
  const [task, setTask] = useState({
    name: "",
    requirement: "",
    targetDate: null,
    owner: "Bester",
    status: "START",
    createdDate: current,
    asms: "",
    projectHandle: "",
    nextStep: "",
  });

  // --- Handlers ---
  const handleCyclopediaSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      cyclopediaName: cyclopedia.name,
      cyclopediaDesc: cyclopedia.desc,
      cyclopediaUrl: cyclopedia.url,
    };
    try {
      const res = await axios.post(`${API_BASE}/cyclopedia/create`, payload);
      if (res.status === 200) {
        setRefreshCyclopediarootdata((prev) => !prev);
        toast.success(`${cyclopedia.name} memorialized.`);
        setCyclopedia({ name: "", desc: "", url: "" });
      }
    } catch {
      toast.error("Error submitting the form");
    }
  };

  const handleWebsiteSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      websiteName: website.name,
      websiteDesc: website.desc,
      websiteUrl: website.url,
      websiteCat: website.cat,
    };
    try {
      const res = await axios.post(`${API_BASE}/websites/create`, payload);
      if (res.status === 200) {
        setRefreshWebsiterootdata((prev) => !prev);
        toast.success(`${website.name} added.`);
        setWebsite({ name: "", desc: "", url: "", cat: "" });
      }
    } catch {
      toast.error("Error submitting the form");
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!task.targetDate) return;

    const payload = {
      taskname: task.name,
      taskrequirement: task.requirement,
      taskowner: task.owner,
      tasktargetdate: task.targetDate,
      taskcreatedate: task.createdDate,
      taskstatus: task.status,
      asms: task.asms,
      projecthandle: task.projectHandle,
      tasknextstep: task.nextStep,
    };

    try {
      const res = await axios.post(`${API_BASE}/tasks/create`, payload);
      res.status === 200
        ? toast.success("Task added.")
        : toast.error("Task not added");
    } catch (err) {
      console.error(err);
      toast.error("Error adding task");
    }
  };

  const handleDropdownChange = (e) => {
    const selected = e.target.options[e.target.selectedIndex];
    setTask((prev) => ({
      ...prev,
      asms: e.target.value,
      projectHandle: selected.getAttribute("data-value2") || "",
    }));
  };

  // --- JSX Sections ---
  const IconButton = ({ icon: Icon, label, onClick }) => (
    <span onClick={onClick} style={styles.iconSpan}>
      <Icon style={styles.icon} />
      {label}
    </span>
  );

  return (
    <div className="Font-Segoe-Small">
      <div style={{ marginTop: "10px" }}>
        <div style={styles.container}>
          <div style={styles.iconRow}>
            <IconButton
              icon={GiGiftOfKnowledge}
              label="Add to Cyclopedia"
              onClick={() => toggleExpand("cyclopedia")}
            />
            <IconButton
              icon={GiSpiderWeb}
              label="Add a Website"
              onClick={() => toggleExpand("website")}
            />
            <IconButton
              icon={MdTask}
              label="Add a Task"
              onClick={() => toggleExpand("task")}
            />
            <IconButton
              icon={TbBrandOauth}
              label="OAuth2.0"
              onClick={() => toggleExpand("bearerToken")}
            />
            <IconButton
              icon={TbBrandSocketIo}
              label="WebSocket"
              onClick={() => toggleExpand("webSocket")}
            />
            <IconButton
              icon={BsSearch}
              label="Search"
              onClick={() => toggleExpand("search")}
            />
          </div>

          {/* Cyclopedia Form */}
          {isExpanded.cyclopedia && (
            <form onSubmit={handleCyclopediaSubmit} style={styles.form}>
              <input
                style={styles.input}
                placeholder="Cyclopedia Name (required)"
                value={cyclopedia.name}
                onChange={(e) =>
                  setCyclopedia((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
              <input
                style={styles.inputWide}
                placeholder="Cyclopedia URL (optional)"
                value={cyclopedia.url}
                onChange={(e) =>
                  setCyclopedia((p) => ({ ...p, url: e.target.value }))
                }
              />
              <button style={styles.button}>Memorialize</button>
              <textarea
                style={styles.textarea}
                placeholder="Cyclopedia Description (required)"
                value={cyclopedia.desc}
                onChange={(e) =>
                  setCyclopedia((p) => ({ ...p, desc: e.target.value }))
                }
                required
              />
            </form>
          )}

          {/* Website Form */}
          {isExpanded.website && (
            <form onSubmit={handleWebsiteSubmit} style={styles.form}>
              <input
                style={styles.input}
                placeholder="Website (required)"
                value={website.name}
                onChange={(e) =>
                  setWebsite((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
              <input
                style={styles.inputWide}
                placeholder="Website URL (optional)"
                value={website.url}
                onChange={(e) =>
                  setWebsite((p) => ({ ...p, url: e.target.value }))
                }
              />
              <button style={styles.button}>Memorialize</button>
              <select
                style={styles.select}
                onChange={(e) =>
                  setWebsite((p) => ({
                    ...p,
                    cat:
                      e.target.options[e.target.selectedIndex].getAttribute(
                        "data-category"
                      ) || "",
                  }))
                }
                required
              >
                <option value="" disabled selected hidden>
                  Category
                </option>
                {websiterootdata &&
                  Array.from(
                    new Set(websiterootdata.map((w) => w.websiteCat))
                  )
                    .sort()
                    .filter((c) => !c.startsWith("HOWTO"))
                    .map((c) => (
                      <option key={c} data-category={c}>
                        {c}
                      </option>
                    ))}
              </select>
            </form>
          )}

          {/* Task Form */}
          {isExpanded.task && (
            <form onSubmit={handleTaskSubmit} style={styles.form}>
              <select style={styles.select} onChange={handleDropdownChange}>
                <option value="" disabled selected>
                  Task Module
                </option>
                <option value="188118" data-value2="UserStory">
                  BesterDev User Story
                </option>
                <option value="171593" data-value2="Dutch Language">
                  Dutch Language Staatsexamen NT2
                </option>
                <option value="168272" data-value2="Dissertation">
                  Dissertation
                </option>
              </select>

              <input
                style={styles.inputWide}
                placeholder="Task Name"
                value={task.name}
                onChange={(e) =>
                  setTask((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
              <button style={styles.button}>Memorialize</button>

              <div style={{ marginTop: "10px" }}>
                <input
                  style={styles.inputWide}
                  placeholder="Task Description"
                  value={task.requirement}
                  onChange={(e) =>
                    setTask((p) => ({ ...p, requirement: e.target.value }))
                  }
                />
                <DatePicker
                  selected={task.targetDate}
                  onChange={(date) =>
                    setTask((p) => ({ ...p, targetDate: date }))
                  }
                  dateFormat="yyyy.MM.dd"
                  minDate={new Date()}
                  placeholderText="Target Date"
                />
              </div>
            </form>
          )}

          {/* Conditional Components */}
          {isExpanded.bearerToken && <BearerToken />}
          {isExpanded.webSocket && <WebSocketComponent />}
          {isExpanded.search && <DBSearchComponentBanner />}
        </div>
      </div>
    </div>
  );
}

// --- Styles ---
const styles = {
  container: {
    border: "1px solid #e0dedeff",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#f7f4f3",
    width: "50%",
    margin: "0 auto",
    boxShadow: "10px 10px 10px rgba(0,0,0,0.2)",
    fontFamily: "Segoe UI",
    fontSize: "16px",
  },
  iconRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    cursor: "pointer",
  },
  iconSpan: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "6px",
    marginLeft: "20px",
  },
  icon: { color: "#4D4D4D", fontSize: "18px" },
  form: { marginTop: "10px" },
  input: {
    fontFamily: "Segoe UI",
    height: "28px",
    border: "1.25px solid #336791",
    borderRadius: "4px",
    paddingLeft: "4px",
    width: "300px",
    marginLeft: "50px",
  },
  inputWide: {
    fontFamily: "Segoe UI",
    height: "28px",
    border: "1.25px solid #336791",
    borderRadius: "4px",
    paddingLeft: "4px",
    width: "450px",
    marginBottom: "20px",
    marginLeft: "10px"
  },
  textarea: {
    fontFamily: "Segoe UI",
    border: "1.25px solid #336791",
    borderRadius: "4px",
    paddingLeft: "4px",
    width: "770px",
    height: "60px",
    marginLeft: "50px",
    marginTop: "10px",
  },
  select: {
    height: "32.5px",
    border: "1.25px solid #336791",
    borderRadius: "4px",
    paddingLeft: "4px",
    width: "310px",
    marginLeft: "50px",
    marginTop: "20px",
    marginBottom: "20px",
    fontFamily: "Segoe UI",
  },
  button: {
    marginLeft: "20px",
    height: "28px",
    border: "1px solid #336791",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#336791",
    cursor: "pointer",
  },
};
