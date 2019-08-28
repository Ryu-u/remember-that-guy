import pgPromise from 'pg-promise'

const conditions = {
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  port: (process.env.DB_PORT as unknown) as number,
  user: process.env.DB_USER as string,
  password: ''
}

const db = pgPromise()(conditions)

export default db
