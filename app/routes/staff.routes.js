const express = require("express");
const staffs = require ("../controllers/staff.controllers");

const router = express.Router();

router.route("/")
    .get(staffs.findAll)
    .post(staffs.create)
//     .delete(staffs.deleteAll);

router.route("/MS")
    .get(staffs.findOneByMS);

router.route("/:id")
    .get(staffs.findOne)
//     .put(staffs.update)
//     .delete(staffs.delete);

// router.route("/login")
//     .post(staffs.login);

module.exports = router;