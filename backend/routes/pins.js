import { Router } from "express";
import Pin from "../models/Pin.js";

const router = Router(); 

router.post("/", async (request, response) =>{
    const {username,title, rating, lat, long} = request.body;
    if(!username || !rating || !title || !lat || !long){
        console.log("need all parameters");
       return response.status(400).json({message: "need all parameters"})
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


//  delete pins



// edit pins
export default router; 