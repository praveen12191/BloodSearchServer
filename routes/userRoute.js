const router = require('express').Router();

const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login',userController.login);
router.post('/update',userController.update);
router.post('/search',userController.search);

module.exports = router;