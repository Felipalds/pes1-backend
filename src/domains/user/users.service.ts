export default class User {
    id: number | undefined
    name: string
    lastName: string
    username: string
    email: string
    password: string
    userType: string | undefined

    constructor(name: string,
        lastName: string,
        username: string,
        email: string,
        password: string){
        if(!name) throw new Error("No name informed")
        if(!lastName) throw new Error("No lastName informed")
        if(!username) throw new Error("No username informed")
        if(!email) throw new Error("No email informed")
        if(!password) throw new Error("No password informed")

        this.name = name
        this.lastName = lastName
        this.username = username
        this.email = email
        this.password = password

    }
}
