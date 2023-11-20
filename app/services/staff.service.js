const { ObjectId } = require("mongodb");

class StaffService {
    constructor(client) {
        this.Staff = client.db().collection("staff");
    }

    extractStaffData(payload){
        const staff = {
            HoTenNV: payload.HoTenNV,
            Password: payload.Password,
            ChucVu: payload.ChucVu,
            DiaChi: payload.DiaChi,
            SoDienThoai: payload.SoDienThoai,
        };

        Object.keys(staff).forEach(
            (key) => staff[key] === undefined && delete staff[key]
        );
        return staff;
    }

    async create(payload) {
        let random = (Math.random() + 1).toString(36).substring(2);

        const staff = this.extractStaffData(payload);
        const result = await this.Staff.findOneAndUpdate(
            staff,
            { $set: {MSNV: random}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }

    async find(filter){
        const cursor = await this.Staff.find(filter);
        return await cursor.toArray();
    }

    async findByName(username){
        return await this.find({
            username: {$regex: new RegExp(username), $options: "i"},
        });
    }

    async findById(id){
        return await this.Staff.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByMS(MS){
        return await this.Staff.findOne({
            MSNV: {$regex: new RegExp(MS), $options: "i"},
        });
    }
}

module.exports = StaffService;