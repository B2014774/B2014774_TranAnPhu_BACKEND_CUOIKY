const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
    try {
        await MongoDB.connect (config.db.uri);
        console.log("Kết nối thành công cơ sở dữ liệu!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên port: ${PORT}`);
        })
    } catch (err) {
        console.log("Không thể kết nối Cơ sở dữ liệu!", err);
        process.exit();
    }
}

startServer();