const app = require('./app')

// const express = require('express')
// const userRouter = require("./routers/user")
// const taskRouter = require("./routers/task")

// const app = express()
const port = process.env.PORT

// // Middleware - request -> do something -> route
// // app.use((req, res, next) => {
// //  if(req.method === 'GET') console.log("Blocked")
// //  else next()
// //     res.status(503).send("Serive under maintenance")

// // })

// app.use(express.json())
// app.use(userRouter)
// app.use(taskRouter)


app.listen(port, () => {
    console.log("App is up and running on port " + port);
})

// const multer = require('multer');
// const upload = multer({
//     dest: "images"
// fileFilter(req, file, cb) {
//     // if (!file.originalname.endsWith('.pdf')) {
//     //     return cb(new Error("Please upload PDF File"))
//     // }
//     if (!file.originalname.match('\.(doc|docx)$')) {
//         return cb(new Error("Please upload doc or docx File"))
//     }

//     cb(undefined, true)
//         // cb(undefined, false)
// }
// })

// app.post('/upload', upload.single("upload"), (req, res) => {
//     res.send()

// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })