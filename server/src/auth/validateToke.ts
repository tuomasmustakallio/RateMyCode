import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// This is the middleware that checks if the user is logged in
function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else {
    token = null;
  }
  if (token == null) return res.sendStatus(401).send("Unauthorized");
  console.log("Token found");
  jwt.verify(token, process.env.SECRET as string, (err, user) => {
    if (err) return res.sendStatus(401);
    (req as any).user = user;
    next();
  });
}

export default validateToken;
