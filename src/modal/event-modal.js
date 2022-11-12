const mongoose = require("mongoose");
const eventSchedulingSchema = new mongoose.Schema ({
    eventName: {
        type: String,
    },
    venue: {
        type: String
    },
    date:{
        type: String
    },
    avatar:{
        type: String
    },
    cloudinary_id: {
        type: String
    },
    time: {
        type: String
    },
    description:{
        type: String
    },
    estimatedBudjet:{
        type: String
    }

});

module.exports = mongoose.model("events",eventSchedulingSchema);