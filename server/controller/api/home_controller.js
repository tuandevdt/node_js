const { Op, where } = require("sequelize");
const Category = require("../../models/category");
const Product = require("../../models/product");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

var salt = bcrypt.genSaltSync(10);

class ApiHomeController {
    static 
}

module.exports = ApiHomeController;