import { Request, Response } from "express";
import { LoremIpsum } from "lorem-ipsum";

function generateLorem(paragraphs: string) {
  const loremDefinitions = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 5,
    },
    wordsPerSentence: {
      max: 16,
      min: 8,
    },
  });

  const numParagraphs = parseInt(paragraphs, 10);

  return Array.from({ length: numParagraphs }, () =>
    loremDefinitions.generateParagraphs(1)
  ).join("</br></br>");
}

const lorem = (req: Request, res: Response) => {
  res.send(generateLorem(req.params.paragraphs));
};

const about = (req: Request, res: Response) => {
  res.send("Sobre a página!");
};

const index = (req: Request, res: Response) => {
  res.send("Hello World!");
};

const hb1 = (req: Request, res: Response) => {
  res.render("main/hb1", {
    mensagem: "Olá, você está aprendendo Express + HBS!",
  });
};

const hb2 = (req: Request, res: Response) => {
  res.render("main/hb2", {
    poweredByNodejs: true,
    name: "Express",
    type: "Framework",
  });
};

const hb3 = (req: Request, res: Response) => {
  const profs = [
    { name: "David Fernandes", room: 1238 },
    { name: "Horácio Fernandes", room: 1233 },
    { name: "Edleno Moura", room: 1236 },
    { name: "Elaine Harada", room: 1231 },
  ];
  res.render("main/hb3", { profs });
};

const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { name: "Express", type: "Framework", poweredByNodejs: true },
    { name: "Laravel", type: "Framework", poweredByNodejs: false },
    { name: "React", type: "Library", poweredByNodejs: true },
    { name: "Handlebars", type: "Engine View", poweredByNodejs: true },
    { name: "Django", type: "Framework", poweredByNodejs: false },
    { name: "Docker", type: "Virtualization", poweredByNodejs: false },
    { name: "Sequelize", type: "ORM tool", poweredByNodejs: true },
  ];
  res.render("main/hb4", { technologies });
};

function createCookie(req: Request, res: Response) {
  if(req.cookies.test) {
    res.send(`Vocâ já tinha o cookie ${req.cookies.test}`);
  }else {
    res.cookie("test", "1");
    res.send("Vocâ não tinha o cookie, agora tem");
  }
}

const clearCookie = function (req: Request, res: Response) {
  res.clearCookie("Cookie de teste");
  res.send("cookie apagado");
};

export default { lorem, about, index, hb1, hb2, hb3, hb4, createCookie, clearCookie };
