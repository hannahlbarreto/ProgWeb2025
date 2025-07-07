import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const PATH = process.env.LOG_FOLDER || "./logs";

export default function logger(type: "combined" | "short") {
  return (req: Request, res: Response, next: NextFunction) => {
    fs.access(PATH, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(PATH, { recursive: true }, (mkdirErr) => {
          if (mkdirErr) {
            console.error("Erro ao criar a pasta de logs:", mkdirErr);
            return next();
          }

          writeLog(req, type);
          next();
        });
      } else {
        writeLog(req, type);
        next();
      }
    });
  };
}

function writeLog(req: Request, type: "combined" | "short") {
  let logMessage: string;
  const date = new Date().toISOString();

  if (type === "combined") {
    logMessage = `${date} ${req.url} ${req.method} ${
      req.httpVersion
    } ${req.get("User-agent")}`;
  } else {
    logMessage = `${new Date().toDateString()} ${req.url} ${req.method}`;
  }

  const logFilePath = path.join(PATH, `${date}.log`);

  fs.appendFile(logFilePath, logMessage + "\n", (err) => {
    if (err) {
      console.error("Erro ao escrever no arquivo de log:", err);
    }
  });
}
