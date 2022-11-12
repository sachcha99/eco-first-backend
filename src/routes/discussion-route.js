const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const DiscussionScheme = require("../modal/discussion-modal")

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

        // Create new Discussion
        let discussionScheme = new DiscussionScheme({
            title: req.body.title,
            avatar: result?.secure_url || null,
            cloudinary_id: result?.public_id || null,
            description: req.body.description
        });
        // Save Discussion
        await discussionScheme.save()
            .then(() => res.json(discussionScheme))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
        console.log(err);
    }
});

//View all Discussions
router.get("/viewDiscussions", async (req, res) => {
    try {
        await DiscussionScheme.find()
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
router.get("/viewDiscussions/:id", async (req, res) => {
    try {
        await DiscussionScheme.findById(req.params.id)
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

//Update Discussion details
router.put("/update/:id", upload.single("file"), async (req, res) => {
    let fileName = req.body.fileName
    let folder = "Eco First"

    try {
        let Discussion = await DiscussionScheme.findById(req.params.id);
        // Delete file from cloudinary

        // Upload file to cloudinary
        let result;
        if (req.file) {
            if (Discussion.cloudinary_id) {
                await cloudinary.uploader.destroy(Discussion.cloudinary_id);
            }
            result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
        }
        let data = {
            title: req.body.title|| Discussion.title,
            avatar: result?.secure_url || Discussion.avatar,
            cloudinary_id: result?.public_id || Discussion.cloudinary_id,
            description: req.body.description || Discussion.description,
        };
        Discussion = await DiscussionScheme.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(Discussion);
    } catch (err) {
        console.log(err);
    }
});

//Remove a Club
router.delete("/delete/:id", async (req, res) => {
    if (req.params.id) {
        //delete proposal data
        await DiscussionScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
            .catch((err) => { res.status(500).send(err) })
    }
});

module.exports = router;