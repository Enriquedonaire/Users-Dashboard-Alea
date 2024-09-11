import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_URL;

export const fetchUsers = async (page: number, perPage: number) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { page, per_page: perPage }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};