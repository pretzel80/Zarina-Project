const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    itemNo: {
      type: String,
      required: true
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true
    },
    name: {
      type: String,
      required: true
    },
    currentPrice: {
      type: Number,
      required: true
    },
    previousPrice: {
      type: Number
    },
    categories: {
      type: String,
      required: true
    },
    imageUrls: [
      {
        type: String,
        required: true
      }
    ],
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    color: {
      type: String
    },
    sizes: {
      type: String
    },
    productUrl: {
      type: String
    },
    brand: {
      type: String
    },
    manufacturer: {
      type: String
    },
    manufacturerCountry: {
      type: String
    },
    seller: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    description: {
      type: String,
      default: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo suscipit debitis voluptas. Est possimus autem, nobis assumenda tempora quisquam cum inventore ea quibusdam distinctio corrupti, culpa exercitationem repellat cupiditate labore, saepe hic? Rem at tempore qui harum distinctio assumenda consequatur enim iure quos vel earum cum magnam neque, quia voluptates."
    },
    material: {
      type: String
    },
    collections: {
      type: String,
      default: ""
    },
  },
  { strict: false }
);

ProductSchema.index({ "$**": "text" });

module.exports = Product = mongoose.model("products", ProductSchema);
