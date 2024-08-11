const  mongoose =  require('mongoose' )  ;  

const  userSchema  = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
        

    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },  
    password:{
        type:String,
        required:true,
        minlength:6,   
    }, 
    createdAt : {
        type: Date,
        default: Date.now() ,  

    },  

});   

const User = mongoose.model('User'  ,  userSchema)  ;  
module.exports = User;    
