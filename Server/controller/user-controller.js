import User from "../schema/user-schema.js";


export const NewLoan=async(request,response)=>{
    const user=request.body;
    const newUser=new User(user);

    try {
        await newUser.save();
        response.status(200).json(newUser);
    } catch (error) {
        response.status(409).json({message:error.message});
    }
}

export const getUsers=async(request,response)=>{
try {
    const users=await User.find({});
    response.status(200).json(users);
} catch (error) {
    response.status(404).json({message:error.message});
}
}

export const getUser=async(request,response)=>{
    try {
        const user=await User.findById(request.params._id);
        response.status(200).json(user);
    } catch (error) {
        response.status(404).json({message:error.message});
    }
}

export const profileData=async(request,response)=>{
 let user=request.body;
 const profileData=new User(user);

 try {
     await User.updateOne({_id:request.params._id},profileData);
     response.status(201).json(profileData);
 } catch (error) {
     response.status(409).json({message:error.message});
 }
}

export const deleteUser=async(request,response)=>{
    try {
        await User.deleteOne({_id:request.params._id});
        response.status(201).json({message:'user deleted successfully'});
    } catch (error) {
        response.status(409).json({message:error.message});
    }
   }