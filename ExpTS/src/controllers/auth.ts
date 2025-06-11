import { Request, Response } from "express";
import { getMajors } from "../service/major";
import { createUser } from "../service/user";
import { checkAuth } from "../service/auth";

const signup = async (req: Request, res: Response) => {
  if (req.method == "GET") {
    const majors = await getMajors();
    const session = req.session;

    res.render("auth/signup", { majors, session });
  } else {
    try {
      await createUser(req.body);
      res.redirect("/auth/login");
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
};

const login = async (req: Request, res: Response) => {
  if (req.method == "GET") {
    try {
      const { session } = req;
      res.render("auth/login", { session });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  } else { 
    try {
      const user = await checkAuth(req.body);
      if (!user) {
        res.redirect("/auth/login");
        return;
      }
      req.session.uid = user.id;
      res.redirect("/major");
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
};

const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    res.clearCookie("test");
    res.redirect("/auth/login");
  });
};

export default { signup, login, logout };
