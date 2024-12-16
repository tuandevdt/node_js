const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const Product = require("./Product");
const Address = require("./Address");
const Cart = require("./cart");
const Category = require("./category");
const Order_item = require("./Order_item");
const Order = require("./Orders");
const Review = require("./Review");
const User = require("./user");
console.log("Starting application...");

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    try {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      console.log(`Loaded model: ${model.name}`); // Log model đã tải
      db[model.name] = model;
    } catch (error) {
      console.error(`Error loading model ${file}:`, error); // Log lỗi nếu có
    }
  });

// Thiết lập các mối quan hệ (associations)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
  Product,
  Cart,
  Address,
  Category,
  Order,
  Order_item,
  Review,
  User
};