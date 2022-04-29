const textToImage = require("text-to-image");
const asyncHandler = require("express-async-handler");

const linesToImage = asyncHandler(async (lines) => {
  const img = await textToImage.generate(lines, {
    // debug: true,
    maxWidth: 650,
    fontSize: 20,
    fontFamily: "'Montserrat', sans-serif",
    fontPath: "./server/fonts/Montserrat-Regular.ttf",
    lineHeight: 35,
    margin: 20,
    bgColor: "#151515",
    textColor: "#9159b3",
    textAlign: "center",
  });
  return img;
});

module.exports = {
  linesToImage,
};
