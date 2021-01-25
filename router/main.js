const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const homeController = require('../controllers/HomeController')

// Route Home
router.get('/', homeController.index)


// Route User Group
router.route('/users')
    .get(userController.index)
    .post(userController.store)
router.get('/users/create', userController.create)
router.get('/users/:id/edit', userController.edit)
router.post('/users/update/:id', userController.update)
router.get('/users/destroy/:id', userController.destroy)

module.exports = router