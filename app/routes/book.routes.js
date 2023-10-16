const express = require("express");
const books = require ("../controllers/book.controllers");

const router = express.Router();

router.route("/")
    .get(books.findAll)
    .post(books.create)
    .delete(books.deleteAll);

router.route("/available")
    .get(books.findAllAvailable);

router.route("/:id")
    .get(books.findOne)
    .put(books.update)
    .delete(books.delete);

module.exports = router;