import express from 'express'
import { Request, Response } from 'express'
import * as pgPromise from 'pg-promise'

const app = express()

// Serve the static files from the React app
app.use(express.static('../build'))

app.get('/hello', (req: Request, res: Response) => {
  const list = { message: 'bubibubi' }
  res.json(list)
})

const port = process.env.PORT || 5000
app.listen(port)

// DB
const conditions = {
  host: process.env.DB_HOST as string,
  port: (process.env.DB_PORT as unknown) as number,
  database: process.env.DB_NAME as string,
  user: process.env.DB_USER as string,
  password: ''
}

const pgp = pgPromise()
const db = pgp(conditions)
