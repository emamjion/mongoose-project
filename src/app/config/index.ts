import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
};
