'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagemSchema extends Schema {
  up () {
    this.create('imagems', (table) => {
      table.increments()
      table
        .integer('property_id')
        .unsigned()
        .references('id')
        .inTable('properties')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('imagems')
  }
}

module.exports = ImagemSchema
