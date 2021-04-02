import mongoose, { Schema, Document } from 'mongoose';

interface UserIn extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'You must have a name'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'You must have a email'],
    },
    password: {
      type: String,
      required: [true, 'You must have a password'],
      minlength: 5,
      select: false,
    },
    files: {
      type: Array
    }
  },
  { timestamps: true }
);

const User = mongoose.model<UserIn>('Users', userSchema);
export default User;
