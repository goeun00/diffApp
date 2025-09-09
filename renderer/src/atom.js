import { atom } from "jotai";
export const defaultRepositories = [
  {
    name: "starro",
    url: "https://github.gmarket.com/org-publisher/starro",
    mainbranch: ["main", "stage", "dev"],
  },
  {
    name: "starro-esm",
    url: "https://github.gmarket.com/org-publisher/starro-esm",
    mainbranch: ["main", "stage", "dev"],
  },
  {
    name: "Publish.GPC",
    url: "https://github.gmarket.com/org-publisher/Publish.GMKT.PC",
    mainbranch: ["master", "stg", "dev"],
  },
  {
    name: "Publish.GMO",
    url: "https://github.gmarket.com/org-publisher/Publish.GMKT.Mobile",
    mainbranch: ["master", "stg", "dev"],
  },
  {
    name: "Publish.APC",
    url: "https://github.gmarket.com/org-publisher/Publish.IAC.PC",
    mainbranch: ["master", "stg", "dev"],
  },
  {
    name: "Publish.AMO",
    url: "https://github.gmarket.com/org-publisher/Publish.IAC.Mobile",
    mainbranch: ["master", "stg", "dev"],
  },
  {
    name: "Publish.Ebay",
    url: "https://github.gmarket.com/org-publisher/Publish.Ebay",
    mainbranch: ["master", "stg", "dev"],
  },
];

const loadRepositories = () => {
  try {
    const saved = localStorage.getItem("repositories");
    return saved ? JSON.parse(saved) : defaultRepositories;
  } catch {
    return defaultRepositories;
  }
};

export const repositoriesAtom = atom(loadRepositories());
