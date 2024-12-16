const { where } = require("sequelize");
const Order_item = require("../../models/Order_item");


const {resErrors, resData} = require('./common/common')
class ApiOrder_itemController {
  static async index(req, res) {
    try {
        const response = await Order_item.findAll();
        const message = "Get orderitem is oke";
        resData(res, 200, message, response);
    } catch (error) {
        resErrors(res, 500, error.message);
    }
}

  static async create(req, res) {
    try {
        let {order_id, product_id, quantity, price} = req.body;
        const data = {order_id, product_id, quantity, price};
        console.log(`response orderitem`, data);
        
        const response = await Order_item.create(data);
        const message = "create orderitem is successfully";
        resData(res, 200, message, response);
    } catch (error) {
      console.error('Error creating order item:', error); // Log lỗi chi tiết
      console.error('Error stack:', error.stack); // Log stack trace
      resErrors(res, 500, error.message);
    }
  }


}
module.exports = ApiOrder_itemController;
