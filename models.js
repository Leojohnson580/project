// // models/User.js

// const { DataTypes } = require('sequelize');
// const sequelize = require('../database/connection');

// const User = sequelize.define('User', {
//   fname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   lname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   phone_number: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email_id: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   date_of_birth: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   pincode: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   gender: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   marital_status: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   area_of_interest: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = User;
