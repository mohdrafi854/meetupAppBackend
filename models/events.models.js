const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  details:[
    {
      type:String,
      required:true,
    }
  ],
  hosted:{
    type:String,
    required:true,
  },
  dressCode:{
    type:String,
  },
  ageRestrictions:{
    type:String,
  },
  location:{
    type:String,
  },
  fees:{
    type:Number,
  },
  tags:[
    {
      type:String,
    }
  ],
},{
  timestamps:true,
});

const Events = mongoose.model("Events", eventSchema);
module.exports = Events;
