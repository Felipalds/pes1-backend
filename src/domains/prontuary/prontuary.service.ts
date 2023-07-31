import * as path from "path"
import fs from "fs"

const PATH = path.join(__dirname, "./prontuary_template.json")

export default class Prontuary {
    id: number | undefined
    name: string | undefined
    content: string | undefined

    constructor(id: number | undefined = undefined) {
        if (id) {
            console.log("Loading " + id + ".json")
            this.loadData(id+".json")
        } else {
            console.log("Loading " + PATH)
            this.loadData(PATH)
        }
    }

    loadData(path: string) {
        try {
           const file = fs.readFileSync(path)
           const prontuaryData = JSON.parse(file.toString())
           this.content = prontuaryData
        } catch( error ) {
            console.log(error)
            this.loadData(PATH)
            
        }
    }
}