const express = require("express");
const req = require("express/lib/request");
const dotenv = require("dotenv").config();
const favicon = require("serve-favicon");
const { errorHandler } = require("./middleware/errorMiddleware");
const twit = require("./twit");
const port = process.env.PORT || 4141;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(favicon("favicon.ico"));

twit.poemPoster();
setInterval(function () {
  twit.poemPoster();
}, 11000000);

app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("orpheus lamenting");
});

app.post("/postpoem", (req, res) => {
  twit.poemPoster();
  res.send("orpheus lamented");
});

app.use("/static", express.static(__dirname + "/fonts"));
app.listen(port, () => console.log(`server started on port: ${port}`));