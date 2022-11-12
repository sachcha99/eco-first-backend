const mongoose = require("mongoose");
const discussionSchema = new mongoose.Schema ({
    title: {
        type: String,
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

module.exports = mongoose.model("discussions",discussionSchema);