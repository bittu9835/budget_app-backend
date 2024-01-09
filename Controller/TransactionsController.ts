import mongoose from "mongoose";
import { CategoryModel, TransactionsModel } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerRisponse";
import { getLastMonths, getRandomColor } from "../utils";
const response = new ServerResponseClass();

interface LineGraphDataResponse {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
}


export default {
    createTransactions: async (req: any, res: any) => {
        try {
            req.body['created_by'] = req.user.userId;
            const Category = await CategoryModel.findOne({ category: req.body.category.toUpperCase(), action: req.body.action });
            if (Category) {
                const newTransaction = await TransactionsModel.create(req.body);
                response.handleSuccess(res, newTransaction, 'Transaction Added.')
            } else {
                await CategoryModel.create({ category: req.body.newCategory?.toUpperCase(), action: req.body.action });
                const newTransaction = await TransactionsModel.create(req.body);
                response.handleSuccess(res, newTransaction, 'Transaction Added.')
            }
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    getTransactions: async (req: any, res: any) => {
        try {
            const searchValue = req.query.search;
            const filter = {
                created_by: req.user.userId,
                deleted: false,
                $or: [
                    { category: { $regex: searchValue, $options: 'i' } },
                    { description: { $regex: searchValue, $options: 'i' } },
                    { paymentMethod: { $regex: searchValue, $options: 'i' } },
                    // { amount: { $eq: parseInt(searchValue) || 0 } }
                ]
            };
            const Transaction = await TransactionsModel.find(filter).sort({ created_at: -1 });
            response.handleSuccess(res, Transaction, 'Transaction fetched Successfully');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },
    getTransactionsForDashboard: async (req: any, res: any) => {
        try {
            const Transaction = await TransactionsModel.find({ created_by: req.user.userId, deleted: false, }).sort({ created_at: -1 });
            response.handleSuccess(res, Transaction, 'Transaction fetched Successfully');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    getTransactionsForEdit: async (req: any, res: any) => {
        try {
            const Transaction = await TransactionsModel.findOne({ _id: req.query._id, deleted: false }, { _id: 1, amount: 1, action: 1, category: 1, description: 1, paymentMethod: 1, from: 1, date: 1, });
            response.handleSuccess(res, Transaction, 'Transaction fetched ForEdit Successfully');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    editTransactions: async (req: any, res: any) => {
        try {
            const Transaction = await TransactionsModel.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true });
            response.handleSuccess(res, Transaction, 'Transaction Updated');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    deleteTransactions: async (req: any, res: any) => {
        try {
            await req.body.forEach(async (req: string) => {
                await TransactionsModel.findOneAndUpdate({ _id: req }, { deleted: true }, { new: true })
            });
            response.handleSuccess(res, null, 'Deleted Successfully');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },
    getBarGraphData: async (req: any, res: any) => {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        let groupedData = await TransactionsModel.aggregate([
            {
                $match: {
                    created_by: userId,
                    deleted: false
                }
            },
            {
                $group: {
                    _id: {
                        action: '$action',
                        month: { $month: '$date' },
                    },
                    amount: { $sum: '$amount' },
                }
            },
            {
                $project: {
                    _id: 0,
                    action: '$_id.action',
                    month: '$_id.month',
                    amount: 1
                }
            }
        ])
        const groupedLogs = groupedData.map((data: any) => {
            return {
                action: data.action,
                amount: data.amount,
                month: data.month.toString().length === 1 ? "0" + data.month.toString() : data.month.toString()
            }
        })
        let assetObj: any = {};
        for (let el of groupedLogs) {
            assetObj[el.action] = el.action;
        }
        let months = getLastMonths(12, 'MMM-YY');
        let data: any = {
            labels: months?.map((e: any) => e.monthName) ?? [],
            datasets: []
        };
        for (let action of Object.keys(assetObj)) {
            let obj: any = {
                label: action,
                data: [],
                backgroundColor: ''
            }
            for (let month of months) {
                let f: any = groupedLogs.find((e: any) => e.action == action && e.month.toString() == month.month)
                obj.data.push(f ? f.amount : 0)
                obj.backgroundColor = `rgba(${getRandomColor()}, 1)`
            }
            data.datasets.push(obj)
        }
        response.handleSuccess(res, data, 'Logs Counted Successfully.')
    },

    getLineGraphData: async (req: any, res: any) => {
        try {
            const userId = new mongoose.Types.ObjectId(req.user.userId);

            // Calculate total income and total expense for each month
            let groupedData = await TransactionsModel.aggregate([
                {
                    $match: {
                        created_by: userId,
                        deleted: false,
                    },
                },
                {
                    $group: {
                        _id: {
                            month: { $month: '$date' },
                            action: '$action',
                        },
                        totalAmount: { $sum: '$amount' },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        action: '$_id.action',
                        month: '$_id.month',
                        totalAmount: 1,
                    },
                },
            ]);

            const totalBalanceData = groupedData.reduce((acc: any, data: any) => {
                const monthKey = data.month.toString().padStart(2, '0');
                acc[monthKey] = acc[monthKey] || { month: monthKey, income: 0, expense: 0 };
                if (data.action === 'income') {
                    acc[monthKey].income += data.totalAmount ?? 0;
                } else if (data.action === 'expense') {
                    acc[monthKey].expense += data.totalAmount ?? 0;
                }
                return acc;
            }, {});

            // Get the last 12 months
            let months = getLastMonths(12, 'MMM-YY');

            // Prepare the data for the chart
            const data: LineGraphDataResponse = {
                labels: Array.isArray(months) ? months.map((e: any) => e.monthName) : [],
                datasets: [
                    {
                        label: 'Total Balance',
                        data: [],
                        backgroundColor: `rgba(${getRandomColor()}, 1)`,
                    },
                ],
            };

            // Populate data for each month
            for (let month of months) {
                const monthKey = month.month.toString().padStart(2, '0');
                const totalIncome = totalBalanceData[monthKey]?.income || 0;
                const totalExpense = totalBalanceData[monthKey]?.expense || 0;
                const totalBalance = totalIncome - totalExpense || 0;
                data.datasets[0].data.push(totalBalance);
            }

            // Send the response
            response.handleSuccess(res, data, 'Logs Counted Successfully.')
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    },
    getExpenseData: async (req: any, res: any) => {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        let groupedData = await TransactionsModel.aggregate([
            {
                $match: {
                    created_by: userId,
                    deleted: false,
                    action: { $ne: 'income' }
                },
            },
            {
                $group: {
                    _id: {
                        category: "$category",
                    },
                    amount: { $sum: '$amount' },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id.category",
                    amount: 1
                },
            },
        ]);

        response.handleSuccess(res, groupedData, 'Logs Counted Successfully.')
    },
    getIncomeData: async (req: any, res: any) => {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        let groupedData = await TransactionsModel.aggregate([
            {
                $match: {
                    created_by: userId,
                    deleted: false,
                    action: { $ne: 'expence' }
                },
            },
            {
                $group: {
                    _id: {
                        category: "$category",
                    },
                    amount: { $sum: '$amount' },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id.category",
                    amount: 1
                },
            },
        ]);

        response.handleSuccess(res, groupedData, 'Logs Counted Successfully.')
    },
    getBalanceByPaymentMethod: async (req: any, res: any) => {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        let groupedData = await TransactionsModel.aggregate([
            {
                $match: {
                    created_by: userId,
                    deleted: false,
                }
            },
            {
                $group: {
                    _id: {
                        pm: '$paymentMethod',
                        action: "$action"
                    },
                    amount: { $sum: "$amount" },
                }
            },
        ])
        response.handleSuccess(res, groupedData, 'getBalanceByPaymentMethod Successfully.')
    },


}