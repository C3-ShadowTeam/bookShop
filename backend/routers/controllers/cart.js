const cartModel = require("../../db/models/cart");
const userModel = require("../../db/models/user");
const x = 1;
const addToCart = (req, res) => {
  const { bookId } = req.body;
  const userId = req.token.userId;

  const cart = new cartModel({
    userId,
    bookId,
  });

  cart
    .save()
    .then(async (result) => {
      await userModel.findByIdAndUpdate(userId, { $push: { cart: bookId } });
      res.status(201).json({
        success: true,
        message: `Success book Added`,
        book: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: `error! `,
        err: err,
      });
    });
};

const FindByUserId = (req, res) => {
  const userId = req.token.userId;
  cartModel
    .find({ userId })
    .populate("bookId", "image name type author description language price _id")
    .exec()
    .then((result) => {
      if (!result.length) {
        return res.status(409).json({
          success: false,
          message: result,
        });
      }
      res.json({
        succes: true,
        message: result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "server error",
      });
    });
};

const deleteBookById = (req, res) => {
  const id = req.params.id;
  const { bookId } = req.body;
  const userId = req.token.userId;
  cartModel
    .findByIdAndDelete(id)
    .then(async (result) => {
      await userModel
        .findByIdAndUpdate(userId, { $pull: { cart: bookId } })
        .then((result) => {});
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The book => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Success Delete book with id => ${id}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

module.exports = { addToCart, FindByUserId, deleteBookById };
