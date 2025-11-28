'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id from "Users" LIMIT 3',
      {
        type : Sequelize.QueryTypes.SELECT
      }
    )

    await queryInterface.bulkInsert('Posts', [
      {
        title : "Getting Started with Node.js",
        content : "Node.js is a powerful JavaScript runtime...",
        userId : users[0].id,
        published : true
      },
      {
        title : "Building REST APIs",
        content : "REST APIs are essential for modern apps...",
        userId : users[1].id,
        published : true
      },
      {
        title : "Understanding Async/Await",
        content : "Async/await makes asynchronous code easier...",
        userId : users[0].id,
        published : false
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
