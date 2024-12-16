const { Op, where } = require('sequelize');
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const validator = require("validator");


class AuthAdminController {
  static async index(req, res) {
     res.render("login", {noneRegister: 'none-active', noneLogin: '', validatorError: "", access: "", accessToken:null, refreshToken: null });
  }

  static async register(req, res) {
    res.render("login", {noneRegister: '', noneLogin: 'none-active', validatorError: "", access: "", accessToken:null, refreshToken: null });
  }

  static async login(req, res) {
    try {
      let {email, password} = req.body;
      email = _.trim(email);
      password = _.trim(password);

      let validatorError = {};

      const check = await User.findOne({ where: { email } });
      if (!check) {
        validatorError.email = "Wrong email or password"
        return res.render('login', {noneRegister: 'none-active', noneLogin: '', validatorError, access: "", accessToken:null, refreshToken: null})
      }
      const passwordMatch = await bcrypt.compare(password, check.password);
      if (passwordMatch) {

        if (check.role !== 'admin') {
          validatorError.role = "Bạn không có quyền truy cập.";
          return res.render('login', { noneRegister: 'none-active', noneLogin: '', validatorError, access: "", accessToken:null, refreshToken: null });
        }

        const accessToken = jwt.sign(
          {
            id: check.dataValues.id,
            role: check.role,
          },
          "TuanDevAccessToken",
          { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
          {
            id: check.dataValues.id,
          },
          "TuanDevRefreshToken",
          { expiresIn: "3d" }
        );
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        res.render("login", {noneRegister: 'none-active', noneLogin: '', validatorError: '', access: "", accessToken, refreshToken})

      } else {
        validatorError.email = "Wrong email or password";
        return res.render('login', {noneRegister: 'none-active', noneLogin: '', validatorError, access: "", accessToken:null, refreshToken: null})
      }
      
    } catch (e) {
      console.log(e);
      
    }
  }

}

module.exports = AuthAdminController;
