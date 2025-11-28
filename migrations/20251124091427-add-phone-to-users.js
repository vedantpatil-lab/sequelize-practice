'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'phone', {
      type : Sequelize.INTEGER(20),
      allowNull : true,
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'phone')
  }
};
