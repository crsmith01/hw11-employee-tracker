// ************
// DEPENDENCIES
// ************
const mysql = require('mysql');
const inquirer = require('inquirer');

// ****************
// MySQL CONNECTION
// ****************
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    password: 'UPDATE THIS TO NOT BE THE SAME AS PRIVATE THINGS',
    database: 'employee_trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    startSearch();
});


const startSearch = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager'
            ],
        });
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    viewEmployees();
                    break;

                case 'View All Employees by Department':
                    viewByDepartment();
                    break;
                
                case 'View All Employees by Manager':
                    viewByManager();
                    break;
                
                case 'Add Employee':
                    addEmployee();
                    break;
                
                case 'Remove Employee':
                    removeEmployee();
                    break;
                                
                case 'Update Employee Role':
                    updateRole();
                    break;
                
                case 'Update Employee Manager':
                    updateDepartment();
                    break;
                
                default:
                    console.log(`Invalid action: ${answer.action}. Please try again.`);
                    break;
            }
        });
};


const viewEmployees = () => {
    inquirer
        .prompt({
            name: 'all-employees',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager'
            ],
        });
        .then((answer) => {


// For remove:
// Which employee do you want to remove?

// For add:
// What is the employee's first name?
// What is the employee's last name?
// What is the employee's role id?
// what is the employee's manager id?