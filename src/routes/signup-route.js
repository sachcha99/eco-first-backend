const express = require('express');
const router = express.Router();
const UserScheme = require("../modal/user-modal")

router.post("/create", async (req, res) => {
  
    // Create new User
    let userSchema = new UserScheme({
      userName: req.body.uerName,
      mobileNo: req.body.mobileNo,
      email: req.body.email,
      userRole: req.body.userRole,
      password: req.body.password,
      rePassword: req.body.rePassword
    });
    // Save User
    await userSchema.save()
      .then(() => res.json(userSchema))
      .catch(err => res.status(400).json('Error: ' + err));

});

//View All Users
router.get("/viewUsers", async (req, res) => {
  try {
    await UserScheme.find()
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

router.get("/viewUsers/:id", async (req, res) => {
  try {
    await UserScheme.findById(req.params.id)
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
  
    let User = await UserScheme.findById(req.params.id);
    let data = {
      userName: req.body.userName || User.userName,
      mobileNo: req.body.mobileNo || User.mobileNo,
      email: req.body.email || User.email,
      userRole: req.body.userRole || User.userRole,
      password:req.body.password || User.password,
      rePassword: req.body.rePassword || User.rePassword,
    };
    User = await UserScheme.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(User);
  
});

router.delete("/delete/:id", async (req, res) => {
  if (req.params.id) {
    //delete proposal data
    await UserScheme.findByIdAndDelete(req.params.id).then((data) => { res.status(200).send(data) })
      .catch((err) => { res.status(500).send(err) })
  }
});

module.exports = router;