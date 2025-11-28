'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
      },
      title:{
        type : Sequelize.STRING(200),
        allowNull : false,
      },
      content :{
        type : Sequelize.TEXT,
        allowNull : false
      },
      userId:{
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'Users',
          key : 'id'
        },
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
      },
      published :{
        type : Sequelize.BOOLEAN,
        defaultValue : false
      }
    });
    await queryInterface.addIndex('Posts', ['userId'])
    await queryInterface.addIndex('Posts', ['published'])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts')
  }
};
