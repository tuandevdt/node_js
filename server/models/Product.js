const { Model, DataTypes } = require('sequelize');
const sequelize = require('./connectDB');

class Product extends Model {
    // Bạn có thể thêm các phương thức tùy chỉnh ở đây nếu cần
}

// Khởi tạo model
Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DECIMAL,
    },
    image: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    categoryid: {
        type: DataTypes.TINYINT,
    },
}, {
    sequelize,
    modelName: 'Product',
    paranoid: true, // Sử dụng soft delete
});

// Phương thức associate
Product.associate = (models) => {
    console.log("Associating Product with Review and Cart");
    Product.hasMany(models.Cart, { foreignKey: 'product_id', sourceKey: 'ID' });
    Product.hasMany(models.Review, { foreignKey: 'product_id', sourceKey: 'ID' }); // Thêm mối quan hệ với Review
};

module.exports = Product;