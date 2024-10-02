const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
     type: String,
     required: true,
     unique: true
    },
    password:{
        type:String,
        required: true
    },
    profilePicture:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
},{timestamps:true});


const User = model('user',userSchema);

module.exports = User;