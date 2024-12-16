const { Op, where } = require('sequelize');
const sequelize = require("../../models/connectDB"); // Import sequelize
const Review = require("../../models/Review");
const User = require("../../models/user"); // require model User
const Product = require("../../models/Product"); // require model Product

class ReviewAdminController {
  static async index(req, res) {
    try {
        const reviews = await sequelize.query(`
            SELECT r.*, u.username, p.image, p.ID AS product_id
            FROM Reviews r
            LEFT JOIN Users u ON r.user_id = u.ID
            LEFT JOIN Products p ON r.product_id = p.ID
        `, {
            type: sequelize.QueryTypes.SELECT
        });
                
        res.render("admin/pages/reviews/index", { reviews });
    } catch (error) {
        console.error(error); // Log lỗi để dễ dàng kiểm tra
        res.render("admin/pages/reviews/index", { reviews: [] });
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
}

module.exports = ReviewAdminController;