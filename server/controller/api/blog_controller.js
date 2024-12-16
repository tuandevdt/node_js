const { where } = require("sequelize");
const Blog = require("../../models/blog");
const { resErrors, resData } = require("./common/common");


class ApiBlogController {
   static async index(req, res) {
    try {
      let blogs = await Blog.findAll();
      let message = "Get data successfully";
      resData(res, 200, message, blogs);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  static async showById(req, res) {
    try {
      const id = req.params.id;
      const blog = await Blog.findOne({ id });
      let message = "Get data successfully";
      resData(res, 200, message, blog);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  static async create(req, res) {
    try {
      let {title, text} = req.body;
      await Blog.create({title, text})
      let message = "Update data successfully";
      resData(res, 200, message);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async delete(req, res) {
    try {
      let id = req.params.id;
      await Blog.destroy({
        where: {
          id
        }
      })
      let message = "Delete data successfully";
      resData(res, 200, message);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async update(req, res) {
    try {
      const id = req.params.id;
      let {title, text} = req.body;
      await Blog.update({title, text}, {where: {id}})
      let message = "Update data successfully";
    resData(res, 200, message);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  

  //   static async update(req, res) {
  //     try {
  //         let id = req.params.id
  //         let {name, price, image, description} = req.body;
  //         let data = await Product.update(
  //             {name, price, image, description},
  //              {
  //                 where: {
  //                     id
  //                 }
  //             }
  //         )
  //         let message  = "Update is successfully";
  //         resData(res, 201, message, data)
  //     } catch (error) {
  //         resErrors(res, 500, error.message)
  //     }
  //   }


  
  
  
}
module.exports = ApiBlogController;
