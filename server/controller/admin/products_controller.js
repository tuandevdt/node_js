
const Product = require("../../models/Product");
const Category = require("../../models/category");
const { where } = require("sequelize");


class ProductAdminController {
  static async index(req, res) {
    let data = await Product.findAll()
    
    try {
      res.render("admin/pages/products/index", { products: data });
    } catch {
      res.render("admin/pages/products/index", { products: []});
    }
  }
  static async new(req, res) {
    let data = await Category.findAll()
    try {
        res.render("admin/pages/products/new", {categoryids: data});
    } catch {
        res.render("admin/pages/products/new", {categoryids: []});
    }
  }
  static async create(req, res) {
    let { name, price, description, categoryid } = req.body;
    let image = "uploads/" + req.file.filename;
    let data = {
      name: name,
      price: price,
      description: description,
      categoryid: categoryid,
      image: image
    };
    await Product.create(data);
    try {
      res.redirect("/admin/products");
    } catch {
      res.redirect("/admin/products/new");
    }
  }
  static async edit(req, res) {
    let id = req.params.id;
    let data = await Product.findAll({
      where: {
        id
      }
    })
    res.render('admin/pages/products/edit', {data})
  }
  static async update(req, res) {
    let id = req.params.id;
    console.log(id);
    
    let {name, price, description} = req.body;
    let data = {
      name,
      price,
      description,
      image: "uploads/" + req.file.filename
    }
    
    await Product.update(
      data, 
      {
          where: { id },
      }
  );
  res.redirect('/admin/products')
  }
  static async delete(req, res) {
    let id = req.params.id;
    await Product.destroy({
      where: {
        id
      }
    })
    res.redirect("/admin/products")
  }
}

module.exports = ProductAdminController;
//index -> get Home
//new -> show Form new
//create -> tạo mới
//update -> update
//edit -> show form edit
//delete -> delete