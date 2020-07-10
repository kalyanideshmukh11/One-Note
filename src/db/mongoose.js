const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    //userNewUrlParser: true,     
    //userCreatedIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true
})


