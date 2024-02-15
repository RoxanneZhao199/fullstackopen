import axios from 'axios'
const baseUrl = '/api/login'

// const login = async credentials => {
//   const response = await axios.post(baseUrl, credentials)
//   return response.data
// }

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data; // If successful, return the user data.
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response', error.response.data);
      console.error('Error response status', error.response.status);
      console.error('Error response headers', error.response.headers);
      throw error.response.data; // You can throw an error with the response data or handle it as needed.
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request', error.request);
      throw new Error('No response received');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message', error.message);
      throw new Error(error.message);
    }
  }
};

export default { login }
