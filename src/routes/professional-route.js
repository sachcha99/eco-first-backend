const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const ProfessionalScheme = require("../modal/professional-modal")

router.post("/create", upload.single("file"), async (req, res) => {
    let fileName = req.body.fileName
    let folder = "Eco First"
    try {
        // Upload image to cloudinary
        let result
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
        }
        console.log(result)

        // Create new Professional
        let professionalScheme = new ProfessionalScheme({
            professionalName: req.body.professionalName,
            city: req.body.city,
            avatar: result?.secure_url || null,
            cloudinary_id: result?.public_id || null,
            experience: req.body.experience,
            description: req.body.description
        });
        // Save Professional
        await professionalScheme.save()
            .then(() => res.json(projectScheme))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
        console.log(err);
    }
});

//View all Professionals
router.get("/viewProfessionals", async (req, res) => {
    try {
        await ProfessionalScheme.find()
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    } catch (err) {
        console.log(err);
    }

});

//View Professional by ID
router.get("/viewProfessionals/:id", async (req, res) => {
    try {
        await ProfessionalScheme.findById(req.params.id)
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    } catch (err) {
        console.log(err);
    }

});

//Update Professional details
router.put("/update/:id", upload.single("file"), async (req, res) => {
    let fileName = req.body.fileName
    let folder = "Eco First"

    try {
        let Professional = await ProfessionalScheme.findById(req.params.id);
        // Delete file from cloudinary

        // Upload file to cloudinary
        let result;
        if (req.file) {
            if (Professional.cloudinary_id) {
                await cloudinary.uploader.destroy(Professional.cloudinary_id);
            }
            result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
        }
        let data = {
            professionalName: req.body.professionalName || Professional.professionalName,
            city: req.body.city || Professional.city,
            avatar: result?.secure_url || Professional.avatar,
            cloudinary_id: result?.public_id || Professional.cloudinary_id,
            experience: req.body.experience || Professional.experience,
            description: req.body.description || Professional.description,
        };
        Professional = await ProfessionalScheme.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(Professional);
    } catch (err) {
        console.log(err);
    }
});

//Remove Professional
router.delete("/delete/:id", async (req, res) => {
    if (req.params.id) {
        //delete proposal data
        await ProfessionalScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
            .catch((err) => { res.status(500).send(err) })
    }
});

module.exports = router;