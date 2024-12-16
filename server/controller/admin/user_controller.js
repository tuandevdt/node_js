const { Op, where } = require('sequelize');
const User = require("../../models/user");

class UserAdminController {
  static async index(req, res) {
     
    try {
        let users = await User.findAll();  
        res.render("admin/pages/users/index", {users});
    } catch {
        res.render("admin/pages/users/index", {users: []});
    }
  }

  static async update(req, res) {
    try {
        const id = req.params.id;
        let status = req.body.status;      
        
        await User.update({isActive: status}, {where: {id}})
        res.redirect("/admin/users")
    } catch (error) {
      console.log(error);
        res.redirect("/admin/users");
    }
    
  }

}

module.exports = UserAdminController;
