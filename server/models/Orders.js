const { Model, DataTypes } = require('sequelize');
const sequelize = require('./connectDB');

class Order extends Model {
    // Bạn có thể thêm các phương thức tùy chỉnh ở đây nếu cần
}

// Khởi tạo model
Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // bắt buộc có giá trị
    },
    address_id: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
    },
    total: {
        type: DataTypes.DECIMAL,
    },
}, {
    sequelize,
    modelName: 'Order',
    paranoid: false, // Không sử dụng soft delete
});

// Phương thức associate
Order.associate = (models) => {
    console.log("Associating Cart with User and Product");
    Order.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'ID' });
    Order.belongsTo(models.Address, { foreignKey: 'address_id', targetKey: 'ID' });
};

module.exports = Order;