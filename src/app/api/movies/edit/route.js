// pages/api/movies/update.js

import { handleApiRequest } from '../../../../../utils/apiHandler/apiHandler';
import MovieDetails from '../../../../../models/movie_detail';
import { connectToDB } from '../../../../../utils/database/database';
import { uploadImageToS3, deleteImageFromS3 } from '../../../../../utils/aws-s3/s3_service';

// Handle API request to update movie details by ID
export const PATCH = async (request) => {
  return handleApiRequest(request, async (request, user_id) => {
    try {
      // Parse form data from the request
      const formData = await request.formData();
      const id = formData.get('id');
      const image = formData.get('image');

      // Connect to the MongoDB database
      await connectToDB();

      // Find the movie by ID and user_id
      const movie = await MovieDetails.findOne({ _id: id, user: user_id });

      // If movie not found, return error
      if (!movie) {
        throw new Error("Movie not found");
      }

      // Delete the existing image from S3 if a new image is provided
      if (formData.has('image') && movie.image && image !== 'null') {
        await deleteImageFromS3(movie.image);
      }

      // Upload the new image to S3 if a new image is provided
      const imageUrl = image !== 'null' ? await uploadImageToS3(formData.get('image'), 'movie-images', user_id) : movie.image;

      // Update the movie details
      if (formData.has('title')) {
        movie.title = formData.get('title');
      }

      if (formData.has('publishing_year')) {
        movie.publishing_year = formData.get('publishing_year');
      }

      movie.image = imageUrl; // Update the image URL

      // Save the updated movie to the database
      await movie.save();

      // Return the updated movie in the response
      return movie;
    } catch (error) {
      console.error('Error:', error);
      // Return the error in the response
      throw new Error("Failed to update the movie");
    }
  });
};
