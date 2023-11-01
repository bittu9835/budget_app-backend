import mongoose from "mongoose";

export default (connection: any) => {
    const schema = new connection.Schema({
        balance: {
            type: Number,
            required: true,
            default:0
        },
        type:{
          type:String,
          enum:['Account','Card'],
          required:true
        },
        Account_number: {
            type: String,
            required: true
        },
        bankName: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            require: true,
            default: Date.now()
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
    });
    const AccountModel = connection.model('Accounts', schema);
    return AccountModel;
};