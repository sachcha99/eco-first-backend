const mongoose = require("mongoose");
const meetingSchedulingSchema = new mongoose.Schema ({
    meetingName: {
        type: String
    },
    meetingLink: {
        type: String
    },
    date:{
        type: String
    },
    time: {
        type: String
    },
    description:{
        type: String
    }

});

module.exports = mongoose.model("meetings",meetingSchedulingSchema);