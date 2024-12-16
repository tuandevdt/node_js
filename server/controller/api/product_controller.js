const { where } = require("sequelize");
const { Op } = require('sequelize');
const Product = require("../../models/Product");
const {resErrors, resData} = require('./common/common')
class ApiProductController {
  static async index(req, res) {
    const name = req.query.productname;
    console.log("productname:", name);
    
    try {
      let products;

      if (name) {
        products = await Product.findAll({
          where: {
            name: {
              [Op.like]: `%${name}%` // Sử dụng biến name thay vì productName
            }
          }
        });
      } else {
        products = await Product.findAll();
      }

      let message = "Get data successfully";
      return resData(res, 200, message, products);
    } catch (error) {
      return resErrors(res, 500, error.message);
    }
  }

  static async show(req, res) {
    try {
        let id = req.params.id;
        let product = await Product.findOne({where: {id}})
        let message  = "Get data detail successfully";
        resData(res, 200, message, product)
    } catch (error) {
        resErrors(res, 500, error.message)
    }
  }

  static async showByCategory(req, res) {
    try {
      const categoryid = req.params.id;
      let products = await Product.findAll({where: {categoryid}})
      let message  = "Get data detail successfully";
        resData(res, 200, message, products)
    } catch (error) {
      resErrors(res, 500, error.message)
    }
  }

  static async showByName(req, res) {
    try {
      const name = req.query.productname;
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${productName}%`
          }
        }
      });
      res.status(200).json(products);
    } catch (error) {
      resErrors(res, 500, error.message)
    }
  }

  static async create(req, res) {
    try {
        let {name, price, image, description} = req.body;
        let data = await Product.create({name, price, image, description})
        
        let message  = "Create is successfully";
        
        resData(res, 201, message, data)
    } catch (error) {
        resErrors(res, 500, error.message)
    }
  }

  static async delete(req, res) {
    try {
        let id = req.params.id;
        await Product.destroy({
            where: {
                id
            }
        })
        let message  = "Delete is successfully";
        resData(res, 201, message)
    } catch (error) {
        resErrors(res, 500, error.message)
    }        
  }

  static async update(req, res) {
    try {
        let id = req.params.id
        let {name, price, image, description} = req.body;
        let data = await Product.update(
            {name, price, image, description},
             {
                where: {
                    id
                }
            }
        )
        let message  = "Update is successfully";
        resData(res, 201, message, data)
    } catch (error) {
        resErrors(res, 500, error.message)
    }
  }
}
module.exports = ApiProductController;
