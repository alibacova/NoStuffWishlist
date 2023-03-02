const express = require ('express');
const router = express.Router();
const controllers = require('../controllers/wishes.js');

router.get('/', controllers.getWishList);
router.get('/:wid', controllers.getWish);
router.post('/', controllers.addWish);
router.put('/:wid', controllers.updateWish);
router.delete('/:wid', controllers.deleteWish);

module.exports = router;