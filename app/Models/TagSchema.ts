import mongoose, { Schema } from "mongoose";

// Define the SingleTagType schema
const SingleTagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  clerkUserId: {
    type: String,
    required: true,
  },
});

const Tag = mongoose.models.Tag || mongoose.model("Tag", SingleTagSchema);

export default Tag;
