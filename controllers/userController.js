const { User } = require("../models");

module.exports = {
  getUser(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new post
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    return User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friend: req.body.friendId } },
      { new: true, runValidators: true }
    ).then((data) => {
      res.json(data);
    });
  },
  removeFriend(req, res) {
    return User.findOneAndDelete(
      { _id: req.params.userId },
      { $pull: { friend: req.params.friendId } },
      { new: true, runValidators: true }
    ).then((data) => {
      res.json(data);
    });
  },
};