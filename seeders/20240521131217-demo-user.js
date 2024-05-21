module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        NIM :'2211522012',
        Nama: 'Rahman',
        email: 'hattaasrirahman@gmail.com',
        alamat : 'Padang',
        noHP :"0812345678",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};