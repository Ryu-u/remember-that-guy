exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    summoner_name: { type: 'varchar(128)', notNull: true, unique: true },
    password: { type: 'varchar(60)', notNull: true },
    riot_encrypted_account_id: { type: 'varchar(56)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('users')
}
