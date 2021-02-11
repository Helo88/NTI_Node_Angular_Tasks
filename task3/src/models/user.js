const mongoose = require('mongoose')
const validator = require('validator')

 VpN = function(val){
var re = /^((\+?20)|0)?1[012]\d{8}$/;
if(!(val.match(re)))

    throw new Error("invalid eg number")
}

const User = mongoose.model('User',{ // create models
    id :{
      type:Number,
      required:true,
      unique: true
    },
    userName:{
        type:String,
        maxLength:15, //minlength
        default:'new user'
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxLength:20,
        trim: true, //remove right -left spaces
        lowercase:true, //convert all to lower cases
        //uppercase:true
    },
    email:{
        type:String,
        trim:true,
        unique: true,
        required:true,
        validate(value){ //validator module
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    phone:
    {
        type:String,
        validate:VpN
  }

})

module.exports = User
