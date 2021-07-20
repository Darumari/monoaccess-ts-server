import { Request, Response } from 'express';
import BaseController from './_base.controller';
import NotFoundError from '../errors/not-found.error';

class UsersController extends BaseController {
  // Get user info by id
  public getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.db.users.findFirst({
      where: { id: parseInt(id), status_id: 1, deleted: false }
    });
    if (!user || user.deleted) {
      throw new NotFoundError();
    }
    res.status(200).send(user);
  };

  // Create user
  public create = async (req: Request, res: Response) => {
    const token: string = 'TOKEN';
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      token,
      status_id: 1,
      last_name: req.body.last_name || undefined,
      maternal_name: req.body.maternal_name || undefined,
      phone: req.body.phone || undefined
    };
    const user = await this.db.users.create({
      data
    });
    res.status(201).send(user);
  };

  // Edit user
  public edit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = {
      name: req.body.name || undefined,
      last_name: req.body.last_name || undefined,
      maternal_name: req.body.maternal_name || undefined,
      phone: req.body.phone || undefined
    };

    // Find user by id
    const userFound = await this.db.users.findUnique({
      where: { id: parseInt(id) }
    });

    // If user not exist or user is inactive, throw NotFoundError
    if (!userFound || userFound.deleted || userFound.status_id === 2) {
      throw new NotFoundError();
    }

    // Update user
    const user = await this.db.users.update({
      where: { id: parseInt(id) },
      data
    });
    res.status(200).send(user);
  };

  // Logic delete user
  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    // Find user by id
    const userFound = await this.db.users.findUnique({
      where: { id: parseInt(id) }
    });

    // If user not exist or user is inactive, throw NotFoundError
    if (!userFound || userFound.deleted || userFound.status_id === 2) {
      throw new NotFoundError();
    }

    // Delete user
    const user = await this.db.users.update({
      where: { id: parseInt(id) },
      data: { status_id: 2 }
    });
    res.status(200).send(user);
  };
}

export default UsersController;
