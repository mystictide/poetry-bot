const express = require("express");
const req = require("express/lib/request");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const twit = require("./twit");
const port = process.env.PORT || 4141;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// twit.poemPoster();
// setInterval(function () {
//   twit.poemPoster();
// }, 11000000);

app.use(errorHandler);
app.get("/", (req, res) => {
  twit.poemPoster();
  res.send("orpheus laments");
});
app.use("/static", express.static(__dirname + "/fonts"));
app.listen(port, () => console.log(`server started on port: ${port}`));