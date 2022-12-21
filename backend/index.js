const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const { application } = require("express")

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


//<-------------------------MongoDb Connection------------------>
mongoose.connect("mongodb+srv://shilpi_kumari:<15_07_2001shilpi>@cluster0.oozxhgz.mongodb.net/loginRegister",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("MongoDB Connected")
})

//<----------------------Schema------------------------------>
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)

// <::::::::::::::::::::::{ROUTE}:::::::::::::::::::::::::::::>

// <----------------------------Login User------------------------>
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 


// <----------------------------Register User------------------------>
app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002,() => {
    console.log("BE Started At Port 9002")
})


// mongodb+srv://shilpi_kumari:<15_07_2001shilpi>@cluster0.oozxhgz.mongodb.net/loginRegister

