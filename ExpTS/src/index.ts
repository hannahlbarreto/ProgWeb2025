import express from "express";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import logger from "./middlewares/logger";
import router from "./router/router";
import cookieParser from "cookie-parser";
import session from "express-session";
import { v4 } from "uuid";

declare module "express-session" {
  interface SessionData { 
    uid: string;
  } 
}

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3030;

app.engine(
  "handlebars",
  engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`),
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(logger("combined"));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  session({
    genid: () => v4(), // usamos UUID para gerar os SESSID
    secret: "Hi9Cf#mK98",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
