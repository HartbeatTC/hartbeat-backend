export async function addAdmin() {
  console.log('addAdmin');
  const admin = require('firebase-admin');
  const user = await admin.auth().getUserByEmail('naguila.mandich@gmail.com');
  console.log('user', user);
  await admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });
}
