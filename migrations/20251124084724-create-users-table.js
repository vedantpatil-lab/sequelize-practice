'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
          id: {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
          },
          username : {
            type : Sequelize.STRING(50),
            allowNull : false,
            unique : true
          },
          email : {
            type : Sequelize.STRING(100),
            allowNull : false,
            unique : true,
            validate :{
              isEmail : true
            }
          },
          password : {
            type : Sequelize.STRING(200),
            allowNull : false
          }
        });
        await queryInterface.addIndex('Users', ['email']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
