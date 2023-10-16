const express = require("express");
const contacts = require ("../controllers/contact.controllers");

const router = express.Router();

router.route("/")
    .get(contacts.findAll)
    .post(contacts.create)
    .delete(contacts.delete)

router.route("/profile/:id")
    .get(contacts.findOne);

module.exports = router;