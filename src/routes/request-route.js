const express = require('express');
const router = express.Router();
const RequestMeetingScheme = require("../modal/request-modal")

router.post("/create", async (req, res) => {
  
    // Create new Request
    let requestMeetingScheme = new RequestMeetingScheme({
      clubName: req.body.clubName,
      projectName: req.body.projectName,
      description: req.body.description
    });
    // Save Request
    await requestMeetingScheme.save()
      .then(() => res.json(requestMeetingScheme))
      .catch(err => res.status(400).json('Error: ' + err));

});

//View Requests
router.get("/viewRequests", async (req, res) => {
  try {
    await RequestMeetingScheme.find()
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

router.get("/viewRequests/:id", async (req, res) => {
  try {
    await RequestMeetingScheme.findById(req.params.id)
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
  
    let RequestMeeting = await RequestMeetingScheme.findById(req.params.id);
    let data = {
      clubName: req.body.clubName || RequestMeeting.clubName,
      projectName: req.body.projectName || RequestMeeting.projectName,
      description: req.body.description || RequestMeeting.description,
    };
    RequestMeeting = await RequestMeetingScheme.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(RequestMeeting);
  
});

router.delete("/delete/:id", async (req, res) => {
  if (req.params.id) {
    //delete proposal data
    await RequestMeetingScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
      .catch((err) => { res.status(500).send(err) })
  }
});

module.exports = router;