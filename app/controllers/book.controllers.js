const ApiError = require("../api-error");
const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next (new ApiError(400, "Name cannot be empty"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        return res.send(document);
    } catch (err){
        return next (
            new ApiError(500, "Lỗi xảy ra khi create book")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const bookService = new BookService(MongoDB.client);
        const {name} = req.query;
        if (name) {
            documents = await bookService.findByName(name);
        } else {
            documents = await bookService.find({});
        }
    } catch (error) {
        return next (
            new ApiError(500, "An error orcured while retriveing the books")
        );
    }

    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send(document);
    } catch (err) {
        return next (
            new ApiError(
                500,
                `Lỗi không tìm thấy sách có id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Nhập liệu không thể rỗng"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        
        if(!document) {
            return next(new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send({message: "Cập nhật thông tin thành công"});
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi không cập nhật được sách có id=${req.params.id}`
        ));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = bookService.delete(req.params.id);
        if (!document) {
            return next (new ApiError(404, "Không timg thấy sách"));
        }

        return res.send({message: "Xóa thành công"});
    } catch (err) {
        return next(
            new ApiError (
                500,
                `Lỗi không thể xóa sách có id=${req.params.id}`
            )
        )
    }
};

exports.deleteAll = async (req, res, next) => {
    try{
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.deleteAll();
        return res.send({
            message: `${deletedCount} sách xóa thành công`,
        });
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi xảy ra khi xóa`
        ));
    }
};

exports.findAllAvailable = async (req, res, next) => {
    try{   
        const bookService = new BookService(MongoDB.client);
        const documents = await bookService.findAvailable(); 
        return res.send(documents);
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi xảy ra khi tìm sách có thể mượn`
        ));
    }
};