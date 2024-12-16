const { where } = require("sequelize");
const Cart = require("../../models/cart");
const Product = require("../../models/product");
const {resErrors, resData} = require('./common/common')
class ApiCartController {
  static async index(req, res) {
    try {
        const user_id = req.query.user_id;

        // Lấy giỏ hàng của người dùng
        const carts = await Cart.findAll({ where: { user_id } });

        // Lấy danh sách product_id từ giỏ hàng
        const productIds = carts.map(cart => cart.product_id);

        // Lấy thông tin sản phẩm dựa trên product_id
        const products = await Product.findAll({
            where: {
                id: productIds
            },
            attributes: ['id', 'name', 'image', 'price'] // Chọn các thuộc tính bạn muốn lấy
        });

        // Kết hợp thông tin sản phẩm vào giỏ hàng
        const cartsWithProducts = carts.map(cart => {
            const product = products.find(p => p.id === cart.product_id);
            return {
                ...cart.toJSON(), // Chuyển đổi cart thành đối tượng
                product // Thêm thông tin sản phẩm vào cart
            };
        });

        let message = "Get data successfully";
        resData(res, 200, message, cartsWithProducts);
    } catch (error) {
        resErrors(res, 500, error.message);
    }
}

  static async create(req, res) {
    try {
        let {product_id, quantity, user_id} = req.body;
        quantity = Number(quantity);
        const checkProductCart = await Cart.findOne({ where: { product_id, user_id } }); 
        if(checkProductCart) {
          await Cart.update(
            { quantity: checkProductCart.quantity + quantity },
            { where: { product_id, user_id } } 
          );
          let message  = "Update Cart successfully";
          return resData(res, 200, message)
        }  

        const data = {
          product_id,quantity, user_id
        }
        await Cart.create(data);
        let message  = "Add Cart is successfully";
        return resData(res, 201, message)
    } catch (error) {
        return resErrors(res, 500, error.message)
    }
  }

  static async delete(req, res) {
    try {
        let id = req.params.id;
        await Cart.destroy({
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
        let id = req.params.id;
        let quantity = req.body.quantity;
        console.log(`id: ${id}`);
        console.log(`quantity: ${quantity}`);
        
        
        let data = await Cart.update(
            {quantity},
             {
                where: {
                    id
                }
            }
        )
        let message  = "Update Cart is successfully";
        resData(res, 201, message, data)
    } catch (error) {
        resErrors(res, 500, error.message)
    }
  }
}
module.exports = ApiCartController;
