const { Model, DataTypes } = require('sequelize');
const sequelize = require('./connectDB');

class User extends Model {
    // Bạn có thể thêm các phương thức tùy chỉnh ở đây nếu cần
}

// Khởi tạo model
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false, // bắt buộc có giá trị
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
    },
    isActive: {
        type: DataTypes.NUMBER,
    },
}, {
    sequelize,
    modelName: 'User',
    paranoid: false, // có thể để ở đây hoặc trong các thuộc tính
});

// Thêm phương thức associate
User.associate = (models) => {
    console.log("Associating User with Review and Cart");
    User.hasMany(models.Review, { foreignKey: 'user_id', sourceKey: 'ID' });
    User.hasMany(models.Cart, { foreignKey: 'user_id', sourceKey: 'ID' });
};

module.exports = User;