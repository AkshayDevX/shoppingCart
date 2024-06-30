// lib/auth.ts
import axios from 'axios';

export async function getUserFromToken(token: string) {
  try {
    const response = await axios.get('http://localhost:8000/users/me', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },);

    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
