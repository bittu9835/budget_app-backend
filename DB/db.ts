import mongoose from 'mongoose';
import {ENV} from "../dotenv";
const mongoURI = `${ENV.DB_HOST}/${ENV.DB_NAME}`;
const connectionProperties:any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(mongoURI, connectionProperties).then((response:any)=>{
    console.log('MongoDB Connection Succeeded.')
}).catch((error:any)=>{
    console.log('Error in DB connection: ' + error)
});
export default mongoose;