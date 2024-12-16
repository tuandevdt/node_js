const { Model, DataTypes } = require('sequelize');
const sequelize = require('./connectDB');

class Review extends Model {
    // Bạn có thể thêm các phương thức tùy chỉnh ở đây nếu cần
}

// Khởi tạo model
Review.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // bắt buộc có giá trị
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    text: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'Review',
    paranoid: false, // Không sử dụng soft delete
});

// Thêm phương thức associate
Review.associate = (models) => {
    console.log("Associating Review with User and Product");
    Review.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'ID' });
    Review.belongsTo(models.Product, { foreignKey: 'product_id', targetKey: 'ID' });
};

module.exports = Review;