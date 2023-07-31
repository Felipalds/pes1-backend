export default class User {
    id: number | undefined
    name: string
    email: string
    password: string
    userType: string | undefined

    constructor(name: string,
        email: string,
        password: string){
        if(!name) throw new Error("No name informed")
        if(!email) throw new Error("No email informed")
        if(!password) throw new Error("No password informed")

        this.name = name
        this.email = email
        this.password = password

    }
}
