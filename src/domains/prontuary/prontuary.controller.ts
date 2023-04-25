import { Router, Request, Response } from "express";
import {
  Prontuary
} from "../../database";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const user_id = Number.isNaN(Number(req.query.user_id))
    ? "all"
    : Number(req.query.user_id);
  const title = req.query.title;
  const n = Number.isNaN(Number(req.query.n)) ? "all" : Number(req.query.n);
  const prontuary = new Prontuary(user_id, title)
  prontuary.get(n)
    .then((rows) => {
      res.send(rows);
    })
    .catch((error) => {
      console.error(`Error while getting prontuaries: ${error}`);
      return res.send({});
    });
});

router.post("/create", (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  const prontuary = new Prontuary(user_id)
  prontuary.create(title)
    .then((message) => {
      res.send(message);
    })
    .catch((error) => {
      console.error(`Error while creating prontuaries: ${error}`);
      res.send("Fail.");
    });
});

router.post("/delete", (req: Request, res: Response) => {
  const { user_id, table_id } = req.body;
  const prontuary = new Prontuary(user_id)
  prontuary.delete(table_id)
    .then((message) => {
      res.send(message);
    })
    .catch((error) => {
      console.error(`Error while deleting prontuaries`);
      res.send("Fail.");
    });
});

export default router;
