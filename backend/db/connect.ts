import * as dotenv from 'dotenv'
import * as pgPromise from 'pg-promise'

const dbConnectConfig = dotenv.config()

const conditions = {
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  port: (process.env.DB_PORT as unknown) as number,

  user: process.env.DB_USER as string,
  password: ''
}

const pgp = pgPromise()
const db = pgp(conditions)

export default db
