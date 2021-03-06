// ************
// DEPENDENCIES
// ************
const connectionDepend = require('./config/connection');
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const figlet = require('figlet');


// ****************
// MySQL CONNECTION
// ****************
// moved to config/connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     database: 'employeeTrackerDB',
// });

connection.connect((err) => {
    if (err) throw err;
    greeting();
});


// *******************
// GREETING via Figlet
// *******************
// Function to have a stylized greeting at the start of the app - https://www.npmjs.com/package/figlet
const greeting = () => {
    figlet.text('Welcome to Employee Tracker!', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }, function(err, data) {
        if (err) {
            console.log('Oops! Something went wrong');
            console.dir(err);
            return;
        }
        console.log(data);
        // Begin the main search process 
        runSearch();
    });
};


// ****************
// MAIN FUNCTIONS
// ****************

// Function to begin Inquirer and start the search. 
const runSearch = () => {
    inquirer
      .prompt({
          name: 'action',
          type: 'list',
          message: 'What would you like to do?',
          choices: [
            'View All Employees',
            'View All Roles',
            'View All Departments',
            'View All Employees By Department',
            'View Department Budgets',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
            'Remove Employee',
            'EXIT'
            ]
        })
      .then((answer) => {
        switch (answer.action) {
          case 'View All Employees':
              viewAllEmployees();
              break;
  
          case 'View All Departments':
              viewAllDepartments();
              break;
  
          case 'View All Roles':
              viewAllRoles();
              break;
  
          case 'View All Employees by Department':
              viewEmployeesByDepartment();
              break;
  
          case 'View Department Budgets':
              viewDepartmentBudget();
              break;
          
          case 'Add Employee':
              addEmployee();
              break;
  
          case 'Add Department':
              addDepartment();
              break;
  
          case 'Add Role':
              addRole();
              break;
  
          case 'Update Employee Role':
              updateEmployeeRole();
              break;
  
          case 'Remove Employee':
              removeEmployee();
              break;
  
          case 'EXIT':
              console.log('Thank you for using Employee Tracker! Have a nice day!');
              connection.end();
              break;
          
          // default:
          //     console.log(`Invalid action: ${answer.action}. Please try again.`);
          //     break;
        };
      });
  };
  

// *********************
// READ (View) FUNCTIONS
// *********************
    
const viewAllEmployees = () => {
    const mysqlQuery = `SELECT employee.id AS 'Employee ID', 
                    employee.first_name AS 'First Name', 
                    employee.last_name AS 'Last Name', 
                    role.title AS 'Title', 
                    department.department_name AS 'Department', 
                    role.salary AS 'Salary'
                    FROM employee, role, department 
                    WHERE department.id = role.department_id 
                    AND role.id = employee.role_id
                    ORDER BY employee.id ASC;`
        connection.promise().query(mysqlQuery, (err,res) => {
            if (err) throw err;
            console.log(`\n List of All Current Employees: \n`);
            console.table(res);
            runSearch();
        });
};



// Function to view all roles
const viewAllRoles = () => {
    console.log(`\n List of All Current Employee Roles: \n`);
    const query = `SELECT role.id AS ID, role.title AS Title, department.department_name AS Department FROM role
                INNER JOIN department ON role.department_id = department.id`;
    connection.promise().query(query, (err, res) => {
      if (err) throw err;
        console.table(res)
        // response.forEach((role) => {console.log(role.title);});
        runSearch();
    });
  };


// Function to view all departments
const viewAllDepartments = () => {
    const query = `SELECT department.id AS ID, department.department_name AS Department FROM department`; 
    connection.promise().query(query, (err, res) => {
      if (err) throw err;
      console.log(`List of All Departments:`);
      console.table(res);
      runSearch();
    });
  };


// Function to view all employees by department
const viewEmployeesByDepartment = () => {
    const query = `SELECT employee.first_name AS 'First Name', 
                    employee.last_name AS 'Last Name', 
                    department.department_name AS Department
                    FROM employee 
                    LEFT JOIN role ON employee.role_id = role.id 
                    LEFT JOIN department ON role.department_id = department.id`;
    connection.query(query, (err, res) => {
      if (err) throw err;
        console.log(`Employees by Department:`);
        console.table(res);
        runSearch();
      });
  };


// // Function to view departmental budgets
const viewDepartmentBudget = () => {
    console.log(`Department Budgets:`);
    const query = `SELECT department_id AS ID, 
                    department.department_name AS Department,
                    SUM(salary) AS Budget
                    FROM role  
                    INNER JOIN department ON role.department_id = department.id GROUP BY  role.department_id`;
    connection.query(query, (err, res) => {
      if (err) throw err;
        console.table(res);
        runSearch();
    });
  };


// **********************
// CREATE (Add) FUNCTIONS
// **********************


