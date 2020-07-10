const express= require('express')
require('./db/mongoose')
const Users = require('./models/users')
const tasks = require('./models/tasks')
const userRouter= require('./routers/user')
const tasksRouter = require('./routers/task')

const app= express()
const port= process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(tasksRouter)

app.listen(port, ()=> {
    console.log('Server is up and running on port '+port)
})



