const express = require("express");
const { CreatNewBook,
    getAllBooks } = require("../controllers/book");

const bookRouter = express.Router();


bookRouter.post("/createbook", CreatNewBook);


module.exports = userRouter;
