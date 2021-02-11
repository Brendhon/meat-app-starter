import { Request, Response } from "express";
import { User, users } from "./users";

import * as jwt from "jsonwebtoken";
import {API_CONFIG} from './api.config'

export const handleAuth = (req: Request, resp: Response) => {
  const user = req.body;

  if (isValid(user)) {
    const dbUser: User = users[user.email];

    // sub - Portador do Token
    // iss -  Quem emitiu o Token
    const token = jwt.sign({
      sub: dbUser.email,
      iss: "meat-api",
    }, API_CONFIG.secret);

    resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });

  } else {
    resp.status(403).json({ message: "Dados inválidos" });
  }
};

function isValid(user: User): boolean {
  if (!user) {
    return false;
  }

  const dbUser = users[user.email];
  return dbUser !== undefined && dbUser.matches(user);
}
