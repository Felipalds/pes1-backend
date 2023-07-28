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

            const userExists = await PAth.findOneBy({ email })

            if (userExists) {
                throw new Error("Usuário já registrado")
            }

            const hashPassword = await bcrypt.hash(password, 10)

            const newUser = new User(name, lastName, username, email, hashPassword)
            const file = fs.readFileSync(PATH)
            const json = JSON.parse(file.toString())
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

		const user = await userRepository.findOneBy({ email })

		if (!user) {
			throw new Error("Email ou Senha inválidos")
		}

		const verifyPass = await bcrypt.compare(password, user.password)

		if (!verifyPass) {
			throw new Error("Email ou Senha inválidos")
		}

		
		const { password: _, ...userLogin } = user

		return res.json({
			user: userLogin
		})
	}

}