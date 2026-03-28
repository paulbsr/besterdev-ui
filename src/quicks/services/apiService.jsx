import OAuth2APIClient from '../oauth2/OAuth2APIClient';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://besterdev-api-13a0246c9cf2.herokuapp.com';

export async function createRecord(endpoint, data) {
  try {
    const response = await OAuth2APIClient.post(`${API_BASE}${endpoint}`, data);
    return response.status === 200;
  } catch {
    return false;
  }
}
