import { verify } from 'jsonwebtoken';

// A utility function to handle API requests with authentication
export const handleApiRequest = async (request, handler) => {
  try {
    // Extract the token from the request headers
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    // Verify and decode the token to get user_id
    let user_id = null;
    if (token) {
      const decodedToken = verify(token, process.env.SECRET_KEY);
      user_id = decodedToken.userId;
    }

    // Call the provided handler function with user_id
    const result = await handler(request, user_id);

    // Return the result with success response pattern
    return new Response(
      JSON.stringify({
        status_code: 200,
        is_success: true,
        payload: result,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);

    // Return error response pattern
    return new Response(
      JSON.stringify({
        status_code: 500,
        is_success: false,
        payload: { error: error.message || 'Internal Server Error' },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
