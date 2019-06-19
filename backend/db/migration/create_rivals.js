exports.up = pgm => {
  pgm.createTable('rivals', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    description: { type: 'text', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('rivals', 'name')
}
