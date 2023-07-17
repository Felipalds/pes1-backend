import { Router, Request, Response } from "express";
import { create } from "domain";

const router = Router();

// router.get("/", (req: Request, res: Response) => {
//   const user_id = Number.isNaN(Number(req.query.user_id)) ? "all" : Number(req.query.user_id);
//   const title = req.query.title;
//   const n = Number.isNaN(Number(req.query.n)) ? "all" : Number(req.query.n)
//   const answer = getUserById(user_id, title, n);
//   answer.then((rows) => {
//     res.send(rows);
//   });
// });

// router.post("/create", (req: Request, res: Response) => {
//   const { user_id, title } = req.body;
//   const answer = createProfessional(user_id, title);
//   answer.then((msg) => {
//     res.send(msg);
//   });
// });

// router.post("/delete", (req: Request, res: Response) => {
//   const { user_id, table_id } = req.body
//   const answer = deleteProfessional(user_id, table_id)
//   answer.then((msg) => {
//     res.send(msg)
//   })
// });

export default router;
