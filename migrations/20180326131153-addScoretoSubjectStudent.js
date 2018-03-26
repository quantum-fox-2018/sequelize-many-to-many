'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('StudentSubjects','score',Sequelize.INTEGER)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropColumn('StudentSubjects','score',Sequelize.INTEGER)
  }
};
