const express = require('express');
const router = express.Router();
const userController = import('../controller/userController.js');

router.post('/usuarios', userController.createUser);

router.get('/usuarios', userController.getAllUsers);

router.get('/usuarios/:id', userController.getUser);

router.put('/usuarios/:id', userController.updateUser);

router.delete('/usuarios/:id', userController.deleteUser);

module.exports = router;
