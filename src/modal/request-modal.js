const mongoose = require("mongoose");
const requestMeetingSchema = new mongoose.Schema ({
    clubName: {
        type: String
    },
    projectName: {
        type: String
    },
    description:{
        type: String
    }

});

module.exports = mongoose.model("requests",requestMeetingSchema);