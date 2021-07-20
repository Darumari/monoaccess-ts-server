import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request.error';
import { body, param } from 'express-validator';
import BaseValidator from './_base.validator';

class UsersValidator extends BaseValidator {
  public validateCreateFields = [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isString()
      .withMessage('Name must be a string'),
    body('last_name')
      .notEmpty()
      .withMessage('Last name is required')
      .isString()
      .withMessage('Last name must be a string'),
    body('maternal_name')
      .optional({ checkFalsy: true, nullable: true })
      .isString()
      .withMessage('Maternal name must be a string'),
    body('phone')
      .optional({ checkFalsy: true, nullable: true })
      .isString()
      .withMessage('Phone number must be a string'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email must be a string'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isStrongPassword()
      .withMessage(
        'Password must have the following structure: Minimum length of 8 characters, minimum one lowercase letter, one uppercase letter, one number and one symbol'
      )
  ];

  public validateEditFields = [
    body('name')
      .optional({ checkFalsy: true, nullable: true })
      .notEmpty()
      .withMessage('Name is required')
      .isString()
      .withMessage('Name must be a string'),
    body('last_name')
      .optional({ checkFalsy: true, nullable: true })
      .notEmpty()
      .withMessage('Last name is required')
      .isString()
      .withMessage('Last name must be a string'),
    body('maternal_name')
      .optional({ checkFalsy: true, nullable: true })
      .isString()
      .withMessage('Maternal name must be a string'),
    body('phone')
      .optional({ checkFalsy: true, nullable: true })
      .isString()
      .withMessage('Phone number must be a string')
  ];

  public validateIdParam = [
    param('id')
      .notEmpty()
      .withMessage('Id is required')
      .isNumeric()
      .withMessage('Id must be a number')
  ];

  public validateIfUserExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    const user = await this.db.users.findFirst({ where: { email } });
    if (user) {
      throw new BadRequestError(`User with email: ${email} already exist`);
    }
    next();
  };
}

export default UsersValidator;
