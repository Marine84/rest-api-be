import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import mongoose from 'mongoose';
import Model from '../models/model';
// @ts-ignore
import { User } from '../../backend/interface/user';


// getting all users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
  let posts: [User] = result.data
  return res.status(200).json({
    message: posts
  })
}

// getting a single user
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  let id: string = req.params.id
  let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  let post: User = result.data
  return res.status(200).json({
    message: post
  })
}

// updating a user info
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req.params
  let id: string = req.params.id
  // get the data from req.body
  let title: string = req.body.title ?? null
  let body: string = req.body.body ?? null
  // update the post
  let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    ...(title && { title }),
    ...(body && { body })
  })
  // return response
  return res.status(200).json({
    message: response.data
  })
}

// deleting a user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from req.params
  let id: string = req.params.id
  // delete the post
  let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
  // return response
  return res.status(200).json({
    message: 'post deleted successfully'
  })
}

// adding a new user
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  await mongoose.connect('mongodb://accountUser:test@localhost:27017/test-user?authSource=admin');
  let database = mongoose.connection;

  console.log(database.name)
  database.on('error', (error: any) => {
    console.log(error)
  })

  database.once('connected', () => {
    console.log('Database Connected')
  })

  const data = new Model({
    username: req.body.username,
    password: req.body.password
  })

  try {
    const dataSchema = await data.save()
    await res.status(200).json(dataSchema)
  } catch (error) {
    await res.status(400).send({ message: `Request body is not correct` });
  }
}

export default { getUsers, getUser, updateUser, deleteUser, addUser }