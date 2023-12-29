import { Schema, model, models } from 'mongoose';

// Define the schema for MovieDetails
const MovieDetailsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    publishing_year: {
      type: String,
      required: [true, 'Publishing year is required.'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: [true, 'User is required.'],
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create or retrieve the MovieDetails model
const MovieDetails = models.MovieDetails || model('MovieDetails', MovieDetailsSchema);

export default MovieDetails;
