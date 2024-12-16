const { Model, DataTypes } = require('sequelize');
const sequelize = require('./connectDB');

class Order_item extends Model {
    // Bạn có thể thêm các phương thức tùy chỉnh ở đây nếu cần
}

// Khởi tạo model
Order_item.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // bắt buộc có giá trị
    },
    product_id: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.DECIMAL(10,0),
    },
}, {
    sequelize,
    modelName: 'Order_item',
    paranoid: false, // Không sử dụng soft delete
});

// Phương thức associate
Order_item.associate = (models) => {
    Order_item.belongsTo(models.Order, { foreignKey: 'order_id', targetKey: 'ID' });
    Order_item.belongsTo(models.Product, { foreignKey: 'product_id', targetKey: 'ID' });
};

module.exports = Order_item;