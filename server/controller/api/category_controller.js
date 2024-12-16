const { where } = require("sequelize");
const Cagegory = require("../../models/category");
const {resErrors, resData} = require('./common/common')
class ApiCategoryController {
  static async index(req, res) {
    try {
      let categories = await Cagegory.findAll();
      let message  = "Get data successfully";
      resData(res, 200, message, categories)
    } catch (error) {
        resErrors(res, 500, error.message)
    }
  }

  static async show(req, res) {
    try {
        let id = req.params.id;
        let category = await Cagegory.findOne({where: {id}})
        let message  = "Get data detail successfully";
        resData(res, 200, message, category)
    } catch (error) {
        resErrors(res, 500, error.message)
    }
  }

}
module.exports = ApiCategoryController;
