const { Op, where } = require('sequelize');
const Category = require("../../models/category");
// const db = require('../../models/index'); // Nhập đối tượng db
// const Category = new db.Category;


class CategoryAdminController {
  static async index(req, res) {
    let data = await Category.findAll();    
    try {
      res.render("admin/pages/categories/index", { categories: data });
    } catch {
      res.render("admin/pages/categories/index", { categories: [] });
    }
  }
  static new(req, res) {
    res.render("admin/pages/categories/new",);
  }
  static async create(req, res) {
    try {
    let { name, description } = req.body;
    let data = {
      name,
      description
    }
    await Category.create(data);

      res.redirect("/admin/categories");
    } catch {
      res.redirect("/admin/categories/new");
    }
  }
  static async edit(req, res) {
    let id = req.params.id;
    let data = await Category.findAll({
      where: {
        id
      }
    })
    
    res.render("admin/pages/categories/edit", {data})
  }
  static async update(req, res) {
    let id = parseInt(req.params.id, 10);
    let {name, description} = req.body;
    await Category.update(
      { name, description }, 
      {
          where: { id },
      }
  );
  res.redirect('/admin/categories')  
}

  static async delete(req,res) {
    let id = req.params.id;
    await Category.destroy({
      where: {
        id
      }
    })
    res.redirect("/admin/categories")
  }

}

module.exports = CategoryAdminController;
