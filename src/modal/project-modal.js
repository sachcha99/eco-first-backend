const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema ({
    clubName: {
        type: String,
    },
    projectName: {
        type: String
    },
    startDate:{
        type: String
    },
    endDate:{
        type: String
    },
    avatar:{
        type: String
    },
    cloudinary_id: {
        type: String
    },
    url:{
        type: String
    },
    description:{
        type: String
    }

});

module.exports = mongoose.model("projects",projectSchema);