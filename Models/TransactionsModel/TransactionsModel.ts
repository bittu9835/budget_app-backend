import mongoose from "mongoose";

export default (connection: any) => {
    const schema = new connection.Schema({
        amount: {
            type: Number,
            required: true
        },
        action: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
            require: true
        },
        from: {
            type: String,
            require: true
        },
        created_at: {
            type: Date,
            require: true,
            default: Date.now()
        },
        date:{
            type: Date,
            require: true,
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