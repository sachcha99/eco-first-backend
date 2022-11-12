require('dotenv').config()
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const MeetingSchedulingAPI = require("./src/routes/meeting-route")
const EventSchedulingAPI = require("./src/routes/event-route")
const ProjectAPI = require("./src/routes/project-route")
const ProfessionalAPI = require("./src/routes/professional-route")
const ClubAPI = require("./src/routes/club-route")
const DiscussionAPI = require("./src/routes/discussion-route")
const RequestMeetingAPI = require("./src/routes/request-route")
const UserAPI = require("./src/routes/user-route")
const connectDB = require("./src/config/config");


const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
// app.use(fileUpload({
//   useTempFiles: true
// }))
connectDB();

app.get("/", (req, res) => {
  res.send("Hello Node!");
});

app.use("/meetings", MeetingSchedulingAPI)
app.use("/events", EventSchedulingAPI)
app.use("/projects", ProjectAPI)
app.use("/professionals", ProfessionalAPI)
app.use("/clubs", ClubAPI)
app.use("/discussions", DiscussionAPI)
app.use("/requests", RequestMeetingAPI)
app.use("/users", UserAPI)


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});