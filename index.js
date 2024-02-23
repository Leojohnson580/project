const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('myPage', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define User model
const User = sequelize.define('User', {
  fname: DataTypes.STRING,
  lname: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  email_id: DataTypes.STRING,
  date_of_birth: DataTypes.DATE,
  age: DataTypes.INTEGER,
  pincode: DataTypes.STRING,
  gender: DataTypes.STRING,
  address: DataTypes.STRING,
  password: DataTypes.STRING,
  marital_status: DataTypes.STRING,
  area_of_interest: DataTypes.STRING,
});

// Create Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route to handle POST request to create a new user
// Route to handle POST request to create a new user
app.post('/api/users', async (req, res) => {
  try {
    const {
      fname,
      lname,
      phone_number,
      email_id,
      date_of_birth,
      age,
      pincode,
      gender,
      address,
      password,
      marital_status,
      area_of_interest,
    } = req.body;
    


    let validAreaOfInterest = '';

    if (typeof area_of_interest === 'string') {
      validAreaOfInterest = area_of_interest;
    } else if (Array.isArray(area_of_interest)) {
      validAreaOfInterest = area_of_interest.join(', '); // Convert array to string
    } else {
      throw new Error('Area of interest must be a string or an array');
    }

    // let validAreaOfInterest = '';

    // if (typeof area_of_interest === 'string') {
    //   validAreaOfInterest = area_of_interest;
    // } else if (Array.isArray(area_of_interest)) {
    //   validAreaOfInterest = area_of_interest.join(', '); // Convert array to string
    // } else {
    //   throw new Error('Area of interest must be a string or an array');
    // }
    // let validAreaOfInterest = '';

    // if (typeof area_of_interest === 'string') {
    //   validAreaOfInterest = area_of_interest;
    // } else if (Array.isArray(area_of_interest)) {
    //   validAreaOfInterest = area_of_interest.join(', ');
    // } else {
    //   throw new Error('Area of interest must be a string');
    // }

    // Create user using Sequelize ORM
      // const areaOfInterestString = JSON.stringify(formData.area_of_interest);
    await User.create({
      fname,
      lname,
      phone_number,
      email_id,
      date_of_birth,
      age,
      pincode,
      gender,
      address,
      password,
      marital_status,
      area_of_interest: validAreaOfInterest,
    });

    console.log('User inserted successfully');
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email_id, password } = req.body;
    console.log('Login request received:', { email_id, password });

    // Find user by email in the database
    const user = await User.findOne({ where: { email_id } });
    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if the password matches
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    console.log('User logged in successfully');

    // Set a cookie with user's fname
    const { fname } = user; // Extract fname from user object fetched from the database
    console.log(fname);
    console.log(user);
    res.cookie('fname', fname, { maxAge: 900000, httpOnly: true }); // 15 minutes expiration
    res.status(200).json({ success: true, message: 'User logged in successfully', fname });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});





// Start the server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});











// Backend code (Node.js with Express)
// Add this route to retrieve fname data
// Route to retrieve current user's fname
// Route to retrieve current user's fname
// Route to retrieve current user's fname
// const User = require('./models/User'); // Assuming you have a User model defined

// app.get('/api/user/fname', async (req, res) => {
//   try {
//     // Assuming you have some way to identify the user, such as an ID
//     const userId = req.query.userId; // Extract userId from request query parameters

//     // Fetch user details from the database based on userId
//     const user = await User.findByPk(userId); // Use findByPk to find by primary key

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Return the user's fname
//     res.status(200).json({ success: true, fname: user.fname });
//   } catch (error) {
//     console.error('Error fetching user fname:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });







// // Import necessary modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const cors = require('cors'); 
// const routes = require('./routes/alterTable');
// // Create a connection pool to MySQL database
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'myPage'
// });

// // Create Express app
// const app = express();
// app.use('/', routes);
// app.use(cors());
// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Route to handle POST request to create a new user
// app.post('/api/users', (req, res) => {
//   // Extract user data from request body
//   const { fname, lname, phoneNumber, email_id, date_of_birth, age, pincode, gender, address, password, marital_status, area_of_interest } = req.body;

//   // SQL query to insert user data into the database
//   const sql = `INSERT INTO users (fname, lname, phone_number, email_id, date_of_birth, age, pincode, gender, address, password, marital_status, area_of_interest) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   // Values to be inserted into the database
//   const values = [fname, lname, phoneNumber, email_id, date_of_birth, age, pincode, gender, address, password, marital_status, area_of_interest];

//   // Execute the SQL query
//   pool.query(sql, values, (error, results, fields) => {
//     if (error) {
//       console.error('Error inserting user:', error);
//       return res.status(500).json({ error: error.message }); // Return detailed error message
//     }
//     console.log('User inserted successfully');
//     res.status(201).json({ message: 'User created successfully' });
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5555;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





// // server.js

// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const PORT = 5555;

// app.use(bodyParser.json());
// app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

// // Create a MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'myPage',
// });

// // Connect to MySQL
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     throw err;
//   }
//   console.log('Connected to MySQL');
// });

// // Define a route to handle POST requests
// app.post('/api/users', (req, res) => {
//   const {
//     fname,
//     lname,
//     phoneNumber,
//     email,
//     dob,
//     age,
//     pincode,
//     gender,
//     address,
//     password,
//     marriedStatus,
//     areaOfInterest,
//   } = req.body;

//   // Insert data into the MySQL table
//   const sql = `INSERT INTO users (fname, lname, phoneNumber, email, dob, age, pincode, gender, address, password, marriedStatus, areaOfInterest) 
//                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   connection.query(
//     sql,
//     [
//       fname,
//       lname,
//       phoneNumber,
//       email,
//       dob,
//       age,
//       pincode,
//       gender,
//       address,
//       password,
//       marriedStatus,
//       JSON.stringify(areaOfInterest), // Assuming 'areaOfInterest' is an array
//     ],
//     (error, results) => {
//       if (error) {
//         console.error('Error inserting data:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         console.log('Data inserted successfully');
//         res.status(200).json({ message: 'Data inserted successfully' });
//       }
//     }
//   );
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });








// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./database/connection');
// const User = require('./models/User');
// const debug = require('debug')('app:server');

// const app = express();
// const PORT = process.env.PORT || 5555;

// app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['POST'],
//   allowedHeaders: ['Content-Type'],
// }));

// // Routes
// app.post('/api/users', async (req, res) => {
//   try {
//     const {
//       fname,
//       lname,
//       phone_number,
//       email_id,
//       password,
//       date_of_birth,
//       age,
//       pincode,
//       gender,
//       address,
//       marital_status,
//       area_of_interest,
//     } = req.body;

//     if (!fname || !lname || !phone_number || !email_id || !password || !date_of_birth || !age || !pincode || !gender || !address || !marital_status || !area_of_interest) {
//       throw new Error("Missing required fields in request body");
//     }

//     const sql = "INSERT INTO table_name( id,fname, lname, phone_number, email_id, password, date_of_birth, age, pincode, gender, address, marital_status, area_of_interest) VALUES (?)";
//     const values = [
//       id,
//       fname,
//       lname,
//       phone_number,
//       email_id,
//       password,
//       date_of_birth,
//       age,
//       pincode,
//       gender,
//       address,
//       marital_status,
//       area_of_interest
//     ];

//     // Assuming you want to log the SQL query and values
//     debug('SQL Query:', sql);
//     debug('Values:', values);

//     // Assuming you want to log the result of the query
//     debug.query(sql, [values], (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });
//       return res.status(201).json(result);
//     });
//   } catch (error) {
//     debug('Error creating user:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // Sync database and start server
// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });

  
//   try {
//     const {
//       fname,
//       lname,
//       phone_number,
//       email_id,
//       password,
//       date_of_birth,
//       age,
//       pincode,
//       gender,
//       address,
//       marital_status,
//       area_of_interest,
//     } = req.body;

//     if (!fname || !lname || !phone_number || !email_id || !password || !date_of_birth || !age || !pincode || !gender || !address || !marital_status || !area_of_interest) {
//       throw new Error("Missing required fields in request body");
      
//     }

//     const user = await User.create({
//       fname,
//       lname,
//       phone_number,
//       email_id,
//       password,
//       date_of_birth,
//       age,
//       pincode,
//       gender,
//       address,
//       marital_status,
//       area_of_interest,
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(400).json({ error: error.message });
//   }
// });


// // Sync database and start server
// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });


// const express = require("express");
// const app =express();
// app.use(express.json());


// const PORT=process.env.PORT||5555;
// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`);
// })
// //index.js