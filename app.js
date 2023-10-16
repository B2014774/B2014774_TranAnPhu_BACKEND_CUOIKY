const express = require("express");
const cors = require("cors");

const app = express();
const booksRouter = require("./app/routes/book.routes");
const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Library Manegement!"});
});

app.use("/api/books", booksRouter);

//Lỗi 404
app.use((req, res, next)=>{
    return next(new ApiError(404, "Không tìm thấy trang"));
})

app.use((err, req, res, next)=>{
    return res.status(err.statusCode || 500).json({
        message: err.message || "Lỗi hệ thống",
    });
});

module.exports = app;