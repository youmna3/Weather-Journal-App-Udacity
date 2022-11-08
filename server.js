// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
//require dependences
const cors = require("cors");
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

//app is runing on port
const port = 3000;
// Initialize the main project folder
app.use(express.static("website"));

//add GET route
app.get("/getData", (req, res) => {
  res.send(projectData);
});

//add POST route
app.post("/postData", (req, res) => {
  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
  projectData.date = req.body.date;
  res.send(projectData);
});

// Setup Server
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
