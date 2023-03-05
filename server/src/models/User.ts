import mongoose, { Schema, Document } from "mongoose";

// This is the interface for the users
export interface IUser extends Document {
  email: string;
  password: string;
}

// This is the schema for the users
const userSchema: Schema = new Schema({
  email: { type: String },
  password: { type: String },
});

export default mongoose.model<IUser>("User", userSchema);
