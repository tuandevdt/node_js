const { Op, where } = require('sequelize');
const sequelize = require("../../models/connectDB"); // Import sequelize
const Order = require("../../models/Orders");
const User = require("../../models/user"); // require model User
const Product = require("../../models/Product"); // require model Product

class OrderAdminController {
  static async index(req, res) {
    try {
        const orders = await Order.findAll()
        console.log(orders);
        
        res.render("admin/pages/orders/index", { orders });
    } catch (error) {
        console.error(error); // Log lỗi để dễ dàng kiểm tra
        res.render("admin/pages/orders/index", { orders: [] });
    }
  }

  static async delete(req, res) {
    try {
        const id = req.params.id;        
        await Review.destroy({ where: { id } });
        res.redirect("/admin/reviews");
    } catch (error) {
        console.log(error);
        res.redirect("/admin/reviews");
    }
  }
  static async update(req, res) {
    const id = req.params.id;
    const status = req.query.status;
    try {
      await Order.update({status}, {where: {id}})
      res.redirect("/admin/orders");
    } catch (error) {
      console.error(error); // Log lỗi để dễ dàng kiểm tra
      res.redirect("/admin/orders");
    }
  }
}

module.exports = OrderAdminController;