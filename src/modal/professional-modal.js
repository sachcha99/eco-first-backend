const mongoose = require("mongoose");
const professionalSchema = new mongoose.Schema ({
    professionalName: {
        type: String,
    },
    city: {
        type: String
    },
    experience:{
        type: String
    },
    avatar:{
        type: String
    },
    cloudinary_id: {
        type: String
    },
    description:{
        type: String
    }
});

module.exports = mongoose.model("professionals",professionalSchema);