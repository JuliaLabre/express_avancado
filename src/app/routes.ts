import express from 'express';
import { UserController } from './controllers/userController';

export const router = express.Router();

const userController = new UserController();

router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.post('/', userController.createUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

