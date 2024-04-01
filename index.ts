const PORT = process.env.PORT || 8080;
import app from './app';
import { db } from './db';

const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      console.log('Seeding the database...');
    } else {
      console.log('Not seeding the database...');
      await db.sync({ force: false });
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

init();
