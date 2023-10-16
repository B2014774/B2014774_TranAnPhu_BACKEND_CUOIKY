exports.create = (req, res) => {
    res.send({ message: "Create Handler"});
}

exports.findAll = (req, res) => {
    res.send({ message: "findAll Handler"});
}

exports.findOne = (req, res) => {
    res.send({ message: "findOne Handler"});
}

exports.update = (req, res) => {
    res.send({ message: "update Handler"});
}

exports.delete = (req, res) => {
    res.send({ message: "delete Handler"});
}