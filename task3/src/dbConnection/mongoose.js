const mongoose = require('mongoose') // connection setup
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/UserApitest', {
    useCreateIndex:true, useFindAndModify:true,
    useNewUrlParser:true, useUnifiedTopology:true
})
// const User = mongoose.model('User',{ // create models
//     userName:{
//         type:String,
//         maxLength:15, //minlength
//         default:'new user'
//     },
//     password:{
//         type:String,
//         required:true,
//         trim: true, //remove right -left spaces
//         lowercase:true, //convert all to lower cases
//         //uppercase:true
//     },
//     email:{
//         type:String,
//         trim:true,
//         required:true,
//         validate(value){ //validator module
//             if(!validator.isEmail(value)){
//                 throw new Error('email is invalid')
//             }
//         }
//     },
//     age:{
//         type:Number,
//         validate(value){
//             if(value<16) throw new Error('invalid age')
//         }
//     },
//     comments:[
//         {
//             title:{type:String},
//             content:{type:String}
//         }
//     ]
// })





// const data = new User(
    // {
    //     userName:'marwa',
    //     password:'123456789',
    //     email:'marwa@a.com',
    //     age:35,
    //     comments:[
    //         {title:'c1', content:'cc1'},
    //         {title:'c2', content:'cc2'},
    //         {title:'c3', content:'cc3'},
    //     ]
    // }
  //)
// data.save()
// .then(data=>console.log(data))
// .catch((err)=>console.log(err.message))
