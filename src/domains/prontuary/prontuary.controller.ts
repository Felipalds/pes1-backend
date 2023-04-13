import { Router, Request, Response } from "express";
import { readFile, readFileSync } from "fs";

class Prontuary {
  patient_name: String;
  patient_data: Object;

  constructor(patient_name: string, patient_data: Object) {
    this.patient_name = patient_name;
    this.patient_data = patient_data;
  }
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  // TODO GET DADOS
  return res.send("AAAA")
  return res.send(() => {
    let data = readFileSync("prontuary_template.json", "utf-8")
    return data
  })
});

export default router;