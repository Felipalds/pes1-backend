import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import routes from './routes/routes';
import cors from "cors"

dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.use('/', routes)


app.listen(PORT, () => {
    console.log("Started at ", PORT)
})

