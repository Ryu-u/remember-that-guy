// const path = require('path')
// const express = require('express')
// import path from 'path'
import express from 'express'
import { Request, Response } from 'express'

const app = express()

// Serve the static files from the React app
app.use(express.static('../build'))

app.get('/hello', (req: Request, res: Response) => {
  const list = { message: 'bubibubi' }
  res.json(list)
})

const port = process.env.PORT || 5000
app.listen(port)
