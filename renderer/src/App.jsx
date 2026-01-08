import { Routes, Route, NavLink } from "react-router-dom";
import React, { useEffect, useState, memo } from "react";
import "./App.css";
import Diff from "./pages/Diff.jsx";
import Pr from "./pages/Pr.jsx";
import Calc from "./pages/Calc.jsx";
import Github from "./pages/GIthub.jsx";
import Convert from "./pages/Convert.jsx";

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

  const [miniMode, setMiniMode] = useState(false);

  useEffect(() => {
    window.winControl?.onMiniMode((flag) => {
      setMiniMode(flag);
    });
  }, []);

  useEffect(() => {
    if (miniMode) {
      window?.winControl?.onTop(true);
    }
  }, [miniMode]);

  const navLinkList = [
    { to: "/", icon: "interests", title: "Set", element: Github },
    { to: "/Diff", icon: "draw_collage", title: "Diff", element: Diff },
    { to: "/Pr", icon: "rebase_edit", title: "PR", element: Pr },
    { to: "/Convert", icon: "link", title: "Convert", element: Convert },
    { to: "/Calc", icon: "calculate", title: "Calc", element: Calc },
  ];
  const Navigation = memo(function Navigation({ navLinkList }) {
    return (
      <ul className="list_menu">
        {navLinkList.map((item) => (
          <li className="list-item" key={item.to}>
            <NavLink to={item.to} className={({ isActive }) => `link ${isActive ? "link-active" : ""}`}>
              <span className="material-symbols-outlined icon">{item.icon}</span>
              <span className="text">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  });
  if (miniMode) {
    return (
      <div onClick={() => window.winControl?.toggleMini()} className="mini-button">
        <span className="material-symbols-outlined icon">pip_exit</span>
      </div>
    );
  }
  return (
    <div id="wrapper" className={darkmode ? "darkmode" : ""}>
      <div className="titlebar">
        <button id="min-btn" type="button" onClick={onMinimize} aria-label="Minimize">
          <span className="material-symbols-outlined icon">remove</span>
        </button>
        <button id="close-btn" type="button" onClick={onClose} aria-label="Close">
          <span className="material-symbols-outlined icon">close</span>
        </button>
        <button id="ontop-btn" type="button" onClick={() => setIsOnTop(!isOnTop)}>
          {isOnTop ? <span className="material-symbols-outlined icon active">keep</span> : <span className="material-symbols-outlined icon">keep_off</span>}
        </button>
      </div>
      <div className="box_wrap">
        <nav className="box_sidebar">
          <Navigation navLinkList={navLinkList} />
          <div className=" box_button-bottom">
            <button className="button button_darkmode" type="button" onClick={() => window.winControl?.toggleMini()}>
              <span className="material-symbols-outlined icon">pip</span>
              <i className="text_info">우측하단고정</i>
            </button>
            <button type="button" className={`button button_darkmode ${darkmode ? "dark" : "light"}`} onClick={() => setDarkmode((prev) => !prev)}>
              <span className="material-symbols-outlined icon">routine</span>
              <i className="text_info">{darkmode ? "라이트모드" : "다크모드"}</i>
            </button>
          </div>
        </nav>
        <Routes>
          {navLinkList.map(({ to, icon, title, element: Page }) => (
            <Route key={to} path={to} element={React.createElement(Page, { icon, title })} />
          ))}
        </Routes>
      </div>
    </div>
  );
}
