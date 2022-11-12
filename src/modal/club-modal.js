const mongoose = require("mongoose");
const clubSchema = new mongoose.Schema ({
    clubName: {
        type: String,
    },
    city: {
        type: String
    },
    memberCount:{
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

module.exports = mongoose.model("clubs",clubSchema);