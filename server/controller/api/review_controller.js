const { where } = require("sequelize");
const Review = require("../../models/review");
const User = require("../../models/user");
const {resErrors, resData} = require('./common/common')
class ApiReviewController {
  static async index(req, res) {
    
    try {
      
      const product_id = req.query.product_id;
      const reviews = await Review.findAll({ where: { product_id } });
      const userIds = reviews.map(review => review.user_id);

      const users = await User.findAll({
        where: {
            id: userIds
        },
        attributes: ['id', 'username'] // Chỉ lấy id và username
    });

    const userMap = {};
        users.forEach(user => {
            userMap[user.id] = user.username;
        });

        // Gộp thông tin username vào từng review
        const reviewsWithUsernames = reviews.map(review => {
            return {
                ...review.dataValues, // Sao chép tất cả các thuộc tính của review
                username: userMap[review.user_id] || null // Thêm username
            };
        });
    console.log(reviewsWithUsernames);
      const message = "Lấy dữ liệu thành công";
      resData(res, 200, message, reviewsWithUsernames);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async show(req, res) {
    try {
      const id = req.params.id;
      console.log(`id: ${id}`);
      
      const review = await Review.findOne({ where: {id} });
      const message = "Lấy dữ liệu thành công";
      resData(res, 200, message, review);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async create(req, res) {
    try {
        let {product_id, text, rating, user_id} = req.body;
        rating = Number(rating);
        const data = {product_id, text, rating, user_id}
        console.log(`dataacomment: ${data}`);
        
        const datass = await Review.create(data); 

        let message  = "Add Comment is successfully";
        return resData(res, 201, message, datass)
    } catch (error) {
        return resErrors(res, 500, error.message)
    }
  }

  static async delete(req, res) {
    try {
        let id = req.params.id;
        await Review.destroy({
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
        let {rating, text} = req.body;
        console.log(`rating: ${rating}`);
        console.log(`text: ${text}`);
        
        
        let data = await Review.update(
          {rating, text},
             {
                where: {
                    id
                }
            }
        )
        let message  = "Update Comment is successfully";
        resData(res, 201, message, data)
    } catch (error) {
        resErrors(res, 500, error.message)
    }
  }
}
module.exports = ApiReviewController;
