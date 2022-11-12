const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const EventSchedulingScheme = require("../modal/event-modal")

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
    let eventSchedulingScheme = new EventSchedulingScheme({
      eventName: req.body.eventName,
      venue: req.body.venue,
      date: req.body.date,
      avatar: result?.secure_url || null,
      cloudinary_id: result?.public_id || null,
      time: req.body.time,
      estimatedBudjet: req.body.estimatedBudjet,
      description: req.body.description
    });
    // Save Event
    await eventSchedulingScheme.save()
      .then(() => res.json(eventSchedulingScheme))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (err) {
    console.log(err);
  }
});

router.get("/viewEvents", async (req, res) => {
  try {
    await EventSchedulingScheme.find()
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

//View Event by ID
router.get("/viewEvents/:id", async (req, res) => {
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

//Update Event details
router.put("/update/:id", upload.single("file"), async (req, res) => {
  let fileName = req.body.fileName
  let folder = "Eco First"

  try {
    let EventSchedule = await EventSchedulingScheme.findById(req.params.id);
    // Delete file from cloudinary

    // Upload file to cloudinary
    let result;
    if (req.file) {
      if (EventSchedule.cloudinary_id) {
        await cloudinary.uploader.destroy(EventSchedule.cloudinary_id);
      }
      result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto", public_id: fileName, folder: folder });
    }
    let data = {
      eventName: req.body.eventName || EventSchedule.eventName,
      venue: req.body.venue || EventSchedule.venue,
      date: req.body.date || EventSchedule.date,
      avatar: result?.secure_url || EventSchedule.avatar,
      cloudinary_id: result?.public_id || EventSchedule.cloudinary_id,
      time: req.body.time || EventSchedule.time,
      estimatedBudjet: req.body.estimatedBudjet || EventSchedule.estimatedBudjet,
      description: req.body.description || EventSchedule.description,
    };
    EventSchedule = await EventSchedulingScheme.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(EventSchedule);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  if (req.params.id) {
    //delete proposal data
    await EventSchedulingScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
      .catch((err) => { res.status(500).send(err) })
  }
});

module.exports = router;