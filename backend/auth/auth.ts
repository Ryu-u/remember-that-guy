import express from 'express'
import { Request, Response } from 'express'
import db from '../db/connect'
import passport from 'passport'
import JwtStrategy from 'passport-jwt'
import axios from 'axios'
import bcrypt from 'bcrypt'
import { PartOfSummonerDto } from '../../src/types/types'
import jwt from 'jsonwebtoken'
import * as bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())
// TODO: process.envにいれるのがいいかも
const secretKey = 'secret'
const issuer = app.get('env') === 'development' ? 'http://localhost:5000' : '本番ドメイン'
const audience = app.get('env') === 'development' ? 'http://localhost:3000' : '本番ドメイン'

const jwtOptions = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
  issuer,
  audience
}

const generateToken = (userId: number) => {
  const token = jwt.sign({}, secretKey, {
    expiresIn: '30 days',
    audience,
    issuer,
    subject: userId.toString()
  })

  return token
}

passport.use(
  new JwtStrategy.Strategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await db.oneOrNone('select * from users where id = $1', jwtPayload.sub)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(error, false)
    }
  })
)

const signUp = async (req: Request, res: Response) => {
  try {
    const user = await db.oneOrNone('select * from users where summoner_name = $1', [req.body.summoner_name])
    if (!user) {
      const userData = await axios.get<PartOfSummonerDto>(
        `https://jp1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.summoner_name}` +
          `/?api_key=${process.env.API_KEY}`
      )

      const salt = bcrypt.genSaltSync(10)
      const encryptedPassword = bcrypt.hashSync(req.body.password, salt)

      let createdUserId
      await db
        .one('insert into users(summoner_name, password, riot_encrypted_account_id) values($1, $2, $3) returning id', [
          req.body.summoner_name,
          encryptedPassword,
          userData.data.accountId
        ])
        .then(data => {
          createdUserId = data.id
        })
      return res.status(201).json({ token: generateToken(createdUserId) })
    } else {
      return res.status(409).send('Conflict')
    }
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
}

const signIn = async (req: Request, res: Response) => {
  try {
    let userInfo: { id: number; password: string } | null
    await db
      .oneOrNone('select id, password from users where summoner_name = $1', [req.body.summoner_name])
      .then(data => {
        userInfo = data
      })
    if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
      return res.status(200).json({ token: generateToken(userInfo.id) })
    } else {
      return res.status(404).send('Not Found')
    }
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
}
const router = express.Router()

router.route('/sign_up').post(signUp)
router.route('/sign_in').post(signIn)
export default router
