import { Router, Request, Response } from "express";
import * as path from "path";
import fs from "fs";
import Prontuary from "./prontuary.service";

const PATH = path.join(__dirname, "./prontuary_template.json");

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  console.log(id);
  const prontuary = new Prontuary(id);
  return res.send(prontuary.content);
});

router.post("/:id", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const id = Number(req.params.id);
    fs.writeFileSync(id + ".json", JSON.stringify(req.body));
    return res.status(200).json({ OK: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
});

export default router;
