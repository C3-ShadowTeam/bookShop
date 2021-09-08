const express = require("express");
const { CreatNewBook,
    getAllBooks } = require("../controllers/book");

const bookRouter = express.Router();


bookRouter.post("/createbook", CreatNewBook);
bookRouter.get("/", getAllBooks); 

module.exports = userRouter;
