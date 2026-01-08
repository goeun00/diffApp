import { useState, useEffect } from "react";

const Convert = ({ title, icon }) => {
  const [filePath, setFilePath] = useState("");
  const [filePath2, setFilePath2] = useState("");
  const [mockupUrl, setMockupUrl] = useState("");
  const [cssUrl, setCssUrl] = useState("");
  const [info, setInfo] = useState(null);

  const regexPage =
    /(?:.*[\\/])?(?:workspaces[\\/])?([^\\/]+)[\\/]src[\\/]pages[\\/](html[\\/].*?)(?:[\\/]index)?\.astro$/;
  const regexCss =
    /(?:.*[\\/])?(?:workspaces[\\/])?([^\\/]+)[\\/]src[\\/]pages[\\/]html[\\/](.*)\.css$/;

  const parsePathInfo = (path) => {
    const match = path.match(regexPage);
    if (!match) return null;
    return {
      project: match[1],
      pagePath: match[2].replace(/^html[\\/]/, "").split(/[\\/]/)[0],
    };
  };
  useEffect(() => {
    if (!filePath.trim()) {
      setInfo(null);
      setMockupUrl("");
      return;
    }
    const matched = filePath.match(regexPage);
    if (!matched) {
      setInfo(null);
      setMockupUrl("");
      return;
    }
    const url = filePath.replace(regexPage, "//$1-app-starro.d3.clouz.io/$2");
    setMockupUrl(url);
    setInfo(parsePathInfo(filePath));
  }, [filePath]);

  useEffect(() => {
    if (!filePath2.trim()) {
      setCssUrl("");
      return;
    }
    const matched = filePath2.match(regexCss);
    if (!matched) {
      setCssUrl("");
      return;
    }
    const project = matched[1];
    const cssPath = matched[2];
    const platform = project.includes("mobile") ? "mobile" : "desktop";
    const pathParts = cssPath.split(/[\\/]/);
    const page = pathParts[0];
    const finalFile = `${page}.css`;
    const url = `//script.gmarket.co.kr/starro/${platform}/css/${page}/${finalFile}`;
    setCssUrl(url);
  }, [filePath2]);

  const copyPageUrl = async () => {
    if (mockupUrl) await navigator.clipboard.writeText(mockupUrl);
  };
  const copyCssUrl = async () => {
    if (cssUrl) await navigator.clipboard.writeText(cssUrl);
  };
  const isInvalidPage = !info;
  const isInvalidCss = !cssUrl;

  return (
    <section className="box_main">
      <h2 className="text_title2">
        {title} <span className="material-symbols-outlined">{icon}</span>
      </h2>

      <div className="box_content">
        <div className="box_title-wrap">
          <h3 className="text_title3">[starro] patch → mockup page</h3>
          <p className="text_descript">
            스타로 파일 경로를 목업 페이지 링크로 바꿔욤
          </p>
        </div>

        <div className="box_entry left">
          <div className="box_entry-inner flex">
            <div className="box_form-wrap">
              <input
                className="form_entry form_entry-copy full"
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
                placeholder="file path"
              />
              <button
                className="button_from"
                onClick={copyPageUrl}
                disabled={isInvalidPage}
              >
                <span className="material-symbols-outlined icon">
                  content_copy
                </span>
              </button>
            </div>

            <a
              href={mockupUrl}
              className={`submit_entry mini ${isInvalidPage ? "disabled" : ""}`}
              target="_blank"
              onClick={(e) => isInvalidPage && e.preventDefault()}
            >
              <span className="material-symbols-outlined icon">
                arrow_right_alt
              </span>
            </a>
          </div>
        </div>

        {info ? (
          <div className="box_preview">
            <p className="text_descript">
              <strong>- 프로젝트:</strong> {info.project}
            </p>
            <p className="text_descript">
              <strong>- 서비스명:</strong> {info.pagePath}
            </p>
          </div>
        ) : (
          <div className="box_error">
            <span className="material-symbols-outlined icon">error</span>알맞은
            경로를 넣어주세요 'ㅁ'
          </div>
        )}
      </div>

      {/* ⭐ CSS 변환 */}
      <div className="box_content">
        <div className="box_title-wrap">
          <h3 className="text_title3">[starro] patch → css link</h3>
          <p className="text_descript">스타로 css 경로를 운영 링크로 바꿔욤</p>
        </div>

        <div className="box_entry left">
          <div className="box_entry-inner flex">
            <div className="box_form-wrap">
              <input
                className="form_entry form_entry-copy full"
                value={filePath2}
                onChange={(e) => setFilePath2(e.target.value)}
                placeholder="css file path"
              />
              <button
                className="button_from"
                onClick={copyCssUrl}
                disabled={isInvalidCss}
              >
                <span className="material-symbols-outlined icon">
                  content_copy
                </span>
              </button>
            </div>

            <a
              href={cssUrl}
              className={`submit_entry mini ${isInvalidCss ? "disabled" : ""}`}
              target="_blank"
              onClick={(e) => isInvalidCss && e.preventDefault()}
            >
              <span className="material-symbols-outlined icon">
                arrow_right_alt
              </span>
            </a>
          </div>
        </div>

        {cssUrl ? (
          <div className="box_preview">
            <p className="text_descript">
              <strong>- 링크:</strong> {cssUrl}
            </p>
          </div>
        ) : (
          <div className="box_error">
            <span className="material-symbols-outlined icon">error</span>알맞은
            경로를 넣어주세요 'ㅁ'
          </div>
        )}
      </div>
    </section>
  );
};

export default Convert;
