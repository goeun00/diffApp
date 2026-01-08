import { useAtom } from "jotai";
import { repositoriesAtom } from "../atom";
import { useState, useEffect } from "react";

const Diff = () => {
  const [repositories, setRepositories] = useAtom(repositoriesAtom);
  const [draft, setDraft] = useState(repositories);
  const [editmode, setEditmode] = useState(false);

  useEffect(() => {
    setDraft(repositories);
  }, [repositories]);

  const handleChangeName = (idx, value) => {
    setDraft((prev) => prev.map((repo, i) => (i === idx ? { ...repo, name: value } : repo)));
  };
  const handleChangeUrl = (idx, value) => {
    setDraft((prev) => prev.map((repo, i) => (i === idx ? { ...repo, url: value } : repo)));
  };
  const handleChangeMainbranch = (idx, newMainbranchArray) => {
    setDraft((prev) => prev.map((repo, i) => (i === idx ? { ...repo, mainbranch: newMainbranchArray } : repo)));
  };

  const handleDelete = (idx) => {
    setDraft((prev) => prev.filter((_, i) => i !== idx));
  };

  const startEdit = () => {
    setDraft(repositories);
    setEditmode(true);
  };

  const handleCancel = () => {
    setDraft(repositories);
    setEditmode(false);
  };

  const handleSave = () => {
    setRepositories(draft);
    localStorage.setItem("repositories", JSON.stringify(draft));
    setEditmode(false);
  };

  const handleAdd = () => {
    setDraft((prev) => [
      ...prev,
      {
        name: "",
        url: "",
        mainbranch: [],
      },
    ]);
  };
  return (
    <section className="box_main box_main-github">
      <div className="box_floating">
        {editmode ? (
          <>
            <button className="button" type="button" onClick={() => handleCancel()}>
              <span className="icon material-symbols-outlined">close_small</span>
            </button>
            <button className="button button_save" type="button" onClick={handleSave}>
              <span className="material-symbols-outlined">check_small</span>
            </button>
          </>
        ) : (
          <button className="button button_edit" type="button" onClick={() => startEdit()}>
            <span className="icon material-symbols-outlined">edit</span>
          </button>
        )}
      </div>
      {draft.map((repo, idx) => (
        <div className="box_entry left line wrap" key={idx}>
          <div className="box_entry-inner">
            {editmode ? (
              <button className="button_delete" type="button" onClick={() => handleDelete(idx)}>
                <span className="icon material-symbols-outlined">delete</span>
              </button>
            ) : (
              ""
            )}

            <span className="text_entry-line">name</span>
            {editmode ? <input className="form_entry" type="text" value={repo.name} onChange={(e) => handleChangeName(idx, e.target.value)} /> : <span className="text_entry-basic bold">{repo.name}</span>}
          </div>
          <div className="box_entry-inner flex">
            <span className="text_entry-line">url</span>
            {editmode ? (
              <input className="form_entry single " type="text" value={repo.url} onChange={(e) => handleChangeUrl(idx, e.target.value)} />
            ) : (
              <span className="text_entry-basic">
                <a className="link_text" href={repo.url}>
                  {repo.url.replace(/https?:/, "")}
                </a>
              </span>
            )}
          </div>
          <div className="box_entry-inner flex">
            <span className="text_entry-line">mainbranch</span>
            {editmode ? (
              <input
                className="form_entry single "
                type="text"
                value={(repo.mainbranch || []).join(",")}
                onChange={(e) =>
                  handleChangeMainbranch(
                    idx,
                    e.target.value.split(",").map((v) => v.trim())
                  )
                }
              />
            ) : (
              <span className="text_entry-basic">
                {(repo.mainbranch || []).map((branch, idx) => (
                  <span className="text__tag" key={idx}>
                    {branch}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      ))}
      {editmode && (
        <div className="box_add-repositoty">
          <button className="button_add-repositoty" type="button" onClick={() => handleAdd()}>
            <span className="icon material-symbols-outlined">add</span>
          </button>
          <p className="text">add repository</p>
        </div>
      )}
    </section>
  );
};

export default Diff;
