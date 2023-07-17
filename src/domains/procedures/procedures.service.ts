import Professional from "../professionals/professionals.service"

export default class Procedure {
    name: string
    description: string
    slug: string

    constructor(name: string, description: string, slug: string){
        if(!name) throw new Error("No name informed")
        if(!description) throw new Error("No description informed")

        this.name = name
        this.description = description
        this.slug = slug
    }
}
