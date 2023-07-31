import { Router, Request, Response } from 'express'
import bcrypt from "bcrypt"
import * as path from "path"
import fs from "fs"
import User from "./users.service"
const PATH = path.join(__dirname, "./users.json")

const router = Router()

router.post("/create", async (req: Request, res: Response) => {
    try{
        const { name, email, password } = req.body

        const file = fs.readFileSync(PATH)
        const json = JSON.parse(file.toString())
        for(const user of json){
            if(user.email == email){
                throw new Error("Usuário já registrado")
            }
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User(name, email, hashPassword)
        json.push(newUser)
        fs.writeFileSync(PATH, JSON.stringify(json))
        return res.status(200).json({"OK": "OK"})
    } catch(error){
        console.log(error)
        return res.status(500).json("error")
    }
})

router.post("/login", async(req: Request, res: Response) => {
    try{

		const { email, password } = req.body
        console.log(req.body)
        console.log(email, password)

        let findEmail = false
        let verifyPass = false

        const file = fs.readFileSync(PATH)
            const json = JSON.parse(file.toString())
            for(const user of json) {
                if(user.email = email){
                    findEmail = true
                    verifyPass = await bcrypt.compare(password, user.password)
                }
            }

		if (!findEmail) {
			throw new Error("Email ou Senha inválidos")
		}

		if (!verifyPass) {
			throw new Error("Email ou Senha inválidos")
		}
    
		return res.send(true)
    } catch(error) {
        return res.send(false)
    }
})

export default router