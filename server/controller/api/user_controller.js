const { where } = require("sequelize");
const User = require("../../models/user");
const { resErrors, resData } = require("./common/common");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const salt = bcrypt.genSaltSync(10);

class ApiUserController {
  static async create(req, res) {
    try {
      let datas = req.body;
      let username = datas.username;
      let email = _.trim(datas.email);
      let password = _.trim(datas.password);

      let isPass = validator.isLength(password, { min: 5, max: 15 });

      let validatorError = {};
      let isValidator = false;

      if (!isPass) {
        validatorError.password = "Password quá ngắn hoặc quá dài!!!";
        isValidator = true;
      }
      const isUsername = await User.findOne({ where: { username } });
      const isEmail = await User.findOne({ where: { email } });

      if (isUsername) {
        validatorError.username = "Email đã tồn tại!!!";
        // return resErrors(res, 400, "Username đã tồn tại!!!");
        isValidator = true;
      }
      if (isEmail) {
        // return resErrors(res, 400, "Email đã tồn tại!!!");
        validatorError.email = "Email đã tồn tại!!!";
        isValidator = true;
      }

      if (isValidator) {
        return resErrors(res, 400, validatorError);
      }

      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);

      let isActive = 1;
      await User.create({ username, email, password, isActive });

      let message = "Create is successfully";
      resData(res, 201, message);
    } catch (error) {
      console.error("Error creating user:", error);
      resErrors(res, 500, error.message || "Internal Server Error");
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    console.log(`email`, email);

    const check = await User.findOne({ where: { email } });
    console.log(`checka`, check);

    if (!check.email) {
      return resErrors(res, 400, "Sai tài khoản hoặc mật khẩu!");
    } else {
      if (bcrypt.compareSync(password, check.password)) {
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
        res.status(200).json({ accessToken, refreshToken, role: check.role });
      } else {
        res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
      }
    }
  }

  static async show(req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không có AccessToken" });
    }
    try {
      const user = jwt.verify(token, "TuanDevAccessToken");
      const id = user.id;

      const userInfo = await User.findOne({ where: { id } });

      if (!userInfo) {
        return res.status(404).json({ message: "Người dùng không tồn tại!" });
      }
      res.status(200).json({
        username: userInfo.username, 
        role: userInfo.role,
        id: id,
      });
    } catch (error) {
      console.error("Lỗi khi xác thực token:", error.message); 
      return res.status(403).json({ message: "AccessToken không hợp lệ" });
    }
  }

  static async refreshToken(req, res) {
    const { refreshToken } = req.body;
    console.log('refreshToken', refreshToken);
    
    
  try {
    const decoded = jwt.verify(refreshToken, 'TuanDevRefreshToken');
    const id = decoded.id;
    console.log('id',id);
    const user =  await User.findOne({where: {id}});
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    const accessToken = jwt.sign(
      {
        id: user.dataValues.id,
        role: user.role,
      },
      "TuanDevAccessToken",
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken, refreshToken, role: user.role });
  } catch (err) {
    console.log('user lỗi')
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
  }

  static async index(req, res) {
    try {
      let users = await User.findAll();
      let message = "Get data successfully";
      resData(res, 200, message, users);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}
module.exports = ApiUserController;
