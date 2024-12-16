const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Tách token từ header

    if (!token) {
        return res.status(401).json({ message: "Không có AccessToken" });
    }

  if (!token) {
    return res.status(401).json({ message: "Không có AccessToken" });
  }

  try {
    const user = jwt.verify(token, "TuanDevAccessToken");
    if (user.id) {
      req.userId = user.id;
      // Log thông tin người dùng để kiểm tra
      console.log(`Authenticated user:`, user);      
      if (user.role === 'admin') {
        console.log('next');
        
        return res.status(200).json({ user });
      } else {
        return res.status(403).json({ message: "Bạn không có quyền!" });
      }
    }
  } catch (error) {
    return res.status(403).json({ message: "AccessToken hết hạn" });
  }
};

module.exports = authenticateToken;
