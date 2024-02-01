import mongoose from 'mongoose';
import app from './app.js';

(async function startServer() {
  try {
    const { DB_HOST, PORT = 3000 } = process.env;
    await mongoose.connect(DB_HOST);

    app.listen(PORT, () => {
      console.log('DB has connected successful');
      console.log('Server running');
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
