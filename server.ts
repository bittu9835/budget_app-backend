import express from 'express';
import {ENV} from "./dotenv";
import cors from 'cors';
import API from './API';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api',API);

// database connectionS
import ('./DB/DBconnection')

app.listen(ENV.APP_PORT, () => {
    console.log(`Server is running on port ${ENV.APP_PORT}`);
});