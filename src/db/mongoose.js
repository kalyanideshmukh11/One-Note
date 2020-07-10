const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    //userNewUrlParser: true,     
    //userCreatedIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true
})


