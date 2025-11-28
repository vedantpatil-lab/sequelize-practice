'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        displayname : "Vedant",
        email : "ved123@gmail.com",
        password : "12345678",
        phone : 7507509604
      },
      {
        displayname : "eren",
        email : "eren123@gmail.com",
        password : "12345678",
        phone : 7507509604
      }, 
      {
        displayname : "tanjiro",
        email : "tanjiro123@gmail.com",
        password : "12345678",
        phone : 7507509604
      },
      {
        displayname : "tengen",
        email : "tengen123@gmail.com",
        password : "12345678",
        phone : 7507509604
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users',{
      displayname : ["Vedant", "eren", "tanjiro", "tengen"]
    }, {})
  }
};
