import express from 'express'
import pastGamesRouter from './past-games'
import rivalsRouter from './rivals'

const router = express.Router()

router.use('/past_games', pastGamesRouter)
router.use('/rivals', rivalsRouter)

export default router
