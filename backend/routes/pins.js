import { Router } from "express";
import Pin from "../models/Pin.js";

const router = Router(); 

router.post("/", async (request, response) =>{
    const {username,title, rating, lat, long} = request.body;
    if(!username || !rating || !title || !lat || !long){
        console.log("need all parameters");
       return response.status(400).json({message:"need all parameters"})
        }
        const newPin = new Pin(request.body);

    try {
         const savedPin = await newPin.save();
         response.status(200).json(savedPin)
    } catch (error) {
        response.status(500).json({message: error.message})
    }

});


//  get all pins
router.get("/", async (request, response)=>{
    try {
        const pins = await Pin.find();
        response.status(200).json(pins);
    } catch (error) {
        response.status(500).json({message: error.message})

    }

    
})

//  delete a pin with id
router.delete("/:id", async (request,response) =>{
    try {
        const {id} = Pin(request.body);
        const pin = await Pin.findOneAndDelete(id);
        response.status(200).json({message: pin.title +" successfully deleted"});
        
    } catch (error) {
        response.status(500).json({message:error.message})
    }
})



// edit pins
export default router; 