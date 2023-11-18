const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    extractProductData(payload){
        const product = {
            TenHH: payload.TenHH,
            MoTaHH: payload.MoTaHH,
            Gia: payload.Gia,
            SoLuongHang:payload.SoLuongHang,
            GhiChu: payload.GhiChu,
        };

        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }

    async create(payload) {
        const product = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            product,
            { $set: {}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }

    async find(filter){
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        return await this.find({
            name: {$regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id){
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // async update(id, payload){
    //     const filter = {
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     };
    //     const update = this.extractProductData(payload);
    //     const result  = await this.Product.findOneAndUpdate(
    //         filter,
    //         { $set: update},
    //         { returnDocument: "after"}
    //     );
    //     return result;
    // }

    // async delete(id) {
    //     const result = await this.Product.findOneAndDelete({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     });
    //     return result;
    // }

    // async deleteAll(){
    //     const result = await this.Product.deleteMany({});
    //     return result.deletedCount;
    // }

    // async findAvailable(){
    //     return await this.find({ available:true });
    // }
}

module.exports = ProductService;