import { response, Router } from "express";
import User from "../models/User.js";
 import bcrypt from 'bcrypt';


const userRouter = Router(); 


// register
userRouter.post("/register", async (request,response)=> {
    const {username,email, password} = request.body;
    if(!username || !email || !password){
        console.log("need all parameters");
       return response.status(400).json({message:"need all parameters"})
        }

         // Check if user already exists
         const existingUser = await User.findOne({ email });
         if (existingUser) {
             return response.status(400).json({ message: "User already exists" });
         } 
        try {

        // generate password
         const salt = await bcrypt.genSalt(10);
         const hashedPw =  await bcrypt.hash(request.body.password, salt);
        
         const newUser = new User({
            username: request.body.username ,
            email: request.body.email, 
            password: hashedPw  
         });  
        // save user
       const savedUser = await newUser.save();
    //  return response
       response.status(201).json(savedUser);
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})


// login
userRouter.post("/login", async (request,response)=>{
    try {
        // find user
        const userFound = await User.findOne({username: request.body.username});
        !userFound && response.status(400).json("wrong username or password");       
        // validate password
         const validPW =  await bcrypt.compare(request.body.password,userFound.password );
         !validPW &&  response.status(400).json({message: "invalid credentials"})
         //  send response
         response.status(200).json({_id: userFound._id , username: userFound.username})

    } catch (error) {
    response.status(500).json({message: error.message})

    }
})


// get all users:
userRouter.get("/all", async (request,response)=>{
   try {
    const users = await User.find();
    response.status(200).json(users.map(user => user.email +"  " + user.username));
   } catch (error) {
    response.status(500).json({message: error.message})
}

})

// delete user 
userRouter.delete("/delete", async(request, response) =>{
    const user = User(request.body);
    try {
        const deletedUser = await User.findOneAndDelete(user.username);
        response.status(200).json(deletedUser.username + " has been deleted");
    } catch (error) {
        response.status(500).json({message: error.message});
    }
})

export default userRouter; 


