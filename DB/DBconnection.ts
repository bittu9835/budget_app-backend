import mongoose from 'mongoose';
import { ENV } from '../dotenv';

let dbStatus = 'disconnected';
const mongoURI = `${ENV.DB_HOST}/${ENV.DB_NAME}`;
const connectionProperties: any = {
//   useCreateIndex: true,s
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(mongoURI, connectionProperties)
  .then((response: any) => {
    dbStatus = 'connected';
    console.log('MongoDB Connection Succeeded.');
  })
  .catch((error: any) => {
    dbStatus = 'error';
    console.log('Error in DB connection: ' + error);
  });

export const getDBStatus = () => dbStatus;
export default mongoose;
