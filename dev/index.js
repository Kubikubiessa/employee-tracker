const mysql = require("mysql2");

const inquirer = require("inquirer");
require("console.table");

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

const initialPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Roll",
          "Add Employee",
          "Update Role",
          "Delete Employee",
          "Exit",
        ],
      },
    ])
    .then(function (data) {
      console.log("Your next action: " + data.userChoice);
      switch (data.userChoice) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Role":
          updateRole();
          break;
        case "Update Employee":
          updateEmployee();
          break;
        case "Delete Employee":
          deleteEmployeeById();
          break;
        default:
          end();
      }
    });
};
initialPrompt();

function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
  initialPrompt();
}
function viewRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
  initialPrompt();
}
function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
  initialPrompt();
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptAdded",
        message: "What is the name of the new department?",
      },
    ])
    .then(function (results) {
      db.query(
        "INSERT INTO departments SET ?",
        { name: results.deptAdded },
        (err, results) => {
          if (err) throw err;
          console.table(results);
        }
      );
      initialPrompt();
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "titleAdded",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "salaryAdded",
        message: "What is the salary of the new role?",
      },
      {
        type: "input",
        name: "depIdAdded",
        message: "What department does this new role belong to?",
      },
    ])
    .then(function (results) {
      db.query(
        "INSERT INTO roles SET ?",
        {
          title: results.titleAdded,
          salary: results.salaryAdded,
          dep_id: results.depIdAdded,
        },
        (err, results) => {
          if (err) throw err;
          console.table(results);
        }
      );
      initialPrompt();
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleIdAdded",
        message: "What is the employee's role id?",
      },
      {
        type: "input",
        name: "managerIdAdded",
        message: "What is the employee's manager id?",
      },
    ])
    .then(function (results) {
      db.query(
        "INSERT INTO employees SET ?",
        {
          first_name: results.firstName,
          last_name: results.lastName,
          role_id: results.roleIdAdded,
          manager_id: results.managerIdAdded,
        },
        (err, results) => {
          if (err) throw err;
          console.table(results);
        }
      );
      initialPrompt();
    });
}
const nameAndId = [];
db.query("SELECT last_name, id FROM employees", function (err, results) {
  if (err) {
    console.log(err);
  }
  results.forEach((element) => {
    nameAndId.push(`${element.last_name} ${element.id}`);
  });
  //console.table(results);
});

function updateRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "updateByName",
        message: "Select the employee's name and remember their id.",
        choices: nameAndId,
        // showEmployees()
      },
      {
        type: "input",
        name: "updatedEmployeeId",
        message:
          "Enter the id of the employee whose role you would like to update",
      },
      {
        type: "list",
        name: "pickRoleId",
        message: "Select the desired new role_id and remember it.",
        choices: [
          "Sales lead, role_id: 1",
          "Sales Person, role_id: 2",
          "Lead Engineer, role_id: 3",
          "Software Engineer, role_id: 4",
          "Account Manager, role_id: 5",
          "Accountant, role_id: 6",
          "Legal Team Lead, role_id: 7",
          "Lawyer, role_id: 8",
        ],
         
      },

      {
        type: "input",
        name: "newRoleId",
        message: "Enter the role_id of the new role",
      },
    ])
    .then(function (results) {
      // const query = `UPDATE employees SET role_id=?, salary=? WHERE employee_id= ?`;
      db.query(
        "UPDATE employees SET role_id = ? WHERE id = ?",
        [results.newRoleId, results.updatedEmployeeId],
         
        function (err, results) {
          if (err) throw err;
          
          console.table(results);
        }
      );
    });
  //initialPrompt();
}
function deleteEmployeeById() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "updateByName",
        message: "Select the employee's name and remember their id.",
        choices: nameAndId,
     
      },
      {
        type: "input",
        name: "deleteEmployeeId",
        message:
          "Enter the id of the employee whose role you would like to delete",
      },
    ])
    .then(function (results) {
       
      db.query(
        "DELETE FROM employees WHERE id = ?",
        [results.deleteEmployeeId],

        function (err, results) {
          if (err) throw err;

          console.table(results);
        }
      );
    });
  //initialPrompt();
};

/* Initial Prompt with choices of what to do:
inquirer prompt - What would you like to do? 
if view something call any of the view functions (switch statement?)
if add something, call any of the add functions
if update something, call any of the update functions
Add functions for each action:
View functions:
 - view departments
    function viewDepartments( )
 - view roles
 - view employees

 Add functions 
 INSERT INTO departments (id, name)
  VALUES (1, "HR");

 - add department
 - add role
 - add employee

 Update functions
 (- update department)
 - update role
 - update employee
 
 Bonus:
 remove functions

 let deletedRow = 2;
function deleteEmployeeById(id) {
db.query(`DELETE FROM employees WHERE id = ?`, deletedRow,(err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
})};
deleteEmployeeById(deletedRow);

 Update employee managers.

View employees by manager.

View employees by department.

Delete departments, roles, and employees.

View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

*/
