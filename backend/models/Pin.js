import mongoose from 'mongoose';


const PinSchema = mongoose.Schema({
        username: {
            type: String,
            require: true
        },
        title:{
            type: String,
            require: true,
            min:3
        },
        rating:{
            type: Number,
            require: true,
            min:0,
            max: 5
        },
        lat:{
            type: Number,
            require: true
        },
        long:{
            type: Number,
            require: true
        }

    
}, {timestamps: true})

const Pin = mongoose.model('Pin', PinSchema);
export default Pin;