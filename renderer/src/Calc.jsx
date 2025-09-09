import { useState } from "react";

const Calc = () => {
  const [compare1, setCompare1] = useState("1");
  const [compare2, setCompare2] = useState("0.5");
  const [compare3, setCompare3] = useState("1");
  const [compare4, setCompare4] = useState("10");
  const [compare5, setCompare5] = useState("1");
  const [compare6, setCompare6] = useState("10");
  const [compare7, setCompare7] = useState("1");
  const [compare8, setCompare8] = useState("10");
  const [compare9, setCompare9] = useState("1");
  const [compare10, setCompare10] = useState("10");

  return (
    <section className="box_main">
      <h2 className="text_title2">
        calc <span className="material-symbols-outlined">calculate</span>
      </h2>
      <div className="box_entry left line">
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare1}
            onChange={(e) => setCompare1(e.target.value)}
            autoComplete="off"
          />
          <span className="text_entry-basic">에서</span>
        </div>
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare2}
            onChange={(e) => setCompare2(e.target.value)}
            autoComplete="off"
          />
          <span className="text_entry-basic">은/는</span>
        </div>
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={(compare2 / compare1) * 100}
            readOnly
          />
          <span className="text_entry-basic">%</span>
        </div>
      </div>
      <div className="box_entry left line">
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare3}
            onChange={(e) => setCompare3(e.target.value)}
            autoComplete="off"
          />
          <span className="text_entry-basic">의</span>
        </div>
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare4}
            onChange={(e) => setCompare4(e.target.value)}
            autoComplete="off"
          />
          <span className="text_entry-basic">% 는</span>
        </div>
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={(compare3 * compare4) / 100}
            readOnly
          />
        </div>
      </div>
      <div className="box_entry left line">
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare5}
            onChange={(e) => setCompare5(e.target.value)}
            autoComplete="off"
          />
          <span className="text_entry-basic">이/가</span>
        </div>
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare6}
            onChange={(e) => setCompare6(e.target.value)}
            autoComplete="off"
          />
          <span className="text_entry-basic">% 증가하면</span>
        </div>
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare5 * (1 + compare6 / 100)}
            readOnly
          />
        </div>
      </div>
      <div className="box_entry left line">
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare7}
            onChange={(e) => setCompare7(e.target.value)}
            autoComplete="off"
          />
          <span className="text_entry-basic">이/가</span>
        </div>
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare8}
            onChange={(e) => setCompare8(e.target.value)}
            autoComplete="off"
          />
          <span className="text_entry-basic">% 감소하면</span>
        </div>
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare7 * (1 - compare8 / 100)}
            readOnly
          />
        </div>
      </div>
      <div className="box_entry left">
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare9}
            onChange={(e) => setCompare9(e.target.value)}
            autoComplete="off"
          />
          <span className="text_entry-basic">이/가</span>
        </div>
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={compare10}
            onChange={(e) => setCompare10(e.target.value)}
            autoComplete="off"
          />
          <span className="text_entry-basic">이/가 되면</span>
        </div>
        <div className="box_entry-inner">
          <input
            className="form_entry triple"
            type="text"
            value={((compare10 - compare9) / compare9) * 100}
            readOnly
          />
          <span className="text_entry-basic">
            %{((compare10 - compare9) / compare9) * 100 > 0 ? " 증가" : " 감소"}
          </span>
        </div>
      </div>
    </section>
  );
};
export default Calc;
