import { models, model, Schema } from "mongoose";

interface User {
  name: string;
  username?: string;
  email: string;
  password?: string;
  verifyCode?: string;
  isVerified: boolean;
  provider: "credentials" | "google"; 
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  username: { type: String, unique: true, sparse: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: { type: String, minlength: 6 }, 
  verifyCode: { type: String, minlength: 4 },
  isVerified: { type: Boolean, required: true, default: false },
  provider: { type: String, enum: ["credentials", "google"], required: true },
});

const User = models.User || model("User", userSchema);

export default User;
