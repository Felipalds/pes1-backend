import { Router, Request, Response } from 'express'
import bcrypt from "bcrypt"
import * as path from "path"
import fs from "fs"
import User from "./users.service"
const PATH = path.join(__dirname, "./professionals.json")

export class UserController {
	async create(req: Request, res: Response) {
        try{
            const { name, lastName, username, email, password } = req.body

            const file = fs.readFileSync(PATH)
            const json = JSON.parse(file.toString())
            json.array.forEach((user: User) => {
                if(user.email == email){
                    throw new Error("Usuário já registrado")
                }
            });

            const hashPassword = await bcrypt.hash(password, 10)

            const newUser = new User(name, lastName, username, email, hashPassword)
            json.push(newUser)
            fs.writeFileSync(PATH, JSON.stringify(json))
            return res.status(200).json({"OK": "OK"})
        } catch(error){
            console.log(error)
            return res.status(500).json("error")
        }

	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body

        let findEmail = false
        let verifyPass = false

        const file = fs.readFileSync(PATH)
            const json = JSON.parse(file.toString())
            json.array.forEach(async(user: User) => {
                if(user.email = email){
                    findEmail = true
                    const verifyPass = await bcrypt.compare(password, user.password)
                }
            });

		if (!findEmail) {
			throw new Error("Email ou Senha inválidos")
		}


		if (!verifyPass) {
			throw new Error("Email ou Senha inválidos")
		}

		
		

		return res.json({
			logged: true
		})
	}

}