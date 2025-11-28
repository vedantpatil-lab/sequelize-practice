'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tags', {
      id :{
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
      },
      name:{
        type : Sequelize.STRING(50),
        allowNull : false,
        unique : true
      }
    });

    // join tables
    await queryInterface.createTable('PostTags', {
      id :{
        type : Sequelize.INTEGER,
        primaryKey : true,
        unique : true
      },
      postId:{
        type : Sequelize.INTEGER,
        allowNull : false,
        references :{
          model : "Posts",
          key : "id"
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
      },
      tagId:{
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "Tags",
          key : "id"
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
      }
    });
    await queryInterface.addIndex('PostTags', ['postId', 'tagId'], {
      unique : true,
      name : 'unique_post_tag'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PostTags')
    await queryInterface.dropTable('Tags')
  }
};
