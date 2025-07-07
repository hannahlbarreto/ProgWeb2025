import { Prof, Technology, PathHref } from "./helpersType";

export function listProfs(profs: Prof[]) {
  const list = profs.map((p) => `<li>${p.name}-${p.room}</li>`);
  return `<ul>${list.join("")}</ul>`;
}

export function listTechnologies(technologies: Technology[]) {
  const list = technologies
    .filter((t) => t.poweredByNodejs)
    .map((t) => `<li>${t.name} - ${t.type}</li>`)
    .join("");
  return `<ul>${list}</ul>`;
}
