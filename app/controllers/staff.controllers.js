const ApiError = require("../api-error");
const StaffService = require("../services/staff.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    // if (!req.body?.HoTenKH) {
    //     return next(new ApiError(400, "HoTenKH cannot be empty"));
    // }

    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new ApiError(500, "Lỗi xảy ra khi create staff")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const staffService = new StaffService(MongoDB.client);
        const { HoTenNV } = req.query;
        if (HoTenNV) {
            documents = await staffService.findByName(HoTenNV);
        } else {
            documents = await staffService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error orcured while retriveing the staffs")
        );
    }

    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.findById(req.params.id);
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

// exports.update = async (req, res, next) => {
//     if (Object.keys(req.body).length === 0) {
//         return next(new ApiError(400, "Nhập liệu không thể rỗng"));
//     }

//     try {
//         const staffService = new StaffService(MongoDB.client);
//         const document = await staffService.update(req.params.id, req.body);

//         if (!document) {
//             return next(new ApiError(404, "Không tìm thấy tài khoản"));
//         }
//         return res.send({ message: "Cập nhật thông tin thành công" });
//     } catch (err) {
//         return next(new ApiError(
//             500,
//             `Lỗi không cập nhật được tài khoản có id=${req.params.id}`
//         ));
//     }
// };

// exports.delete = async (req, res, next) => {
//     try {
//         const staffService = new StaffService(MongoDB.client);
//         const document = staffService.delete(req.params.id);
//         if (!document) {
//             return next(new ApiError(404, "Không timg thấy tài khoản"));
//         }

//         return res.send({ message: "Xóa thành công" });
//     } catch (err) {
//         return next(
//             new ApiError(
//                 500,
//                 `Lỗi không thể xóa tài khoản có id=${req.params.id}`
//             )
//         )
//     }
// };

// exports.deleteAll = async (req, res, next) => {
//     try {
//         const staffService = new StaffService(MongoDB.client);
//         const deletedCount = await staffService.deleteAll();
//         return res.send({
//             message: `${deletedCount} sách xóa thành công`,
//         });
//     } catch (err) {
//         return next(new ApiError(
//             500,
//             `Lỗi xảy ra khi xóa`
//         ));
//     }
// };

// exports.findAllAdmin = async (req, res, next) => {
//     try {
//         const staffService = new StaffService(MongoDB.client);
//         const documents = await staffService.findAdmin();
//         return res.send(documents);
//     } catch (err) {
//         return next(new ApiError(
//             500,
//             `Lỗi xảy ra khi tìm sách có thể mượn`
//         ));
//     }
// };

// exports.login = async (req, res, next) => {
//     if (Object.keys(req.body).length === 0) {
//         return next(new ApiError(400, "Nhập liệu không thể rỗng"));
//     }

//     try {
//         const staffService = new StaffService(MongoDB.client);
//         const { HoTenKH, password } = req.body;
        
//         console.log(req.body);

//         const document = await staffService.findUser(HoTenKH, password);
//         console.log(document);
//         if (!document)
//             res.send({
//                 message: 'Không tìm thấy tài khoản',
//             });
//         else {
//             req.session.user = document;
//             req.session.authorized = true;
//             return res.send(document);
//         }

//     } catch (err) {
//         return next(new ApiError(
//             500,
//             `Lỗi xảy ra khi xác minh đăng nhập`
//         ));
//     }
// };