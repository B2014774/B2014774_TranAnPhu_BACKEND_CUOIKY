const express = require("express");
const detailOrder = require ("../controllers/detailOrder.controllers");

const router = express.Router();

router.route("/")
    .get(detailOrder.findAll)
    .post(detailOrder.create)

module.exports = router;