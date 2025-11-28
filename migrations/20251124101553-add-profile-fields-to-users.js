'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction)=>{
      await queryInterface.addColumn('Users', 'bio', {
        type: Sequelize.TEXT,
        allowNull : true
      }, {transaction});

      await queryInterface.addColumn('Users', 'avatarUrl', {
        type : Sequelize.STRING(255),
        allowNull : true
      }, {transaction});

      await queryInterface.addColumn('Users', 'dateOfBirth', {
        type : Sequelize.DATE,
        allowNull : true
      }, {transaction})
    })
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(async (transaction)=>{
        await queryInterface.removeColumn('Users', 'bio', {transaction})
        await queryInterface.removeColumn('Users', 'avatarUrl', {transaction})
        await queryInterface.removeColumn('Users', 'dateOfBirth', {transaction})
      })
  }
};
