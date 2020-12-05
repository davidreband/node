import express from 'express'
import bodyParser from 'body-parser'
import { createReadStream } from 'fs'
import crypto from "crypto";
import http from "http";
import expressApp from "./app.js";

const app = expressApp(
  express ,
  bodyParser,
  createReadStream,
  crypto,
  http
);

try {
  app.listen(process.env.PORT ?? 4321);
} catch (e) {
  console.log(e);
}




/*

const app = express()

app
  .get("/", (req, res) =>  res
    .status(200)
      .set({"Content-Type": "application/json; charset=utf-8"})
      .end('{ "Привет": "мир!" }')
      //.json({ Привет: "мир!" })
  )
  .all('*', (req, res) =>  res

  )
  //.use((req, res) =>  res)
  .listen(4321);
*/

/*


import { Server } from 'http'

const s = Server((req,res) => {
    //debugger
    res.end('OK44\n')
})
s.listen(process.env.PORT ?? 4321)
*/

//ver 1
//fs.readFile('package.js', (e,v) => console.log(e || String(v)));


// ver 2
/*
const s = Server()
s.addListener('request', (req,res) => {
    res.end('OK44\n')
})
s.listen(4321)
*/