const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const userRoutes=require("./routes/userRoutes")
dotenv.config()
const connectDatabase=require("./config/db")

const app=express()
connectDatabase();


app.use(cors())
app.use(express.json());
app.use("/api/user",userRoutes)



app.listen(process.env.PORT,()=>{
  console.log(`server is connected port ${process.env.PORT}`)
})
