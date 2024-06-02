import axios from "axios";
const URL="http://localhost:8000";

const userApis=async(data)=>{
    try{
       return await axios.post(`${URL}/newloan`,data);
    }catch(error){
       console.log("Error in calling userApis",error);
    }
}
export default userApis;

export const getUsers=async()=>{
    try{
        return await axios.get(`${URL}/`);
    }catch(error){
        console.log("Error while calling getUsers API",error);
    }
}
export const getUser=async(_id)=>{
    try{
        return await axios.get(`${URL}/${_id}`);
    }catch(error){
        console.log("Error while calling getUser API",error);
    }
}
export const profileData=async(user,_id)=>{
    try{
        return await axios.post(`${URL}/${_id}`,user);
    }catch(error){
        console.log("Error while calling profileData API",error);
    }
}
export const deleteUser=async(_id)=>{
    try{
        return await axios.delete(`${URL}/${_id}`);
    }catch(error){
        console.log("Error while calling deleteuser API",error);
    }
}