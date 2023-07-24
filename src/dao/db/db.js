import mongoose, { connect, mongo } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

let password = process.env.PASSWORD

const DB = `mongodb+srv://appdesde0:${password}@appdesde0.h4mpajf.mongodb.net/appdesde0`

const connection = {
    connect: async () => {
        return mongoose.connect(DB, {useUnifiedTopology: true, useNewUrlParser: true})
            .then((db) => {
                console.log('conexion exitosa')
                
            }).catch((err) => {
                console.log(err)
            });
    }
}

export { connection }