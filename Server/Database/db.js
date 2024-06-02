import mongoose from "mongoose";


const Connection=async()=>{
    const URL=`mongodb+srv://KeerthikaS:loanui@loan-ui.ggpsqxh.mongodb.net/loan-ui?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL,{useUnifiedTopology:true, useNewUrlParser:true});
        console.log('Database connected successfully');
    } catch (error) {
        console.log(`Error while connecting with database`,error);
    }
}
export default Connection;