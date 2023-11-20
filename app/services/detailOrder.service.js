const { ObjectId } = require("mongodb");

class DetailOrderService {
    constructor(client) {
        this.DetailOrder = client.db().collection("detailOrder");
    }

    extractDetailOrderData(payload){
        const detailOrder = {
            SoDonDH: payload.SoDonDH,
            MSHH: payload.MSHH,
            SoLuong: payload.SoLuong,
            GiaDatHang: payload.GiaDatHang,
            GiamGia: payload.GiamGia,
        };

        Object.keys(detailOrder).forEach(
            (key) => detailOrder[key] === undefined && delete detailOrder[key]
        );
        return detailOrder;
    }

    async create(payload) {
        let r = (Math.random() + 1).toString(36).substring(2);

        const detailOrder = this.extractDetailOrderData(payload);
        const result = await this.DetailOrder.findOneAndUpdate(
            detailOrder,
            { $set: {SoDonDH: r, GiamGia: 0}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }

    async find(filter){
        const cursor = await this.DetailOrder.find(filter);
        return await cursor.toArray();
    }
}

module.exports = DetailOrderService;