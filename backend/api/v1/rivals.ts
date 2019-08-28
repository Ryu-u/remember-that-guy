import express from 'express'
import { Request, Response } from 'express'
import db from '../../db/connect'

const router = express.Router()

const fetchRivals = async (req: Request, res: Response) => {
  const rivalsResponse = await db.any(
    'select name, description, created_at as "createdAt" from rivals order by created_at desc'
  )
  res.set({ 'Access-Control-Allow-Origin': '*' })
  return res.status(200).json({ rivals: rivalsResponse })
}

const addRivals = async (req: Request, res: Response) => {
  try {
    await db.none('insert into rivals(name, description) values($1, $2)', [req.body.name, req.body.description])
    return res.status(201).send('OK')
  } catch (e) {
    return res.status(403).send('Failure')
  }
}

const updateRivals = async (req: Request, res: Response) => {
  await db.none('update rivals set description = $1 where name = $2', [req.body.description, req.params.rivalName])
  return res.status(201).send('OK')
}

const deleteRivals = async (req: Request, res: Response) => {
  await db.none('delete from rivals where name = $1', [req.params.name])
  return res.status(201).send('OK')
}

router
  .route('/')
  .get(fetchRivals)
  .post(addRivals)

router
  .route('/:rivalName')
  .patch(updateRivals)
  .delete(deleteRivals)

export default router
