import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
    date: {
      type: Date,
      required: true,
    },
    location:
    {
        type: String, 
        required: true 
    },
    category: { 
        type: String,
         enum: ['conference', 'workshop', 'seminar'], 
         required: true
         },
    capacity:
    {
        type:Number,
        required:true
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    registrations: 
    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
],
  });


  export default mongoose.model('Event',eventSchema)