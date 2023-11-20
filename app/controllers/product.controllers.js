const ApiError = require("../api-error");
const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    // if(!req.body?.name) {
    //     return next (new ApiError(400, "Name cannot be empty"));
    // }

    // try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    // } catch (err){
    //     return next (
    //         new ApiError(500, "Lỗi xảy ra khi create product")
    //     );
    // }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const productService = new ProductService(MongoDB.client);
        const {TenHH} = req.query;
        // console.log(TenHH);
        if (TenHH) {
            documents = await productService.findByName(TenHH);
        } else {
            documents = await productService.find({});
        }
    } catch (error) {
        return next (
            new ApiError(500, "An error orcured while retriveing the products")
        );
    }

    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
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

// exports.update = async (req, res, next) => {
//     if(Object.keys(req.body).length === 0) {
//         return next(new ApiError(400, "Nhập liệu không thể rỗng"));
//     }

//     try {
//         const productService = new ProductService(MongoDB.client);
//         const document = await productService.update(req.params.id, req.body);
        
//         if(!document) {
//             return next(new ApiError(404, "Không tìm thấy sách"));
//         }
//         return res.send({message: "Cập nhật thông tin thành công"});
//     } catch (err) {
//         return next(new ApiError(
//             500,
//             `Lỗi không cập nhật được sách có id=${req.params.id}`
//         ));
//     }
// };

// exports.delete = async (req, res, next) => {
//     try {
//         const productService = new ProductService(MongoDB.client);
//         const document = productService.delete(req.params.id);
//         if (!document) {
//             return next (new ApiError(404, "Không timg thấy sách"));
//         }

//         return res.send({message: "Xóa thành công"});
//     } catch (err) {
//         return next(
//             new ApiError (
//                 500,
//                 `Lỗi không thể xóa sách có id=${req.params.id}`
//             )
//         )
//     }
// };

// exports.deleteAll = async (req, res, next) => {
//     try{
//         const productService = new ProductService(MongoDB.client);
//         const deletedCount = await productService.deleteAll();
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

// exports.findAllAvailable = async (req, res, next) => {
//     try{   
//         const productService = new ProductService(MongoDB.client);
//         const documents = await productService.findAvailable(); 
//         return res.send(documents);
//     } catch (err) {
//         return next(new ApiError(
//             500,
//             `Lỗi xảy ra khi tìm sách có thể mượn`
//         ));
//     }
// };