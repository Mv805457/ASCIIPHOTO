#!/usr/bin/env node

const Jimp = require("jimp");
const chalk = require("chalk");

const chars = "@#S%?*+;:,. ";

const imagePath = process.argv[2];

if (!imagePath) {
  console.log("Usage: ascii-studio <image-path>");
  process.exit(1);
}

Jimp.read(imagePath).then(image => {
  image.resize(80, Jimp.AUTO);

  for (let y = 0; y < image.bitmap.height; y++) {
    let row = "";

    for (let x = 0; x < image.bitmap.width; x++) {
      const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y));
      const brightness = 0.299*r + 0.587*g + 0.114*b;
      const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
      const char = chars[charIndex];

      row += chalk.rgb(r, g, b)(char);
    }

    console.log(row);
  }
});
