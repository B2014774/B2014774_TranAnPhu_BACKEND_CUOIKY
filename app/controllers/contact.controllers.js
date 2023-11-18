const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username cannot be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new ApiError(500, "Lỗi xảy ra khi create contact")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { username } = req.query;
        if (username) {
            documents = await contactService.findByName(username);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error orcured while retriveing the contacts")
        );
    }

    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
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

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Nhập liệu không thể rỗng"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);

        if (!document) {
            return next(new ApiError(404, "Không tìm thấy tài khoản"));
        }
        return res.send({ message: "Cập nhật thông tin thành công" });
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi không cập nhật được tài khoản có id=${req.params.id}`
        ));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không timg thấy tài khoản"));
        }

        return res.send({ message: "Xóa thành công" });
    } catch (err) {
        return next(
            new ApiError(
                500,
                `Lỗi không thể xóa tài khoản có id=${req.params.id}`
            )
        )
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
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

exports.findAllAdmin = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findAdmin();
        return res.send(documents);
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi xảy ra khi tìm sách có thể mượn`
        ));
    }
};

exports.login = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Nhập liệu không thể rỗng"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const { username, password } = req.body;
        
        console.log(req.body);

        const document = await contactService.findUser(username, password);
        console.log(document);
        if (!document)
            res.send({
                message: 'Không tìm thấy tài khoản',
            });
        else {
            req.session.user = document;
            req.session.authorized = true;
            return res.send(document);
        }

    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi xảy ra khi xác minh đăng nhập`
        ));
    }
};