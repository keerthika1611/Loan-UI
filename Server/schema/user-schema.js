import mongoose from "mongoose";


import autoIncrement from "mongoose-auto-increment";

const userschema=mongoose.Schema({
    loanid:String,
    purpose:String,
    status:String,
    fname:String,
    lname:String,
    pmail:String,
    region:String,
    accfirm:String,
    accname:String,
    accphno:String,
    email:String,
    phno:String,
    inputstate:Boolean,
    accinputstate:Boolean
    
})

autoIncrement.initialize(mongoose.connection);
userschema.plugin(autoIncrement.plugin,'user');

const user=mongoose.model('user',userschema);
export default user;