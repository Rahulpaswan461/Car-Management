require("dotenv").config()
const express = require("express")
const userRoute = require("./routes/user")
const carRoute = require("./routes/car")
const {connectMongoDB} = require("./connection")
const cookieParser = require("cookie-parser")
const {checkForAuthenticateUser} = require("./middlewares/authentication")

const app = express()
const PORT = process.env.PORT || 8000

// connect the databse 
connectMongoDB(process.env.MONGO_URL)
.then(()=> console.log("MongoDB is connected !!"))
.catch(error => console.log("There is some error while connecting !!"))

// check the routes
app.get("/",(req,res)=>{
    return res.send("From the server")
})

// middlewares
app.use('/public/upload',express.static(__dirname+ '/public/upload'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthenticateUser("token"))

// routes 
app.use("/api/user",userRoute)
app.use("/api/cars",carRoute)

app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})