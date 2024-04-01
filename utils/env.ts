require('dotenv').config();
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
  return value;
}

// Then, use this function to access your environment variable
const FIREBASE_PK = getEnvVar('FIREBASE_DEV_PRIVATE_KEY').replace(/\\n/g, '\n');

export const ENV = {
  API_URL: 'http://localhost:8080/api',
  SERVICE_ACCOUNT: {
    type: process.env.FIREBASE_DEV_TYPE,
    project_id: process.env.FIREBASE_DEV_PROJECT_ID,
    private_key_id: process.env.FIREBASE_DEV_PRIVATE_KEY_ID,
    private_key: FIREBASE_PK,
    client_email: process.env.FIREBASE_DEV_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_DEV_CLIENT_ID,
    auth_uri: process.env.FIREBASE_DEV_AUTH_URI,
    token_uri: process.env.FIREBASE_DEV_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_DEV_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_DEV_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_DEV_UNIVERSE_DOMAIN,
  },
};
