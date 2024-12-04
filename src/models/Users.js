import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true, // This will create a unique index on the 'email' field
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 120,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
)

// Create the unique index on email field
userSchema.index({ email: 1 }, { unique: true })

const User = mongoose.model('User', userSchema)

export default User
