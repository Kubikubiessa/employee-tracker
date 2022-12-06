const mysql =require('mysql2');

const PORT = process.env.PORT || 3001;
 
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );