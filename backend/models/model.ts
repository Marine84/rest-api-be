import { User } from '../interface/user';
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator';

const dataSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  }
}).plugin(uniqueValidator);

const userModel = mongoose.model<User & mongoose.Document>('user', dataSchema);

export default userModel;