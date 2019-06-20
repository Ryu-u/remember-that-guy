exports.up = pgm => {
  pgm.createTable('rivals', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    description: { type: 'text', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('rivals', 'name')
}

exports.down = pgm => {
  pgm.dropTable('rivals')
}
