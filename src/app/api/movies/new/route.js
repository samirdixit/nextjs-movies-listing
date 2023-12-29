// pages/api/movies/create.js

import { handleApiRequest } from "../../../../../utils/apiHandler/apiHandler";
import MovieDetails from "../../../../../models/movie_detail";
import { connectToDB } from "../../../../../utils/database/database";
import { uploadImageToS3 } from "../../../../../utils/aws-s3/s3_service";

// Handle API request to create a new movie
export const POST = async (request) => {
  return handleApiRequest(request, async (request, user_id) => {
    try {
      // Parse form data from the request
      const formData = await request.formData();
      const title = formData.get("title");
      const publishing_year = formData.get("publishing_year");
      const image = formData.get("image"); // Assuming 'image' is the name of the file input in the FormData
      let imageUrl;

      // Connect to the MongoDB database
      await connectToDB();

      // Upload image to AWS S3 if a new image is provided
      if (image !== "null") {
        imageUrl = await uploadImageToS3(image, "movie-images", user_id);
      }

      // Create a new MovieDetails instance with user_id and image URL
      const newMovie = new MovieDetails({
        title,
        publishing_year,
        image: imageUrl,
        user: user_id,
      });

      // Save the new movie to the database
      await newMovie.save();

      // Return the new movie in the response
      return newMovie;
    } catch (error) {
      console.error("Error:", error);
      // Return the error in the response
      throw new Error("Failed to create a new movie");
    }
  });
};
