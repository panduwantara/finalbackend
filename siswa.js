const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const path = require("path")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(cookieParser())
app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
const siswa = require("./controllers/siswa")

const siswaRoutes = require("./routes/siswa")
const adminRoutes = require("./routes/siswa")

app.get("/", (req, res) => {
    res.render("login")
})

const { required } = require('joi')

app.use('/siswa', siswaRoutes)
app.use('/admin', adminRoutes)

// app.use((req, res, next ) => {
//     res.status(404).send('keep digging, mybro')//yg dituju ga ketemu
// })

// cron.schedule("* */59 * * *", () => {
//     console.log("AUTO REGISTER")
//     siswa.autoRegister()
// })

app.listen(port, () =>{
    console.log(`Examle app in port ${port}`)
})


// module.exports=app