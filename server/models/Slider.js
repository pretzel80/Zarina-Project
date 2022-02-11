const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SliderSchema = new Schema(
  {
    customId: {
      type: String,
      required: true
    },
    title: String,
    imageUrl: {
      type: String,
      required: true
    },
    description: String,
    htmlContent: String,
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = Slider = mongoose.model("slides", SliderSchema, "slides");
