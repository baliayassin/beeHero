import axios from 'axios';

export const getUsers = async (url) => {
  try {
    const response = await axios.get(url);
    const userData = await response.data;
    return userData;
  } catch (error) {
    console.log('Error Fetching Users Data', error);
    throw error; 
  }
};

export const getPosts = async (url) => {
    try {
        const response = await axios.get(url);
        const userData = await response.data;
        return userData;
      } catch (error) {
        console.log('Error Fetching Posts Data', error);
        throw error; 
      }

}
