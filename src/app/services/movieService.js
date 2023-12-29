// api.js

import { get, post, patch } from "../../../src/app/helper/httpHelper";
import { isAuthTokenAvailable } from "@/app/helper/auth";

// Fetch all movies
export async function getAllMovies() {
  try {
    // Check if authentication token is available
    const authToken = isAuthTokenAvailable();
    if (!authToken) {
      throw new Error('Authentication token not found');
    }

    // Set the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    // Make the API request with the token to fetch all movies
    const result = await get("api/movies", config).then((response) => response.data);

    return result;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
}

// Create a new movie
export async function createMovie(payload) {
  try {
    // Check if authentication token is available
    const authToken = isAuthTokenAvailable();
    if (!authToken) {
      throw new Error('Authentication token not found');
    }

    // Set the token in the request headers and specify content type
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    // Make the API request with the token to create a new movie
    const result = await post("api/movies/new", payload, config).then((response) => response.data);
    return result;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw new Error('Failed to create a movie');
  }
}

// Edit an existing movie
export async function editMovie(payload) {
  try {
    // Check if authentication token is available
    const authToken = isAuthTokenAvailable();
    if (!authToken) {
      throw new Error('Authentication token not found');
    }

    // Set the token in the request headers and specify content type
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    // Create FormData and append each key-value pair
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Make the API request with the token to edit the movie
    const result = await patch(`api/movies/edit`, formData, config).then((response) => response.data);
    return result;
  } catch (error) {
    console.error('Error editing movie:', error);
    throw new Error('Failed to edit the movie');
  }
}
