const ApiError = require("../api-error");
const OrderService = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {

    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new ApiError(500, "Lỗi xảy ra khi create order")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const orderService = new OrderService(MongoDB.client);
            documents = await orderService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error orcured while retriveing the orders")
        );
    }

    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy tài khoản"));
        }
        return res.send(document);
    } catch (err) {
        return next(
            new ApiError(
                500,
                `Lỗi không tìm thấy tài khoản có id=${req.params.id}`
            )
        );
    }
};

exports.commitOrder = async (req, res, next) => {
    // try {
        const orderService = new OrderService(MongoDB.client);
        await orderService.commit(req.params.id);
        
    // } catch (err) {
    //     return next(
    //         new ApiError(
    //             500,
    //             `Lỗi không tìm thấy tài khoản có id=${req.params.id}`
    //         )
    //     );
    // }
};