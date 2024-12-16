const { where } = require("sequelize");
const Address = require("../../models/Address");
const {resErrors, resData} = require('./common/common')
class ApiAddressController {
  static async index(req, res) {
    try {
        const response = await Address.findAll();
        console.log("response address", response);
        
        const message = "Get address is oke";
        resData(res, 200, message, response);
    } catch (error) {
        resErrors(res, 500, error.message);
    }
}

  static async create(req, res) {
    try {
        let {user_id, fullname, phone, street, ward, district, city, is_primary} = req.body;

        const data = {user_id, fullname, phone, street, ward, district, city, is_primary};
        console.log('data',data);
        
        const response = await Address.create(data);
        const message = "create Order is successfully";

        resData(res, 200, message, response);
    } catch (error) {
      console.error("Error creating address:", error); // Log lỗi chi tiết
      resErrors(res, 500, error.message);    }
  }


}
module.exports = ApiAddressController;
