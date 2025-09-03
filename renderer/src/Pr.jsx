import { useEffect, useMemo, useRef, useState } from "react";

const Pr = ({ REPOSITORIES, GITHUB_BASE }) => {
  const [repository, setRepository] = useState(REPOSITORIES[0].name);
  const [compare1, setCompare1] = useState(REPOSITORIES[0].mainbranch[0]);
  const [compare2, setCompare2] = useState("feature/");
  const [resultUrl, setResultUrl] = useState("");
  const [activate, setActivate] = useState(false);
  const textareaRef = useRef(null);

  const prLink = useMemo(() => {
    if (!compare1 || !compare2 || !repository) {
      setActivate(false);
      return "";
    } else {
      setActivate(true);
      return `${GITHUB_BASE}${repository}/compare/${compare1}...${compare2}`;
    }
  }, [repository, compare1, compare2]);

  useEffect(() => {
    const selectedRepo = REPOSITORIES.find((repo) => repo.name === repository);
    if (selectedRepo) {
      setCompare1(selectedRepo.mainbranch[0]);
    }
  }, [repository]);

  useEffect(() => {
    setResultUrl(prLink);
  }, [prLink]);

  const copyToClipboard = () => {
    textareaRef.current.select();
    document.execCommand("copy");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    copyToClipboard(prLink);
  };

  return (
    <section className="box_main">
      <h2 className="text_title2">
        PR <span className="material-symbols-outlined">rebase_edit</span>
      </h2>
      <ul className="list_option" role="radiogroup" aria-label="Repository">
        {REPOSITORIES.map((repo, idx) => (
          <li className="list-item" key={repo.name}>
            <input
              type="radio"
              id={`repository-${idx}`}
              name="repository"
              className="form_repository"
              value={repo.name}
              checked={repository === repo.name}
              onChange={(e) => setRepository(e.target.value)}
            />
            <label htmlFor={`repository-${idx}`}>{repo.name}</label>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit} className="form">
        <div className="box_entry">
          <div className="box_entry-inner">
            <select
              value={compare1}
              className="select-custom"
              onChange={(e) => setCompare1(e.target.value)}
            >
              {REPOSITORIES.find(
                (repo) => repo.name === repository
              ).mainbranch.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>

            <input
              id="compare2"
              className="form_entry form_entry-single"
              type="text"
              value={compare2}
              onChange={(e) => setCompare2(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="box_result">
          <p className="text_result">{resultUrl || "브랜치를 입력해주세요."}</p>
          <textarea
            ref={textareaRef}
            className="form_result"
            value={resultUrl}
            onChange={(e) => setResultUrl(e.target.value)}
            rows={4}
            spellCheck={false}
          />
        </div>
      </form>
      <div className="box_main-bottom">
        <button className="submit_entry submit" type="submit">
          <span className="material-symbols-outlined icon">content_copy</span>
          Link copy
        </button>
        <a
          className={activate ? "link_entry" : "link_entry deactivate"}
          href={prLink}
          target="blank_"
        >
          Go Link
          <span className="material-symbols-outlined icon">
            arrow_right_alt
          </span>
        </a>
      </div>
    </section>
  );
};
export default Pr;
