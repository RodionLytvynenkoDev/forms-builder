const express = require("express");
const router = express.Router();
const userService = require("./user.service");

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.get("/", getAll);

module.exports = router;

function signIn(req, res, next) {
    userService
        .signIn(req.body)
        .then((user) => res.json(user))
        .catch(next);
}

function signUp(req, res, next) {
    userService
        .signUp(req.body)
        .then((user) => res.json(user))
        .catch(next);
}

function getAll(req, res, next) {
    userService
        .getAll()
        .then((users) => res.json(users))
        .catch(next);
}
