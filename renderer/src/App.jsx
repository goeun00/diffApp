import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import "./App.css";
import Diff from "./Diff.jsx";
import Pr from "./Pr.jsx";
import Calc from "./Calc.jsx";
import Github from "./GIthub.jsx";

export default function App() {
  const [darkmode, setDarkmode] = useState(false);
  const [isOnTop, setIsOnTop] = useState(false);
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

  const navLinkList = [
    { to: "/", icon: "interests", text: "Set" },
    { to: "/Diff", icon: "draw_collage", text: "Diff" },
    { to: "/Pr", icon: "rebase_edit", text: "PR" },
    { to: "/Calc", icon: "calculate", text: "Calc" },
  ];
  const Navigation = memo(() => (
    <ul className="list_menu">
      {navLinkList.map((item, idx) => (
        <li className="list-item" key={idx}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `link ${isActive ? "link-active" : ""}`
            }
          >
            <span className="material-symbols-outlined icon">{item.icon}</span>
            <span className="text">{item.text}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  ));
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
          <Navigation />
          <button
            type="button"
            className={`button_darkmode ${darkmode ? "dark" : "light"}`}
            onClick={() => setDarkmode((prev) => !prev)}
          >
            <span className="material-symbols-outlined icon">routine</span>
          </button>
        </nav>
        <Routes>
          <Route path="/" element={<Github />} />
          <Route path="/Diff" element={<Diff />} />
          <Route path="/Pr" element={<Pr />} />
          <Route path="/Calc" element={<Calc />} />
        </Routes>
      </div>
    </div>
  );
}
