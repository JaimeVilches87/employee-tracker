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
