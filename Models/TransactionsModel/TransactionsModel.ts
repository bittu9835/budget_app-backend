import mongoose from "mongoose";

export default (connection: any) => {
    const schema =  new connection.Schema({
        amount: {
            type: Number,
            required: true
        },
        DrCr: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        from:{
          type:String,
          require:true
        },
        created_at:{
            type:Date,
            require:true
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
    });
    const TransactionsModel = connection.model('Transactions', schema);
    return TransactionsModel;
};