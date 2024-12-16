const { Model, DataTypes } = require('sequelize');
const sequelize = require('./connectDB');

class Cart extends Model {
    // Bạn có thể thêm các phương thức tùy chỉnh ở đây nếu cần
}

// Khởi tạo model
Cart.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // bắt buộc có giá trị
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName: 'Cart',
    paranoid: false, // Không sử dụng soft delete
});

// Phương thức associate
Cart.associate = (models) => {
    console.log("Associating Cart with User and Product");
    Cart.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'ID' });
    Cart.belongsTo(models.Product, { foreignKey: 'product_id', targetKey: 'ID' });
};

module.exports = Cart;