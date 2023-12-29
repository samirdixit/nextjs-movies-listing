import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { connectToDB } from '../../../../utils/database/database';
import User from '../../../../models/user';
import { handleApiRequest } from '../../../../utils/apiHandler/apiHandler';

// Handle API request for user login
export const POST = async (request) => {
  return handleApiRequest(request, async (request) => {
    try {
      // Extract email and password from the request body
      const { email, password } = await request.json();

      // Connect to the MongoDB database
      await connectToDB();

      // Find the user by email
      const user_detail = await User.findOne({ email });

      // If user not found or password is incorrect, return error
      if (!user_detail || !(await compare(password, user_detail.password))) {
        throw new Error("Invalid credentials !!");
      }

      // Generate a JWT token for authentication
      const token = sign({ userId: user_detail._id }, process.env.SECRET_KEY, {
        // expiresIn: '1h', // expiration time for the token
      });

      // Return success message and token in the response
      return { message: "Login Successfully !!", token };
    } catch (error) {
      console.error('Error:', error);
      // Return the error in the response
      throw new Error("Failed to Login !!");
    }
  });
};
