const express = require("express");
const cors = require("cors");
const app = express();
//session
const session = require('express-session');


const productsRouter = require("./app/routes/product.routes");
const contactsRouter = require("./app/routes/contact.routes");
const staffsRouter = require("./app/routes/staff.routes");
const ordersRouter = require("./app/routes/order.routes");
const detailOrderRouter = require("./app/routes/detailOrder.routes");

const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());
//use session
app.use(session({
    secret:'this_is_my_secret',
    cookie:{
        sameSite: 'strict',
    }
}))

//test Server
app.get("/", (req, res) => {
    res.json({ message: "Welcome to QuanLyBanHang!"});
});

//Truyền Route
app.use("/api/products", productsRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/staffs", staffsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/detailOrders", detailOrderRouter);

//Lỗi 404 không tìm thấy route 
app.use((req, res, next)=>{
    return next(new ApiError(404, "Không tìm thấy trang"));
})

//Lỗi hệ thống
app.use((err, req, res, next)=>{
    return res.status(err.statusCode || 500).json({
        message: err.message || "Lỗi hệ thống",
    });
});

module.exports = app;