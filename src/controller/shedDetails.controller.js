const Shed = require("../model/shedDetails.model");

//Add New Shed
const createShed = async (req, res) => {
    if (req.body) {

        const shed = new Shed(req.body);

        await shed.save()
            .then(data => res.status(200).send({ data: data }))
            .catch(err => res.status(500).send(err));

    }
}

//update Shed Details
const updateShed = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;

        updateDetails(id, req, (err, shed) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(shed);
        })
    }
}

function updateDetails(id, req, callback) {
    Shed.findByIdAndUpdate(id, req.body)
        .then((res) => {
            Shed.findOne({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    let shed = result;
                    console.log(shed);
                    return callback(null, shed);
                }
            });
        })
        .catch(err => {
            console.log(err)
            return callback(err);
        })
}

//get All Sheds
const getAllShedDetails = async (req, res) => {
    await Shed.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.send(error);
        });
}

//delete Shed
const deleteShed = async (req, res) => {
    if (req.params.id) {
        await Shed.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result);
            return res.status(200).send(result);
        });
    }
}

//getShedById
const getShedById = async (req, res) => {
    await Shed.find({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
};

module.exports = {
    createShed,
    getAllShedDetails,
    updateShed,
    deleteShed,
    getShedById
}