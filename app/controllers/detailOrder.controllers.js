const ApiError = require("../api-error");
const DetailOrderService = require("../services/detailOrder.service");
// const ProductService = require("../services/product.service");
// Tìm product để lấy giá của product
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {

    try {
        const detailOrderService = new DetailOrderService(MongoDB.client);
        const document = await detailOrderService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new ApiError(500, "Lỗi xảy ra khi create chi tiết order")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const detailOrderService = new DetailOrderService(MongoDB.client);
            documents = await detailOrderService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error orcured while retriveing the orders")
        );
    }

    return res.send(documents);
}