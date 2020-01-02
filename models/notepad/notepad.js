const mongoose = require('mongoose')

var noteSchema = new mongoose.Schema({
    text:{
        type:String
    },
    slug:{
        type:String
    },
    title:{
        type:String
    },
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      }
    
})

module.exports= mongoose.model("Notepad",noteSchema)