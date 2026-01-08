import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { repositoriesAtom } from "../atom";

const Diff = ({ title, icon }) => {
  const [repositories] = useAtom(repositoriesAtom);
  const [selectedRepoName, setSelectedRepoName] = useState(repositories[0].name);
  const [compare1, setCompare1] = useState("");
  const [compare2, setCompare2] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const selectedRepo = useMemo(() => repositories?.find((r) => r.name === selectedRepoName), [selectedRepoName]);

  const diffUrl = useMemo(() => {
    if (!selectedRepo || !compare1 || !compare2) return "";
    return `${selectedRepo.url}/compare/${compare1}...${compare2}`;
  }, [selectedRepo, compare1, compare2]);

  useEffect(() => {
    setResultUrl(diffUrl);
  }, [diffUrl]);

  const activate = !!diffUrl;

  const copyToClipboard = async () => {
    if (!resultUrl) return;
    await navigator.clipboard.writeText(resultUrl);
  };

  return (
    <section className="box_main">
      <h2 className="text_title2">
        {title} <span className="material-symbols-outlined">{icon}</span>
      </h2>

      <ul className="list_option" role="radiogroup" aria-label="Repository">
        {repositories.map((repo, idx) => (
          <li className="list-item" key={repo.name}>
            <input type="radio" id={`repository-${idx}`} name="repository" className="form_repository" value={repo.name} checked={selectedRepoName === repo.name} onChange={(e) => setSelectedRepoName(e.target.value)} />
            <label htmlFor={`repository-${idx}`}>{repo.name}</label>
          </li>
        ))}
      </ul>

      <div className="box_entry">
        <div className="box_entry-inner">
          <span className="text_entry-line">origin</span>
          <input id="compare1" className="form_entry" type="text" value={compare1} onChange={(e) => setCompare1(e.target.value)} autoComplete="off" />
        </div>
        <div className="box_entry-inner">
          <span className="text_entry-line">change</span>
          <input id="compare2" className="form_entry" type="text" value={compare2} onChange={(e) => setCompare2(e.target.value)} autoComplete="off" />
        </div>
      </div>

      <div className="box_result">
        <p className="text_result">{resultUrl || "비교 대상을 입력해주세요."}</p>
      </div>

      <div className="box_main-bottom">
        <button className="submit_entry submit" type="button" onClick={copyToClipboard}>
          <span className="material-symbols-outlined icon">content_copy</span>
          Link copy
        </button>

        <a className={activate ? "link_entry" : "link_entry deactivate"} href={diffUrl || "#"} target="_blank" rel="noopener noreferrer" aria-disabled={!activate}>
          Go Link
          <span className="material-symbols-outlined icon">arrow_right_alt</span>
        </a>
      </div>
    </section>
  );
};

export default Diff;
