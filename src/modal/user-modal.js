const mongoose = require("mongoose");
const userSchema = new mongoose.Schema ({
    userName: {
        type: String,
    },
    mobileNo: {
        type: String
    },
    email:{
        type: String
    },
    userRole:{
        type: String
    },
    password: {
        type: String
    },
    rePassword:{
        type: String
    }
});

module.exports = mongoose.model("users",userSchema);