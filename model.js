const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    age:{
        type:Number,
        required:true
},

sex:{
    type:String,
    enum: ['male', 'female'],
    required:true
},
createdAt:{
    type:Date,
    default:Date.now()
}
},
{
    timestamp:true
}
)

const user = mongoose.model('User', userSchema)
module.exports = user
