import express, { Express } from "express";
const app: Express = express();
const port: number = 5000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}🚀`);
});
