import mongoose from "mongoose";
import hooks from "../../DB/hooks";
export default (connection: any) => {
    const schema = new connection.Schema({
        _id: {
            type: String,
            default: () => crypto.randomUUID(),
            unique: true
        },
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
        synced: {
            type: Boolean,
            default: false
        },
        edited: {
            type: Boolean,
            default: false
        },
        // ids: {
        //     type: String,
        //     required: true,
        //     unique: true
        // },
        deleted: {
            type: Boolean,
            default: false
        },
        created_at: {
            type: Date,
            require: true,
            default: Date.now
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
        // deleted:{
        //     type:Boolean,
        //     default:false
        // }
    },{_id: false});
    hooks.transactionAdded(schema,'paymentMethod')
    hooks.transactionUpdated(schema,'paymentMethod')
    const TransactionsModel = connection.model('Transactions', schema);
    return TransactionsModel;
};