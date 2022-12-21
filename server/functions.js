const axios = require("axios");
const asyncHandler = require("express-async-handler");
const helpers = require("./helpers");

const getPoem = asyncHandler(async (req) => {
  let Poem = "";
  await axios({
    method: "get",
    url: "https://poetrydb.org/random/1/author,title,lines.json",
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  }).then((response) => {
    Poem = response.data[0];
  });
  if (Poem.lines.length > 25) {
    await getAnotherPoem();
  } else {
    const image = await helpers.linesToImage(Poem.lines.join("\n"));
    Poem["image"] = image;
    return Poem;
  }
});

const pingRender = asyncHandler(async (req) => {
  await axios({
    method: "get",
    url: "https://orpheus-bot.onrender.com/",
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
});

const getAnotherPoem = asyncHandler(async (req) => {
  await getPoem();
});

module.exports = {
  getPoem,
  pingRender,
};
