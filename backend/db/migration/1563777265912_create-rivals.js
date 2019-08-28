exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('rivals', {
    id: 'id',
    name: { type: 'varchar(128)', notNull: true },
    description: { type: 'text', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
      onDelete: 'cascade'
    }
  })
  pgm.createIndex('rivals', 'name')
}

exports.down = pgm => {
  pgm.dropTable('rivals')
}
