const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const ProjectScheme = require("../modal/project-modal")

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

        // Create new Event
        let projectScheme = new ProjectScheme({
            clubName: req.body.clubName,
            projectName: req.body.projectName,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            avatar: result?.secure_url || null,
            cloudinary_id: result?.public_id || null,
            url: req.body.url,
            description: req.body.description
        });
        // Save Project
        await projectScheme.save()
            .then(() => res.json(projectScheme))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
        console.log(err);
    }
});

//View All Projects
router.get("/viewProjects", async (req, res) => {
    try {
        await ProjectScheme.find()
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

//View Project by ID
router.get("/viewProjects/:id", async (req, res) => {
    try {
        await EventSchedulingScheme.findById(req.params.id)
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

//Update Project details
router.put("/update/:id", upload.single("file"), async (req, res) => {
    let fileName = req.body.fileName
    let folder = "Eco First"

    try {
        let Project = await ProjectScheme.findById(req.params.id);
        // Delete file from cloudinary

        // Upload file to cloudinary
        let result;
        if (req.file) {
            if (Project.cloudinary_id) {
                await cloudinary.uploader.destroy(Project.cloudinary_id);
            }
            result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
        }
        let data = {
            clubName: req.body.clubName || Project.clubName,
            projectName: req.body.projectName || Project.projectName,
            startDate: req.body.startDate || Project.startDate,
            endDate: req.body.endDate || Project.endDate,
            avatar: result?.secure_url || Project.avatar,
            cloudinary_id: result?.public_id || Project.cloudinary_id,
            url: req.body.url || Project.url,
            description: req.body.description || Project.description,
        };
        Project = await ProjectScheme.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(Project);
    } catch (err) {
        console.log(err);
    }
});

//Remove a Project
router.delete("/delete/:id", async (req, res) => {
    if (req.params.id) {
        //delete proposal data
        await ProjectScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
            .catch((err) => { res.status(500).send(err) })
    }
});

module.exports = router;