import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: [String],
    author: { type: String, default: "Admin" },
    status: {
      type: String,
      enum: ["published", "hidden"],
      default: "published",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
