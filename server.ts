import express from 'express';
import {ENV} from "./dotenv";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// database connection
require('./DB/db')

app.listen(ENV.APP_PORT, () => {
    console.log(`Server is running on port ${ENV.APP_PORT}`);
});