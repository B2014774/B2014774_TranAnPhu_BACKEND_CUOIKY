const { ObjectId } = require("mongodb");

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
    }

    extractOrderData(payload) {
        const order = {
            SoDonDH: payload.SoDonDH,
            MSKH: payload.MSKH,
            MSNV: payload.MSNV,
            NgayDH: payload.NgayDH,
            NgayGH: payload.NgayGH,
            TrangThaiDH: payload.TrangThaiDH,
        };

        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }

    async create(payload) {
        let zeroDate = new Date(null);
        const order = this.extractOrderData(payload);
        const result = await this.Order.findOneAndUpdate(
            order,
            { $set: { NgayGH: zeroDate, TrangThaiDH: false } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Staff.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async commit(id) {
        let now = new Date();
        await this.Order.updateOne({_id: new ObjectId(id)},{$set: {NgayGH: now, TrangThaiDH: true}})
            // _id: ObjectId("655b242fbfaf8cf6349d8839"), 
            // {$set: { NgayGH: now, TrangThaiDH: true }});
    }
}

module.exports = OrderService;