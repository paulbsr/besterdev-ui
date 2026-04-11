let accessToken = null;
let expiresAt = null;

export async function getAccessToken(caller = 'unknown') {
  // Return cached token if it’s still valid
  if (accessToken && Date.now() < expiresAt) {
    return accessToken;
  }

  // Call your Spring Boot endpoint instead of Auth0 directly
  const res = await fetch("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/auth0/token");
  if (!res.ok) {
    throw new Error(`Failed to get token: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  accessToken = data.access_token;
  expiresAt = Date.now() + data.expires_in * 1000; // expires_in is in seconds

console.log(`[${new Date().toISOString()}] In <OAuth2TokenService>: Fetched a Auth0 BearerToken via BE API for ${caller}`);

  return accessToken;
}