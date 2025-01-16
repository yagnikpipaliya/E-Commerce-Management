const { Router } = require("express");
const { createUser, getAllUser, getUser, deleteUser } = require("../controller/user.controller");
const router = Router();

router.get("/", getAllUser);
router.get("/:id", getUser);
router.post("/", createUser);
router.delete("/", deleteUser);

module.exports = router;
