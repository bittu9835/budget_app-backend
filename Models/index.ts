import connection from '../DB/DBconnection';
import User from "./UserModel/UserModel";

export const UserModel = User(connection);
