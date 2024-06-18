'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Users', [
      {
        email: 'umaraazzam10@gmail.com',
        password: await bcrypt.hash('umar1', 10),
        role: 'mahasiswa',
        nama: 'Umar Abdullah Azzam',
        nim_nip: '2211521019',
        alamat: 'Tangerang',
        noHp: '089601005498',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'miftah.mip19@gmail.com',
        password: await bcrypt.hash('miftah3', 10),
        role: 'mahasiswa',
        nama: 'Miftahul Janah',
        nim_nip: '2211522024',
        alamat: 'Padang Pariaman',
        noHp: '082181882167',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'dosen1@gmail.com',
        password: await bcrypt.hash('dosen01', 10),
        role: 'dosen',
        nama: 'dosen1',
        nim_nip: '987654321',
        alamat: 'Lubuk Basung',
        noHp: '083157689023',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
