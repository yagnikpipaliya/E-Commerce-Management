const router = require("express").Router();
const { getAll } = require("../controllers/Items.controller");


router.get("/", getAll);

module.exports = router;