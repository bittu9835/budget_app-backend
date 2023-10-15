import connection from '../DB/DBconnection';
import User from "./UserModel/UserModel";
import Transactions from "./TransactionsModel/TransactionsModel";

export const UserModel = User(connection);
export const TransactionsModel = Transactions(connection);
