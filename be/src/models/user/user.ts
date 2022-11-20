import {Schema, model, Document} from 'mongoose';

interface UserModelInterface {
    name: string;
    password: string;
    email: string;
    photo?: string;
}

const UserSchema = new Schema<UserModelInterface>({
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      default: "no-image.png",
    },
  });
  
  module.exports = model<Document & UserModelInterface>("user", UserSchema);
  