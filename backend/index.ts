import express from 'express'
import { Request, Response, RequestHandler, NextFunction } from 'express'
import * as bodyParser from 'body-parser'
import apiV1Router from './api/v1/index'
import auth from './auth/auth'
import session from 'cookie-session'

const app = express()

const cookieConfig = {
  secret: 'rememberthatguy',
  cookie: { secure: false },
  expires: new Date(Date.now() + 60 * 60 * 1000)
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  cookieConfig.cookie.secure = true
}

app.use(session(cookieConfig))
app.use(express.static('../build'))
app.use(bodyParser.json())

app.use('/auth', auth)
app.use('/api/v1', apiV1Router)

app.listen(5000)
