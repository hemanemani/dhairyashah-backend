import express, { Request, Response } from "express";

const app = express();
app.get("/admin",(req:Request,res:Response)=>{
  res.send('hello this is admin page')
})

