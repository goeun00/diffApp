// Pr.jsx
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { repositoriesAtom } from "./atom";

const Pr = () => {
  const [repositories] = useAtom(repositoriesAtom);

  const [selectedRepoName, setSelectedRepoName] = useState(
    repositories[0].name
  );

  const selectedRepo = useMemo(
    () => repositories.find((r) => r.name === selectedRepoName),
    [selectedRepoName]
  );

  const [compare1, setCompare1] = useState(selectedRepo?.mainbranch?.[0] ?? "");
  const [compare2, setCompare2] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  useEffect(() => {
    if (selectedRepo?.mainbranch?.length) {
      setCompare1(selectedRepo.mainbranch[0]);
    } else {
      setCompare1("");
    }
  }, [selectedRepo]);

  const prLink = useMemo(() => {
    if (!selectedRepo || !compare1 || !compare2) return "";
    return `${selectedRepo.url}/compare/${compare1}...${compare2}`;
  }, [selectedRepo, compare1, compare2]);

  useEffect(() => {
    setResultUrl(prLink);
  }, [prLink]);

  const activate = !!prLink;

  const copyToClipboard = async () => {
    if (!resultUrl) return;
    await navigator.clipboard.writeText(resultUrl);
  };

  return (
    <section className="box_main">
      <h2 className="text_title2">
        PR <span className="material-symbols-outlined">rebase_edit</span>
      </h2>

      <ul className="list_option" role="radiogroup" aria-label="Repository">
        {repositories.map((repo, idx) => (
          <li className="list-item" key={repo.name}>
            <input
              type="radio"
              id={`repository-${idx}`}
              name="repository"
              className="form_repository"
              value={repo.name}
              checked={selectedRepoName === repo.name}
              onChange={(e) => setSelectedRepoName(e.target.value)}
            />
            <label htmlFor={`repository-${idx}`}>{repo.name}</label>
          </li>
        ))}
      </ul>

      <div className="box_entry">
        <div className="box_entry-inner">
          <select
            value={compare1}
            className="select-custom"
            onChange={(e) => setCompare1(e.target.value)}
          >
            {(selectedRepo?.mainbranch ?? []).map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>

          <input
            id="compare2"
            className="form_entry single "
            type="text"
            value={compare2}
            onChange={(e) => setCompare2(e.target.value)}
            autoComplete="off"
            placeholder="your-branch"
          />
        </div>
      </div>

      <div className="box_result">
        <p className="text_result">{resultUrl || "브랜치를 입력해주세요."}</p>
      </div>

      <div className="box_main-bottom">
        <button
          className="submit_entry submit"
          type="button"
          onClick={copyToClipboard}
        >
          <span className="material-symbols-outlined icon">content_copy</span>
          Link copy
        </button>

        <a
          className={activate ? "link_entry" : "link_entry deactivate"}
          href={prLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!activate}
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
