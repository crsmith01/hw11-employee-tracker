// ************
// DEPENDENCIES
// ************
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
//     database: 'employee_trackerDB',
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
            // 'Remove Department',
            // 'Remove Role',
            'Exit'
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
          
          case 'Remove Department':
              removeDepartment();
              break;
  
          case 'Remove Role':
              removeRole();
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

// Function to view all employees at the company
const viewAllEmployees = () => {
    const employeesTable =       `SELECT employee.id, 
                    employee.first_name, 
                    employee.last_name, 
                    role.title, 
                    department.department_name AS 'department', 
                    role.salary
                    FROM employee, role, department 
                    WHERE department.id = role.department_id 
                    AND role.id = employee.role_id
                    ORDER BY employee.id ASC`;
    connection.promise().query(employeesTable, (error, response) => {
      if (error) throw error;
      console.log(`List of All Current Employees:`);
      console.table(response);
      runSearch();
    });
  };


// Function to view all roles
const viewAllRoles = () => {
    console.log(`List of All Current Employee Roles:`);
    const rolesTable = `SELECT role.id, role.title, department.department_name AS department
                FROM role
                INNER JOIN department ON role.department_id = department.id`;
    connection.promise().query(rolesTable, (error, response) => {
      if (error) throw error;
        response.forEach((role) => {console.log(role.title);});
        runSearch();
    });
  };


// Function to view all departments
const viewAllDepartments = () => {
    const deptTable = `SELECT department.id AS id, department.department_name AS department FROM department`; 
    connection.promise().query(deptTable, (error, response) => {
      if (error) throw error;
      console.log(`List of All Departments:`);
      console.table(response);
      runSearch();
    });
  };


// Function to view all employees by department
const viewEmployeesByDepartment = () => {
    const empDept =     `SELECT employee.first_name, 
                    employee.last_name, 
                    department.department_name AS department
                    FROM employee 
                    LEFT JOIN role ON employee.role_id = role.id 
                    LEFT JOIN department ON role.department_id = department.id`;
    connection.query(empDept, (error, response) => {
      if (error) throw error;
        console.log(`Employees by Department:`);
        console.table(response);
        runSearch();
      });
  };


