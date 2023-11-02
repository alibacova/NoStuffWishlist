const express = require("express");
const requireAuth = require("../middleware/requireAuth.js");
const controllers = require("../controllers/wishes.js");

const router = express.Router();
router.use(requireAuth);

router.get("/", controllers.getWishList);
router.get("/:wid", controllers.getWish);
router.post("/", controllers.addWish);
router.put("/:wid", controllers.updateWish);
router.delete("/:wid", controllers.deleteWish);

module.exports = router;
