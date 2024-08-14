export default (connection: any) => {
    const schema = new connection.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        googleId: {
            type: String,
            required: false,
            unique: true
        },
        img_url: {
            type: String,
            require: true,
            default: ""
        },
    });
    const UserModel = connection.model('User', schema);
    return UserModel;
};