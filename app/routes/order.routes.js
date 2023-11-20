const express = require("express");
const orders = require ("../controllers/order.controllers");

const router = express.Router();

router.route("/")
    .get(orders.findAll)
    .post(orders.create)
//     .delete(orders.deleteAll);

router.route("/:id")
    .get(orders.findOne)
    .put(orders.commitOrder)
//     .delete(orders.delete);

// router.route("/login")
//     .post(orders.login);

module.exports = router;