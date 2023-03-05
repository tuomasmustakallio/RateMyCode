import mongoose, { Schema, Document } from "mongoose";

// This is the interface for the posts
export interface IPost extends Document {
  author: string;
  title: string;
  content: string;
  votes: number;
  voters: string[];
  comments: string[];
}

// This is the schema for the posts
const postSchema: Schema = new Schema({
  author: { type: String },
  title: { type: String },
  content: { type: String },
  votes: { type: Number },
  voters: { type: Array },
  comments: { type: Array },
});
export default mongoose.model<IPost>("Post", postSchema);
