import { post } from "../../../src/app/helper/httpHelper";

// Handler function for login
export async function login_handler(payload) {
  try {
    // Make a POST request to the /api/login endpoint with the provided payload
    const result = await post("api/login", payload).then((response) => response.data);

    // Return the result of the login request
    return result;
  } catch (error) {
    console.error('Error:', error);
    // Handle and log errors, and return an appropriate response
    throw new Error('Failed to perform login');
  }
}
