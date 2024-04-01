const admin = require('firebase-admin');
import { ENV } from '../utils/env';

admin.initializeApp({
  credential: admin.credential.cert(ENV.SERVICE_ACCOUNT),
});
