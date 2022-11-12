const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const ClubScheme = require("../modal/club-modal")

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

        // Create new Club
        let clubScheme = new ClubScheme({
            clubName: req.body.clubName,
            city: req.body.city,
            avatar: result?.secure_url || null,
            cloudinary_id: result?.public_id || null,
            memberCount: req.body.memberCount,
            description: req.body.description
        });
        // Save Club
        await clubScheme.save()
            .then(() => res.json(clubScheme))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
        console.log(err);
    }
});

//View all Clubs
router.get("/viewClubs", async (req, res) => {
    try {
        await ClubScheme.find()
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

//View Club by ID
router.get("/viewClubs/:id", async (req, res) => {
    try {
        await ClubScheme.findById(req.params.id)
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

//Update Club details
router.put("/update/:id", upload.single("file"), async (req, res) => {
    let fileName = req.body.fileName
    let folder = "Eco First"

    try {
        let Club = await ClubScheme.findById(req.params.id);
        // Delete file from cloudinary

        // Upload file to cloudinary
        let result;
        if (req.file) {
            if (Club.cloudinary_id) {
                await cloudinary.uploader.destroy(Club.cloudinary_id);
            }
            result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
        }
        let data = {
            clubName: req.body.clubName || Club.clubName,
            city: req.body.city || Professional.city,
            avatar: result?.secure_url || Club.avatar,
            cloudinary_id: result?.public_id || Club.cloudinary_id,
            memberCount: req.body.memberCount || Club.memberCount,
            description: req.body.description || Club.description,
        };
        Club = await ClubScheme.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(Club);
    } catch (err) {
        console.log(err);
    }
});

//Remove a Club
router.delete("/delete/:id", async (req, res) => {
    if (req.params.id) {
        //delete proposal data
        await ClubScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
            .catch((err) => { res.status(500).send(err) })
    }
});

module.exports = router;