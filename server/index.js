const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
var multer = require('multer');
var cors = require('cors')
const flash = require('connect-flash');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));


app.use(flash());
app.use(express.json());




app.set('trust proxy', 1) // trust first proxy


const adminRoutes = require("./routes/admin/indexRoute")
const apiHome = require('./routes/api/apiHome')
const loginRoute = require("./routes/loginRoute")
// const db = require('./models/index'); // Nhập đối tượng db



var bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Thêm { extended: true }

app.use(
  "/bootstrap/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/bootstrap/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/admin", adminRoutes)
app.use("/", loginRoute)
app.use("/v1/api", apiHome)

app.listen(4000, () => {
  console.log("Server Started on http://localhost:4000");
});