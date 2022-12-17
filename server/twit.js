const twit = require("twit");
const poems = require("./functions");
const asyncHandler = require("express-async-handler");

const client = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

const poemPoster = asyncHandler(async (req) => {
  let poem;
  while (!poem) {
    poem = await poems.getPoem();
  }
  await postPoem(poem);
});

const postPoem = asyncHandler(async (poem) => {
  client.post(
    "media/upload",
    { media_data: poem.image.split(",")[1] },
    function (err, data, response) {
      var mediaIdStr = data.media_id_string;
      var altText = poem.title + " by " + poem.author;

      if (altText.length < 273) {
        altText += " #poetry";
      }

      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

      client.post(
        "media/metadata/create",
        meta_params,
        function (err, data, response) {
          if (!err) {
            var params = {
              status: altText,
              media_ids: [mediaIdStr],
            };

            client.post(
              "statuses/update",
              params,
              function (err, data, response) {
              }
            );
          }
        }
      );
    }
  );
});

module.exports = {
  postPoem,
  poemPoster,
};
