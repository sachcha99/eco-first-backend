const express = require('express');
const router = express.Router();
const MeetingSchedulingScheme = require("../modal/meeting-modal")

router.post("/create", async (req, res) => {
  
    // Create new Meeting
    let meetingSchedulingScheme = new MeetingSchedulingScheme({
      meetingName: req.body.meetingName,
      meetingLink: req.body.meetingLink,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description
    });
    // Save Meeting
    await meetingSchedulingScheme.save()
      .then(() => res.json(meetingSchedulingScheme))
      .catch(err => res.status(400).json('Error: ' + err));

});

//View Meetings
router.get("/viewMeetings", async (req, res) => {
  try {
    await MeetingSchedulingScheme.find()
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

router.get("/viewMeetings/:id", async (req, res) => {
  try {
    await MeetingSchedulingScheme.findById(req.params.id)
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

router.put("/update/:id", async (req, res) => {
  
    let MeetingSchedule = await MeetingSchedulingScheme.findById(req.params.id);
    let data = {
      meetingName: req.body.meetingName || MeetingSchedule.meetingName,
      meetingLink: req.body.meetingLink || MeetingSchedule.meetingLink,
      date: req.body.date || MeetingSchedule.date,
      time: req.body.time || MeetingSchedule.time,
      description: req.body.description || MeetingSchedule.description,
    };
    MeetingSchedule = await MeetingSchedulingScheme.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(MeetingSchedule);
  
});

router.delete("/delete/:id", async (req, res) => {
  if (req.params.id) {
    //delete proposal data
    await MeetingSchedulingScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
      .catch((err) => { res.status(500).send(err) })
  }
});

module.exports = router;