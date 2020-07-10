//CRUD
 const mongodb= require('mongodb')
 const MongoClient = mongodb.MongoClient

const { ObjectID } = require("mongodb")

const connectionURL= process.env.MONGODB_URL
const databaseName = 'task-manager'

const id= new ObjectID()
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) =>{
    if(error){
        return console.log('Unable to connect to the database.')
    }
  const db = client.db(databaseName)
    db.collection('Users').deleteMany({
        age: 27
    }).then((result)=> {
        console.log(result)
    }).catch((error) => {
        console.log(error)

    })
})