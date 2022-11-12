const mongoose = require("mongoose");

const ShedDetailsSchema = new mongoose.Schema({
    shedName: { type: String, required: true },
    address: { type: String, required: true },
    ownerID: { type: String, required: true, unique:true },
    petrolArrivalTime: { type: String, required: false },
    petrolFinishTime: { type: String, required: false },
    dieselArrivalTime: { type: String, required: false },
    dieselFinishTime: { type: String, required: false },
    petrolQueueStartTime: { type: String, required: false },
    petrolQueueEndTime: { type: String, required: false },
    petrolQueueLength: { type: String, required: false },
    dieselQueueStartTime: { type: String, required: false },
    dieselQueueEndTime: { type: String, required: false },
    dieselQueueLength: { type: String, required: false },
    petrolStatus: { type: String, required: false },
    dieselStatus: { type: String, required: false },
    shedStatus: { type: String, required: false },
    petrolCapacity: { type: String, required: false },
    dieselCapacity: { type: String, required: false },
    
},{
    timestamps:true
});

const ShedDetails = mongoose.model('shedDetails', ShedDetailsSchema);
module.exports = ShedDetails;