const express = require("express");
const router = express.Router();

const { authMiddle, isDeleted } = require("../middleware/auth.middleware");
const resouceCtrl = require("../controllers/resource.controller");

router.get("/all", authMiddle, isDeleted, resouceCtrl.getAllResource);

router.post("/post", authMiddle, isDeleted, resouceCtrl.postResource);

router.delete("/:id", authMiddle, isDeleted, resouceCtrl.deleteResourceById);

module.exports = router;
