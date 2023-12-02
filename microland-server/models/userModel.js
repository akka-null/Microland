import mongoose from "mongoose";
const { Schema } = mongoose;

// TODO: add the more atterbute to your schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
