import http from "http";
import fs from "fs/promises";
import dotenv from "dotenv";
import { criarLink } from "./util.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 3333;

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    const folder = process.argv.length > 2 ? process.argv[2] : "node1";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<ul>");
    try {
      const files = await fs.readdir(folder);
      files.forEach((file) => {
        res.write(criarLink(file));
      });
    } catch (err) {
      res.write("Diretorio não existe");
    }
    res.write("</ul>");
    res.end();
  } else {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.write("<div>");
    res.write(`<a href="/">Voltar</a>`);
    const path = req.url.replace("/", "");
    try {
      const content = await fs.readFile(`${process.argv[2]}/${path}`);
      res.write(`<div>${content}</div>`);
    } catch (err) {
      res.write(`<div>Olá, não é um arquivo!</div>`);
    }
    res.write("</div>");
    res.end();
  }
});

server.listen(PORT);
