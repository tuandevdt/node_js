const { Model, DataTypes } = require('sequelize');
const sequelize = require('./connectDB');

class Address extends Model {
    // Bạn có thể thêm các phương thức tùy chỉnh ở đây nếu cần
}

// Khởi tạo model
Address.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // bắt buộc có giá trị
    },
    phone: {
        type: DataTypes.STRING,
    },
    ward: {
        type: DataTypes.STRING,
    },
    district: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    is_primary: {
        type: DataTypes.INTEGER,
    },
    fullname: {
        type: DataTypes.STRING,
    },
    street: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Address',
    paranoid: false, // Không sử dụng soft delete
});

// Phương thức associate
Address.associate = (models) => {
    console.log("Associating Cart with User and Product");
    Address.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'ID' });
    // Order.belongsTo(models.Product, { foreignKey: 'product_id', targetKey: 'ID' });
};

module.exports = Address;