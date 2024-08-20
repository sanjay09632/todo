const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',
    authMiddleware.verifyToken,
    authMiddleware.isManagerOrAdmin,
    taskController.createTask
);

router.get('/',
    authMiddleware.verifyToken,
    taskController.getTasks
);

router.put('/:id',
    authMiddleware.verifyToken,
    authMiddleware.isManagerOrAdmin,
    taskController.updateTask
);

router.delete('/:id',
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    taskController.deleteTask
);

module.exports = router;
