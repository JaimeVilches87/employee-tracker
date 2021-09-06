require("console.table");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Margarita123!",
  database: "employees",
});



function start() {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "EXIT",
      ],
    })

    .then(function (response) {
      switch (response.choice) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "EXIT":
          connection.end();
          break;
      }
    });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employee", (error, result) => {
    if (error) throw error;

    console.log("\nEmployees");
    console.table(result);

    start();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        default: "Joe",
        message: "Enter the employee's first name: ",
      },
      {
        name: "lastName",
        type: "input",
        default: "Shmoe",
        message: "Enter the employee's last name: ",
      },
      {
        name: "role",
        type: "list",
        message: "Select the role:",
        choices: getRoles(),
      },
      {
        name: "manager",
        type: "list",
        message: "Select the manager:",
        choices: getManager(),
      },
    ])
    .then((response) => {
      var roleID = 0;
      var managerID = 0;

      connection.query(
        "SELECT id FROM role WHERE title = ?",
        [response.role],
        (error, result) => {
          if (error) throw error;

          result.forEach((id) => {
            roleID = id.id;
          });

          var managerFirstName = "";

          for (var i = 0; i < response.manager.length; i++) {
            if (response.manager.charAt(i) === " ") {
              break;
            } else {
              managerFirstName += response.manager.charAt(i);
            }
          }

          connection.query(
            "SELECT id FROM employee WHERE first_name = ?",
            [managerFirstName],
            (error, nextResult) => {
              if (error) throw error;

              nextResult.forEach((id) => {
                managerID = id.id;
              });

              connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: response.firstName,
                  last_name: response.lastName,
                  role_id: roleID,
                  manager_id: managerID,
                },
                (error, result) => {
                  if (error) throw error;
                }
              );

              viewAllEmployees();
            }
          );
        }
      );
    });
}

function getRoles() {
  let roles = [];
  connection.query("SELECT title FROM role", (error, response) => {
    if (error) throw error;

    response.forEach((role) => {
      roles.push(role.title);
    });
  });

  return roles;
}

function getManager() {
  let firstNames = [];
  let lastNames = [];
  let employees = [];

  connection.query("SELECT first_name FROM employee", (error, response) => {
    if (error) throw error;

    response.forEach((first_name) => {
      firstNames.push(first_name.first_name);
    });

    connection.query("SELECT last_name FROM employee", (error, response) => {
      if (error) throw error;

      response.forEach((last_name) => {
        lastNames.push(last_name.last_name);
      });

      for (var i = 0; i < firstNames.length; i++) {
        employees[i] = firstNames[i] + " " + lastNames[i];
      }
    });
  });

  return employees;
}

function updateRole() {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "number",
        message: "Enter the employee ID of the employee you wish to update:",
      },
      {
        name: "role",
        type: "number",
        message: "Enter the role ID you wish to update the employee to:",
      },
    ])
    .then((response) => {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ? ",
        [response.role, response.employee],
        (error, result) => {
          if (error) throw error;

          viewAllEmployees();
        }
      );
    });
}

function viewRoles() {
  connection.query("SELECT * FROM role", (error, result) => {
    if (error) throw error;

    console.log("\nRoles");
    console.table(result);

    start();
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter the role name: ",
      },
      {
        name: "salary",
        type: "number",
        message: "Enter the salary: ",
        validate: (salary) => {
          if (salary) {
            return true;
          } else {
            console.log("Please enter a number!");
            return false;
          }
        },
      },
      {
        name: "department",
        type: "list",
        message: "Select the department:",
        choices: getDepartments(),
      },
    ])
    .then((response) => {
      var responseID = 0;

      connection.query(
        "SELECT id FROM department WHERE name = ?",
        [response.department],
        (error, result) => {
          if (error) throw error;
          result.forEach((id) => {
            responseID = id.id;
          });

          connection.query(
            "INSERT INTO role SET ?",
            {
              title: response.name,
              salary: response.salary,
              department_id: responseID,
            },
            (error, result) => {
              if (error) throw error;
            }
          );

          viewRoles();
        }
      );
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", (error, result) => {
    if (error) throw error;

    console.log("\nDepartments");
    console.table(result);

    start();
  });
}
