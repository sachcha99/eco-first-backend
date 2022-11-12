const mongoose = require("mongoose");

const URI = "mongodb+srv://easyQueue:easyQueue@cluster0.lk4uxej.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
        console.log("Database Connected");
    } catch (error) {
        console.log("Error: ", error);
    }
}

module.exports = connectDB;