const { Model, DataTypes } = require('sequelize');
const sequelize = require('./connectDB');

class Category extends Model {
    // Bạn có thể thêm các phương thức tùy chỉnh ở đây nếu cần
}

// Khởi tạo model
Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'Category',
    paranoid: true, // Sử dụng soft delete
});

module.exports = Category;