// // Function to view departmental budgets
const viewDepartmentBudget = () => {
    console.log(`Department Budgets:`);
    const budget =     `SELECT department_id AS id, 
                    department.department_name AS department,
                    SUM(salary) AS budget
                    FROM  role  
                    INNER JOIN department ON role.department_id = department.id GROUP BY  role.department_id`;
    connection.query(budget, (error, response) => {
      if (error) throw error;
        console.table(response);
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
        type: 'input',
        name: 'fistName',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
      }
    ])
      .then(answer => {
      const crit = [answer.fistName, answer.lastName]
      const roleSql = `SELECT role.id, role.title FROM role`;
      connection.promise().query(roleSql, (error, data) => {
        if (error) throw error; 
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roles
              }
            ])
              .then(roleChoice => {
                const role = roleChoice.role;
                crit.push(role);
                const managerSql =  `SELECT * FROM employee`;
                connection.promise().query(managerSql, (error, data) => {
                  if (error) throw error;
                  const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'manager',
                      message: "Who is the employee's manager?",
                      choices: managers
                    }
                  ])
                    .then(managerChoice => {
                      const manager = managerChoice.manager;
                      crit.push(manager);
                      const sql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                      connection.query(sql, crit, (error) => {
                      if (error) throw error;
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
          message: 'What is the name of your new department?',
        }
      ])
      .then((answer) => {
        let sql =     `INSERT INTO department (department_name) VALUES (?)`;
        connection.query(sql, answer.newDepartment, (error, response) => {
          if (error) throw error;
          console.log(`This department was successfully created!`);
          viewAllDepartments();
        });
      });
};


// // Function to add a new role
const addRole = () => {
  const sql = 'SELECT * FROM department'
  connection.promise().query(sql, (error, response) => {
      if (error) throw error;
      let deptNamesArray = [];
      response.forEach((department) => {deptNamesArray.push(department.department_name);});
      deptNamesArray.push('Create Department');
      inquirer
        .prompt([
          {
            name: 'departmentName',
            type: 'list',
            message: 'In which department is this new role?',
            choices: deptNamesArray
          }
        ])
        .then((answer) => {
          if (answer.departmentName === 'Create Department') {
            this.addDepartment();
          } else {
            addRoleResume(answer);
          }
        });

      const addRoleResume = (departmentData) => {
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
            let createdRole = answer.newRole;
            let departmentId;

            response.forEach((department) => {
              if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
            });

            let sql =   `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            let crit = [createdRole, answer.salary, departmentId];

            connection.promise().query(sql, crit, (error) => {
              if (error) throw error;
              console.log(`This role has successfully been created!`);
              viewAllRoles();
            });
          });
      };
    });
  };

// // ****************
// // DELETE FUNCTIONS
// // ****************

// // Function to remove an employee
// const removeEmployee = () => {
//     inquirer
//     .prompt([
//     {
//         name: 'employee',
//         // what's the difference between list and rawlist?
//         type: 'rawlist',
//         // Needs to be relevant to list - manager name is not one I don't think?
//         message: "Which employee would you like to remove?",
//         // Figure out how to populate the choices from the employee table
//         choices: [
//             '',
//         ]
//     }
//     ])
//     // reorganize this section to actually include the db info
//     .then((answer) => {
//         const query = 
//             'SELECT______'
//         connection.query(query, (err, res) => {
//             res.forEach(({_____}) => console.table(____));
//             runSearch();
//         });
//     });
// };

// // Function to remove a department
// const removeEmployee = () => {
//     inquirer
//     .prompt([
//     {
//         name: 'department',
//         // what's the difference between list and rawlist?
//         type: 'rawlist',
//         // Needs to be relevant to list - manager name is not one I don't think?
//         message: "Which department would you like to remove?",
//         // Figure out how to populate the choices from the employee table
//         choices: [
//             '',
//         ]
//     }
//     ])
//     // reorganize this section to actually include the db info
//     .then((answer) => {
//         const query = 
//             'SELECT______'
//         connection.query(query, (err, res) => {
//             res.forEach(({_____}) => console.table(____));
//             runSearch();
//         });
//     });
// };

// // Function to remove a role
// const removeRole = () => {
//     inquirer
//     .prompt([
//     {
//         name: 'role',
//         // what's the difference between list and rawlist?
//         type: 'rawlist',
//         // Needs to be relevant to list - manager name is not one I don't think?
//         message: "Which role would you like to remove?",
//         // Figure out how to populate the choices from the employee table
//         choices: [
//             '',
//         ]
//     }
//     ])
//     // reorganize this section to actually include the db info
//     .then((answer) => {
//         const query = 
//             'SELECT______'
//         connection.query(query, (err, res) => {
//             res.forEach(({_____}) => console.table(____));
//             runSearch();
//         });
//     });
// };





// // ****************
// // Update FUNCTIONS
// // ****************

// // Function to update an enmployee's role
// const updateRole = () => {
//     inquirer
//     .prompt([
//     {
//         name: 'employee',
//         // what's the difference between list and rawlist?
//         type: 'rawlist',
//         // Needs to be relevant to list - manager name is not one I don't think?
//         message: "Which employee's role would you like to update?",
//         // Figure out how to populate the choices from the employee table
//         choices: [
//             '',
//         ]
//     },
//     {
//         name: 'newRole',
//         // what's the difference between list and rawlist?
//         type: 'rawlist',
//         // Needs to be relevant to list - manager name is not one I don't think?
//         message: "Which role would you like to set as the selected employee's new role?",
//         // Figure out how to populate the choices from the employee table
//         choices: [
//             '',
//         ]
//     }])
//     // reorganize this section to actually include the db info
//     .then((answer) => {
//         const query = 
//             'SELECT______'
//         connection.query(query, (err, res) => {
//             res.forEach(({_____}) => console.table(____));
//             runSearch();
//         });
//     });
// }};


// // Function to update an employee's manager
// const updateManager = () => {
//     inquirer
//     .prompt([
//         {
//             name: 'employee',
//             // what's the difference between list and rawlist?
//             type: 'rawlist',
//             // Needs to be relevant to list - manager name is not one I don't think?
//             message: "Which employee's manager would you like to update?",
//             // Figure out how to populate the choices from the employee table
//             choices: [
//                 '',
//             ]
//         },
//         {
//             name: 'newManager',
//             // what's the difference between list and rawlist?
//             type: 'rawlist',
//             // Needs to be relevant to list - manager name is not one I don't think?
//             message: "Which employss would you like to set as the selected employee's new manager?",
//             // Figure out how to populate the choices from the employee table
//             choices: [
//                 '',
//             ]
//         }])
//     // reorganize this section to actually include the db info
//     .then((answer) => {
//         const query = 
//             'SELECT______'
//         connection.query(query, (err, res) => {
//             res.forEach(({_____}) => console.table(____));
//             runSearch();
//         });
//     });
// };