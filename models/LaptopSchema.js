const mongoose = require('mongoose');


const LaptopSchema = new mongoose.Schema({
     Name:{
        type: String 
    },
    img:{ 
        data:Buffer,
        contentType:String,
    },
     Brand:{
             type: String 
     },
     Link:{
        type: String
    },
    properties:{
        price:{
            type:Number
        },
        Hdd:{
            type:String,
        },
        Ssd:{
            type:String,
        },
        Ram:{
            type:String,
        },
        processor:{
            type:String,
        },
        generation:{
            type:String,
        },         
        Operating_system:{
            type:String,
        },
        Graphics_card:{
            type:String,
        },
        Screen_size:{
            type:String,
        }
    }
});


module.exports =  mongoose.model('Laptop',LaptopSchema);