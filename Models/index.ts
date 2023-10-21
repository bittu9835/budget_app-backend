import connection from '../DB/DBconnection';
import User from "./UserModel/UserModel";
import Transactions from "./TransactionsModel/TransactionsModel";
import Account from "./AccountModel/AccountModel";
import Category from "./CategoryModel/CategoryModel";

export const UserModel = User(connection);
export const TransactionsModel = Transactions(connection);
export const AccountModel = Account(connection);
export const CategoryModel = Category(connection);
