import * as SecureStore from 'expo-secure-store';

//get access token
export async function getAccessToken() {
  try {
    const value = await SecureStore.getItemAsync('accessToken');
    return value;
  } catch (e) {
    return null
  }
}