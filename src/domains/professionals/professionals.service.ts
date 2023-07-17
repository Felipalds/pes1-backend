import * as path from "path"
import fs from "fs"

const PATH = path.join(__dirname, "./professionals.json")

export default class Professional {
    name: string | undefined
    id: number | undefined
    description: string | undefined
    slug: string | undefined

    constructor(name: string, description: string, slug:string){
        this.name = name
        this.description = description
        this.slug = slug
    }
}
