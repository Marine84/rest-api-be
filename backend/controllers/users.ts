import * as express from 'express';
import Controller from '../interface/controller.interface';
import { User } from '../interface/user';
import userModel from '../models/model';

import BadRequestException from '../exceptions/BadRequestException';
import NotFoundException from '../exceptions/NotFoundException';

class UsersController implements Controller {
  public path = '/users';
  public router = express.Router();
  private post = userModel;

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.patch(`${this.path}/:id`, this.modifyUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
    this.router.post(this.path, this.createUser);
  }

  private getAllUsers = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const data = await this.post.find();
    await response.status(200).json(data);
  }

  private getUserById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id

    try {
      const data = await this.post.findById(id);
      await response.status(200).json(data);
    } catch (error) {
      next(new NotFoundException(id));
    }
  }

  private modifyUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id
    const data: User = request.body

    try {
      const dataToUpdate = await this.post.findByIdAndUpdate(id, data, { new: true })
      if (dataToUpdate) {
        const dataSchema = await dataToUpdate.updateOne()
        await response.status(200).json(dataSchema)
      } else new Error('There is no data matching your criteria to update')
    } catch (error) {
      next(new BadRequestException());
    }
  }

  private createUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const data: User = request.body
    const dataToSave = new this.post(data)

    try {
      const dataSchema = await dataToSave.save()
      await response.status(200).json(dataSchema)
    } catch (error) {
      next(new BadRequestException());
    }
  }

  private deleteUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id

    try {
      const dataToDelete = await this.post.findByIdAndUpdate(id)
      if (dataToDelete) {
        const dataSchema = await dataToDelete.deleteOne()
        await response.status(200).json(dataSchema)
      } else new Error('There is no data matching your criteria to update')
    } catch (error) {
      next(new BadRequestException());
    }
  }
}

export default UsersController;