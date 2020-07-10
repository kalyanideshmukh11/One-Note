const mongoose = require('mongoose')
const validator= require('validator')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken') 
const Task= require('./tasks')
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim : true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid.')
            }
        }
    },
    password:{
        type: String,
        required:true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error ('password can not be password.')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value) {
            if (value< 0) {
                throw new Error('Age must be a positive number.')
            }
        }
    },
    tokens:[{
        token:{
        type: String,
        required:true
        }
    }],
    avatar: {
        type: Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField: '_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}
userSchema.methods.generateAuthToken= async function () {
    const user= this
    const token= jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens= user.tokens.concat({ token })  
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user=await Users.findOne( { email })

    if (!user){
        throw new Error('User not found !')
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if (!isMatch){
        throw new Error('Password does not match')
    }
    return user
}
//Hash the password before saving
userSchema.pre('save',async function (next){
    const user= this
    if (user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }
    next()
})

//Delete user tasks when user is deleted
userSchema.pre('remove',async function (next){
    const user= this
    await Task.deleteMany({owner: user._id})
    next()
})
const Users= mongoose.model('Users',userSchema)
module.exports= Users