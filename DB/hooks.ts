import { AccountModel } from "../Models";

const transactionAdded = async (schema: any, paymentMethod: string) => {
    schema.post('save', async (doc: { [_id: string]: any; _id: any; }, next: () => void) => {
        if (doc.paymentMethod !== 'Cash') {
            let balance: number = 0;
            const prevAccount = await AccountModel.findOne({ accountCardNumber: doc.from })
            if (doc.action === 'income') {
                balance = prevAccount.balance + doc.amount;
            } else if (doc.action === 'expence') {
                balance = prevAccount.balance - doc.amount;
            }
            await AccountModel.findOneAndUpdate({ _id: prevAccount._id }, { balance })
            next();
        } else {
            next();
        }
    })
}
const transactionUpdated = async (schema: any, paymentMethod: string) => {
    schema.post('findOneAndUpdate', async (doc: { [_id: string]: any; _id: any; }, next: () => void) => {
        if (doc.paymentMethod !== 'Cash') {
            const prevAccount = await AccountModel.findOne({ accountCardNumber: doc.from })
            if (doc.action === 'income') {
                await AccountModel.findOneAndUpdate({ _id: prevAccount._id }, { balance: prevAccount.balance - doc.amount }, { new: true })
                next();
            } else if (doc.action === 'expence') {
                await AccountModel.findOneAndUpdate({ _id: prevAccount._id }, { balance:prevAccount.balance + doc.amount }, { new: true })
                next();
            }
            next();
        } else {
            next();
        }
    })
}
export default {
    transactionAdded,
    transactionUpdated
}