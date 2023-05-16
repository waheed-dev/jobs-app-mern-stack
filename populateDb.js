import {readFile} from 'fs/promises'
import dotenv from "dotenv";
dotenv.config()

import connectDb from "./db/connect.js";
import Job from "./models/Job.js";

const start = async () => {
    try {
        console.log('se')
        await connectDb(process.env.MONGO_URI)
        await Job.deleteMany()
        const jsonData = JSON.parse(await readFile(new URL('./mock-data.json',import.meta.url)))
        await Job.create(jsonData)
        console.log('success')
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

start()