// Function to add an employee
const addEmployee = () => {
    inquirer.prompt([
      {
        name: 'fistName',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'lastName',
        type: 'input',
        message: "What is the employee's last name?",
      }
    ])
      .then(answer => {
      const employeeName = [answer.fistName, answer.lastName]
      const roleQuery = 
        `SELECT role.id AS ID, role.title AS Title FROM role`
      connection.promise().query(roleQuery, (error, data) => {
        if (error) throw error; 
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                // Pulls the role choices from existing list of roles in DB
                choices: roles
              }
            ])
              .then(roleSelection => {
                const role = roleSelection.role;
                employeeName.push(role);
                const managerQuery = `SELECT * FROM employee`;
                connection.promise().query(managerQuery, (error, data) => {
                  if (error) throw error;
                //   Map out with concatenation to cleanly make it read James Smith instead of Smith, James
                  const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
                  inquirer.prompt(
                    {
                      type: 'list',
                      name: 'manager',
                      message: "Who is the employee's manager?",
                      // Pulls the manager choices from existing list of managers in DB
                      choices: managers
                    }
                  )
                    .then(managerSelection => {
                      const manager = managerSelection.manager;
                      employeeName.push(manager);
                      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                      connection.query(query, employeeName, (err) => {
                      if (err) throw err;
                      console.log('This employee has been added to the database!');
                      viewAllEmployees();
                });
              });
            });
          });
       });
    });
  };

// // Function to add a new department
const addDepartment = () => {
    inquirer
      .prompt([
        {
          name: 'newDepartment',
          type: 'input',
          message: 'What is the name of the new department?',
        }
      ])
      .then((answer) => {
        const query = `INSERT INTO department (department_name) VALUES (?)`;
        connection.query(query, answer.newDepartment, (err, res) => {
          if (err) throw err;
          console.log(`This department was successfully created!`);
          viewAllDepartments();
        });
      });
};


// // Function to add a new role
const addRole = () => {
  const query = 'SELECT * FROM department'
  connection.promise().query(query, (error, response) => {
      if (error) throw error;
    //   Empty department array to push new role to
      let departmentNamesArray = [];
      response.forEach((department) => {departmentNamesArray.push(department.department_name);});
      departmentNamesArray.push('Create Department');
      inquirer
        .prompt([
          {
            name: 'departmentName',
            type: 'list',
            message: 'In which department is this new role?',
            choices: departmentNamesArray
          }
        ])
        .then((answer) => {
          if (answer.departmentName === 'Create Department') {
            this.addDepartment();
          } else {
            addRoleToDB(answer);
          }
        });

      const addRoleToDB = (departmentInformation) => {
        inquirer
          .prompt([
            {
              name: 'newRole',
              type: 'input',
              message: 'What is the name of this new role?',
            },
            {
              name: 'salary',
              type: 'input',
              message: 'What is the salary of this new role?',
            }
          ])
          .then((answer) => {
            const newRole = answer.newRole;
            // Couldn't get to work the way I wanted
            let departmentID;
            response.forEach((department) => {
              if (departmentInformation.departmentName === department.department_name) {departmentID = department.id;}
            });
            // Need to fix this because it won't include the salary
             const array = [newRole, answer.salary, departmentID];
            // Come back and do a join to actually show title of department instead of id
            const roleUpdateQuery = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            connection.promise().query(roleUpdateQuery, array, (err) => {
              if (err) throw err;
              console.log(`This role has successfully been created!`);
              viewAllRoles();
            });
          });
      };
    });
  };

// ***************
// UPDATE FUNCTION
// ***************

// Function to update an employee's role
const updateEmployeeRole = () => {
    const query = `SELECT employee.id AS 'Employee ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.id AS 'Role ID'
            FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
    connection.promise().query(query, (error, response) => {
      if (error) throw error;
      const employeeNamesArray = [];
      response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

      const query2 = `SELECT role.id, role.title AS Title FROM role`;
      connection.promise().query(query2, (err, res) => {
        if (err) throw err;
        const roleArray = [];
        res.forEach((role) => {roleArray.push(role.title);});

        inquirer
          .prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: 'Which employee has a new role?',
              choices: employeeNamesArray
            },
            {
              name: 'chosenRole',
              type: 'list',
              message: "What is the employee's new role?",
              choices: rolesArray
            }
          ])
          .then((answer) => {
            let updatedTitleID;
            let employeeID;

            response.forEach((role) => {
              if (answer.chosenRole === role.title) {
                updatedTitleID = role.id;
              }
            });

            response.forEach((employee) => {
              if (
                answer.chosenEmployee ===
                `${employee.first_name} ${employee.last_name}`
              ) {
                employeeID = employee.id;
              }
            });

            const queries = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
            connection.query(
              queries,
              [updatedTitleID, employeeId],
              (err) => {
                if (err) throw err;
                console.log(`This employee role has been updated!`);
                runSearch();
              }
            );
          });
      });
    });
  };

// // ****************
// // DELETE FUNCTIONS
// // ****************

// Function to delete an employee
const removeEmployee = () => {
  const query = `SELECT employee.id, employee.first_name AS 'First Name', employee.last_name AS 'Last Name' FROM employee`;

  connection.promise().query(query, (err, res) => {
    if (err) throw err;
    const employeeArray = [];
    res.forEach((employee) => {employeeArray.push(`${employee.first_name} ${employee.last_name}`);});

    inquirer
      .prompt([
        {
          name: 'selectedEmployee',
          type: 'list',
          message: 'Which employee would you like to remove?',
          choices: employeeArray
        }
      ])
      .then((answer) => {
        let employeeID;

        response.forEach((employee) => {
          if (
            answer.selectedEmployee ===
            `${employee.first_name} ${employee.last_name}`
          ) {
            employeeID = employee.id;
          }
        });

        const query = `DELETE FROM employee WHERE employee.id = ?`;
        connection.query(query, [employeeID], (err) => {
          if (err) throw err;
          console.log(`This employee has successfully been removed.`);
          viewAllEmployees();
        });
      });
  });
};