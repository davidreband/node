import express from 'express'
import bodyParser from 'body-parser'
import { createReadStream, writeFileSync } from 'fs'
import mongoose from 'mongoose'
import crypto from "crypto"
import http from "http"
import appSrc from "./app.js"
//import dot  from 'dotenv'
import CORS from "./CORS.js"
import UserModel from "./models/User.js"
import UserController from "./routes/UserController.js"


//dot.config({ path: "./.env" })
//const { URL } = process.env

//const URL = "mongodb+srv://davidreband:umGN4stz3622@cluster0.gviiz.mongodb.net/mongodemo?retryWrites=true&w=majority"

const User = UserModel(mongoose);
const app = appSrc(express, bodyParser, createReadStream, crypto, http, mongoose, User, UserController, CORS, writeFileSync)

try {
  /*
 await mongoose.connect(URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 });
*/
 app.listen(process.env.PORT ?? 4321);

} catch (e) {
  console.log(e.codeName);
}

