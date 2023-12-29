import { Schema, model, models } from 'mongoose';

// Define the schema for User
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'MovieDetails', // Reference to the MovieDetails model
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create or retrieve the User model
const User = models.User || model('User', UserSchema);

export default User;
