import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    price: {
      type: number,
      required: true,
      min: 0,
    },
    discount: {
      type: number,
      min: 0,
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      required: true,
      default: [],
    },
    stock: {
      type: number,
      min: 0,
    },
    status: {
      type: String,
      enum: ["new", "hot", "sale"],
      default: "new",
    },
    types: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Type",
      required: true,
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
