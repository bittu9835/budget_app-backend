
export default (connection: any) => {
    const schema = new connection.Schema({
        category: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true
        },
     
    });
    const CategoryModel = connection.model('Category', schema);
    return CategoryModel;
};