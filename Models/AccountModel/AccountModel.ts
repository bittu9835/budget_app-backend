import mongoose from "mongoose";

export default (connection: any) => {
    const schema = new connection.Schema({
        balance: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['bank', 'card'],
            required: true
        },
        accountCardNumber: {
            type: Number,
            required: true,
        },
        bankCardName: {
            type: String,
            required: true
        },
        bankLocation: {
            type: String,
            required: false
        },
        ifcCode: {
            type: String,
            required: false
        },
        expairyDate: {
            type: Date,
            required: false
        },
        serviceProvider: {
            type: String,
            required: false
        },
        created_at: {
            type: Date,
            require: true,
            default: Date.now()
        },
        isActive: {
            type: Boolean,
            require: true,
            default: true,
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