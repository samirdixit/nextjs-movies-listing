// pages/api/movies/get.js

import { handleApiRequest } from '../../../../utils/apiHandler/apiHandler';
import MovieDetails from '../../../../models/movie_detail';
import { connectToDB } from '../../../../utils/database/database';

// Handle API request to fetch all movies for the user
export const GET = async (request) => {
  return handleApiRequest(request, async (request, user_id) => {
    try {
      // Connect to the MongoDB database
      await connectToDB();

      // Fetch all movies for the user and sort by createdAt in descending order
      const movies = await MovieDetails.find({ user: user_id }).sort({ createdAt: -1 });

      // Return the movies in the response
      return movies;
    } catch (error) {
      console.error('Error:', error);
      // Return the error in the response
      throw new Error('Failed to fetch movies');
    }
  });
};
