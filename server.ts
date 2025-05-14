import express from 'express';
import {ENV} from "./dotenv";
import cors from 'cors';
import API from './API';
import {getDBStatus} from "./DB/DBconnection";

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());
app.use('/api',API);

// database connectionS
import ('./DB/DBconnection')

app.get('/ping', (req, res) => {
    const status = getDBStatus();
    if (status == 'connected') {
        res.status(200).json({message: 'pong'});
    } else {
        res.status(500).json({message: 'error'});
    }

});

app.listen(ENV.APP_PORT,() => {
    console.log(`Server is running on port ${ENV.APP_PORT}`);
});