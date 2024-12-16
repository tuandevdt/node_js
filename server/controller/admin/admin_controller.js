const { Op, where } = require('sequelize');
const User = require("../../models/user");
const Product = require("../../models/Product");
const Order = require("../../models/Orders");
const Category = require("../../models/category");
class AdminController {
    static async index(req, res) {
        const users = await User.findAll();
        const products = await Product.findAll();
        const orders = await Order.findAll();
        const categories = await Category.findAll();        

        const orderCounts = {
            'Chờ xác nhận': 0,
            'Đã xác nhận': 0,
            'Đang vận chuyển': 0,
            'Đã giao': 0,
            'Đã hủy đơn': 0,
        };
        
        // Count orders by status
        orders.forEach(order => {
            const status = order.dataValues.status;
            if (orderCounts.hasOwnProperty(status)) { //check status có giống với phần từ trong orderCounts không
                orderCounts[status]++;
            }
        });
        
        // Prepare data for the chart
        const chartData = [
            orderCounts['Chờ xác nhận'],
            orderCounts['Đã xác nhận'],
            orderCounts['Đang vận chuyển'],
            orderCounts['Đã giao'],
            orderCounts['Đã hủy đơn']
        ];
        
        //PRODUCTS
        // Tính toán giá sản phẩm
        const priceStats = {
            maxMenWatch: 0,
            minMenWatch: Infinity,
            totalMenWatch: 0,
            countMenWatch: 0,
            maxWomenWatch: 0,
            minWomenWatch: Infinity,
            totalWomenWatch: 0,
            countWomenWatch: 0,
            maxKidWatch: 0,
            minKidWatch: Infinity,
            totalKidWatch: 0,
            countKidWatch: 0,
        };

        products.forEach(product => {
            const { categoryid, price } = product.dataValues; // Giả sử có thuộc tính categoryid và price
            const numericPrice = parseFloat(price); // Chuyển đổi giá từ chuỗi sang số
            
            if (categoryid === 1) { // Đồng hồ nam
                priceStats.maxMenWatch = Math.max(priceStats.maxMenWatch, numericPrice);
                priceStats.minMenWatch = Math.min(priceStats.minMenWatch, numericPrice);
                priceStats.totalMenWatch += numericPrice;
                priceStats.countMenWatch++;
            } else if (categoryid === 2) { // Đồng hồ nữ
                priceStats.maxWomenWatch = Math.max(priceStats.maxWomenWatch, numericPrice);
                priceStats.minWomenWatch = Math.min(priceStats.minWomenWatch, numericPrice);
                priceStats.totalWomenWatch += numericPrice;
                priceStats.countWomenWatch++;
            } else if (categoryid === 3) { // Đồng hồ trẻ em
                priceStats.maxKidWatch = Math.max(priceStats.maxKidWatch, numericPrice);
                priceStats.minKidWatch = Math.min(priceStats.minKidWatch, numericPrice);
                priceStats.totalKidWatch += numericPrice;
                priceStats.countKidWatch++;
            }
        });

        // Tính giá trung bình
        const averageMenWatch = priceStats.countMenWatch > 0 ? (priceStats.totalMenWatch / priceStats.countMenWatch) : 0;
        const averageWomenWatch = priceStats.countWomenWatch > 0 ? (priceStats.totalWomenWatch / priceStats.countWomenWatch) : 0;
        const averageKidWatch = priceStats.countKidWatch > 0 ? (priceStats.totalKidWatch / priceStats.countKidWatch) : 0;
        const productData = [
            priceStats.maxMenWatch,
            priceStats.minMenWatch,
            averageMenWatch,
            priceStats.maxWomenWatch,
            priceStats.minWomenWatch,
            averageWomenWatch,
            priceStats.maxKidWatch,
            priceStats.minKidWatch,
            averageKidWatch
        ];
        res.render("admin/pages/index", { users, products, orders, categories, chartData, productData  });
    }
    static checkToken(req, res) {
        res.render("admin/pages/check");
    }  
}

module.exports = AdminController;