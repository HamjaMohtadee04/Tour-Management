import {Server} from "http"
import mongoose  from "mongoose"
import app from "./app"
import { envVars } from "./app/config/env"



let server:Server



const startServer = async () =>{
    try {
  
        await mongoose.connect(envVars.DB_URL)
        console.log("connect to db!")
        server = app.listen(envVars.PORT,()=>{
            console.log(`server is listening to port ${envVars.PORT}`)
        })
    } catch (error) {
        
            console.log(error)
    }
}


startServer()

process.on("SIGTERM",( )=>{
    console.log("SIGTERM signal received. sever is shutting down")

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("unhandledRejection",(err)=>{
    console.log("unhandled rejection error detected. sever is shutting down",err)

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("uncaughtException",(err)=>{
    console.log("uncaught exception error detected. sever is shutting down",err)

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})


// Promise.reject(new Error("i forgot to catch"))
// throw new Error("i forgot to handle this local error")
/*
*unhandled rejection error
*uncaught rejection error
*signal terminal rejection error
*/

