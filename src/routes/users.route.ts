import { Router } from 'express';
import middlewares from '../middlewares';
import UsersValidator from '../validators/users.validator';
import UsersController from '../controllers/users.controller';

const controller = new UsersController();
const validator = new UsersValidator();
const router = Router();

// GET - Get user info by id
router.get(
  '/:id',
  validator.validateIdParam,
  middlewares.validateRequest,
  controller.getOne
);

// POST - Create user
router.post(
  '/',
  validator.validateCreateFields,
  middlewares.validateRequest,
  controller.create
);

// PUT - Update user
router.put(
  '/:id',
  validator.validateIdParam,
  validator.validateEditFields,
  middlewares.validateRequest,
  controller.edit
);

// DELETE - Logic delete user
// POST - Create user
router.delete(
  '/:id',
  validator.validateIdParam,
  middlewares.validateRequest,
  controller.delete
);

export default router;
