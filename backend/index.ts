import express from 'express'
import { Request, Response } from 'express'
import db from './db/connect'

const app = express()

// Serve the static files from the React app
app.use(express.static('../build'))

app.get('/past_games', (req: Request, res: Response) => {
  const returnArray: string[] = []
  db.any('select id from cyphers').then((ids: Array<{ id: string }>) => {
    ids.map((set: { id: string }) => {
      returnArray.push(set.id.toString())
    })
  })
  res.json({ arr: returnArray })
})

const port = process.env.PORT || 5000
app.listen(port)
