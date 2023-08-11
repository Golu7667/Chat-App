const User =require("../models/userModels")
const generateToken=require("../config/generateToken")

const registerUser=async (req,res)=>{
  
  const {name,email,password,pic}=req.body
 
  if(!name || !email || !password){
    res.status(400);
    throw new Error("Please Enter all the Feilds")
  }
  const userExists=await User.findOne({email})
  if(userExists){
    res.status(400); 
    throw new Error("User already exists")
  }
  const user=await User.create({
    name,
    email,
    password,
    pic
  });
  if(user){
    res.status(201).json({
        _id:user._id,
        naem:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        pic:user.pic,
        token: generateToken(user._id),
    })
  }else{
    res.status(400);
    throw new Error("User not found")
  }

}


const authUser = async(req,res)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email})
  if(user && (await user.matchPassword(password))){
     res.json({
        _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
     })
  }else{
    res.status(401);
    throw new Error ("Invalid Email or Password")
  }
  

}


module.exports={registerUser,authUser}