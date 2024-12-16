const { where } = require("sequelize");
const Order = require("../../models/Orders");
const Product = require("../../models/product");
const OrderItem = require("../../models/Order_item");

const {resErrors, resData} = require('./common/common')
class ApiOrderController {
  static async index(req, res) {
    try {
        const user_id = req.query.user_id;
        const response = await Order.findAll({ where: { user_id } });
        const message = "Get orders is oke";
        resData(res, 200, message, response);
    } catch (error) {
        resErrors(res, 500, error.message);
    }
}

static async show(req, res) {
  try {
      const order_id = req.params.id;
      console.log('id orderitem', order_id);

      // Bước 1: Lấy OrderItems
      const orderItems = await OrderItem.findAll({ where: { order_id } });

      // Bước 2: Lấy danh sách product_id từ orderItems
      const product_ids = orderItems.map(item => item.product_id);

      // Bước 3: Lấy Products dựa trên danh sách product_ids
      const products = await Product.findAll({
          where: {
              id: product_ids
          },
          attributes: ['id', 'image', 'name'] // Chọn các trường cần thiết
      });

      // Bước 4: Gộp dữ liệu
      const response = orderItems.map(item => {
          const product = products.find(prod => prod.id === item.product_id); // Tìm sản phẩm tương ứng
          return {
              ...item.toJSON(), // Chuyển đổi đối tượng Sequelize thành đối tượng thuần JavaScript
              product: product || null // Gán sản phẩm vào order item, nếu không tìm thấy thì gán null
          };
      });

      const message = "Get order item is OK";
      resData(res, 200, message, response);
  } catch (error) {
      console.error(error);
      resErrors(res, 500, error.message);
  }
}

static async update(req, res) {
    const id = req.params.id;
    const status = req.body.status;
    console.log('id update', id);
    console.log('status', status);
    try {
        const response = await Order.update({status}, {where: {id}})
        const message = "UPDATE STATUS ORDER is OK";
        resData(res, 200, message, response);
    } catch (error) {
        console.error(error);
        resErrors(res, 500, error.message);
    }
}

  static async create(req, res) {
    try {
        let {user_id, address_id, status, total} = req.body;
        const data = {user_id, address_id, status, total};
        const response = await Order.create(data);
        console.log('response orders', response);
        
        const message = "create Order is successfully";
        resData(res, 200, message, response);
    } catch (error) {
        console.error("Error creating address:", error); // Log lỗi chi tiết
    resErrors(res, 500, error.message);
    }
  }


}
module.exports = ApiOrderController;
