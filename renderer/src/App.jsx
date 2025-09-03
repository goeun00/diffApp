import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Diff from "./Diff.jsx";
import Pr from "./Pr.jsx";
import Calc from "./Calc.jsx";

let GITHUB_BASE = "https://github.gmarket.com/org-publisher/";
const REPOSITORIES = [
  { name: "starro", mainbranch: ["main", "stage", "dev"] },
  { name: "starro-esm", mainbranch: ["main", "stage", "dev"] },
  { name: "Publish.GMKT.PC", mainbranch: ["master", "stg", "dev"] },
  { name: "Publish.GMKT.Mobile", mainbranch: ["master", "stg", "dev"] },
  { name: "Publish.IAC.PC", mainbranch: ["master", "stg", "dev"] },
  { name: "Publish.IAC.Mobile", mainbranch: ["master", "stg", "dev"] },
  { name: "Publish.Ebay", mainbranch: ["master", "stg", "dev"] },
];

export default function App() {
  const [darkmode, setDarkmode] = useState(false);
  const [isOnTop, setIsOnTop] = useState(true);
  const onMinimize = () => {
    window?.winControl?.minimize();
  };
  const onClose = () => {
    window?.winControl?.close();
  };
  const windowOnTop = (toggle) => {
    window?.winControl?.onTop(toggle);
  };
  useEffect(() => {
    windowOnTop(isOnTop);
  }, [isOnTop]);

  return (
    <div id="wrapper" className={darkmode ? "darkmode" : ""}>
      <div className="titlebar">
        <button
          id="min-btn"
          type="button"
          onClick={onMinimize}
          aria-label="Minimize"
        >
          <span className="material-symbols-outlined icon">remove</span>
        </button>
        <button
          id="close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="material-symbols-outlined icon">close</span>
        </button>
        <button
          id="ontop-btn"
          type="button"
          onClick={() => setIsOnTop(!isOnTop)}
        >
          {isOnTop ? (
            <span className="material-symbols-outlined icon active">keep</span>
          ) : (
            <span className="material-symbols-outlined icon">keep_off</span>
          )}
        </button>
      </div>
      <div className="box_wrap">
        <nav className="box_sidebar">
          <ul className="list_menu">
            <li className="list-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `link ${isActive ? "link-active" : ""}`
                }
              >
                <span className="material-symbols-outlined icon">
                  draw_collage
                </span>
                <span className="text">Diff</span>
              </NavLink>
            </li>
            <li className="list-item">
              <NavLink
                to="/Pr"
                className={({ isActive }) =>
                  `link ${isActive ? "link-active" : ""}`
                }
              >
                <span className="material-symbols-outlined icon">
                  rebase_edit
                </span>
                <span className="text">PR</span>
              </NavLink>
            </li>
            <li className="list-item">
              <NavLink
                to="/Calc"
                className={({ isActive }) =>
                  `link ${isActive ? "link-active" : ""}`
                }
              >
                <span className="material-symbols-outlined icon">
                  calculate
                </span>
                <span className="text">Calc</span>
              </NavLink>
            </li>
          </ul>

          <button
            type="button"
            className={`button_darkmode ${darkmode ? "dark" : "light"}`}
            onClick={() => setDarkmode((prev) => !prev)}
          >
            <span className="material-symbols-outlined icon">routine</span>
          </button>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Diff REPOSITORIES={REPOSITORIES} GITHUB_BASE={GITHUB_BASE} />
            }
          />
          <Route
            path="/Pr"
            element={
              <Pr REPOSITORIES={REPOSITORIES} GITHUB_BASE={GITHUB_BASE} />
            }
          />
          <Route
            path="/Calc"
            element={
              <Calc REPOSITORIES={REPOSITORIES} GITHUB_BASE={GITHUB_BASE} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
