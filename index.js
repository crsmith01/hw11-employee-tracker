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
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'EXIT'
            ],
        })
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
                    updateManager();
                    break;

                case 'EXIT':
                    console.log('Thank you for using Employee Tracker! Have a nice day!');
                    connection.end();
                    break;
                
                default:
                    console.log(`Invalid action: ${answer.action}. Please try again.`);
                    break;
            }
        });
};

// will want to use console.table for results
// Function to view all employees at the company
const viewEmployees = () => {
    const query = 
        'SELECT * FROM employees'
        // Will probably actually be a much larger query to get the info I want across the 3 different tables and to show up with console.table 
    connection.query(query, (err, res) => {
        // If there is a response, show all employees in the console.
        if (res) {
            console.log('n\ View of All Employees n\')
            // https://www.npmjs.com/package/console.table - 
            res.forEach(({res}) => console.table(____));
        // Otherwise, if there is an error, console.log that error
        } else {
            console.log(`Oops! There seems to be a problem: ${err}.`)
        }
        runSearch();
    });
};


// Function to view all employees by department
const viewByDepartment = () => {
    inquirer
    .prompt({
        name: 'department',
        // what's the difference between list and rawlist?
        type: 'rawlist',
        message: 'Which department would you like to view?',
        choices: [
            'Choice 1',
            'Choice 2',
            'Chocie 3',
            'Choice 4',
            'Choice 5'
        ],
    })
    // reorganize this section to actually include the db info
    .then((answer) => {
        switch (answer.department) {
            case 'Choice 1':
                _______;
                break;
            case 'Choice 2':
                _______;
                break;
            case 'Choice 3':
                _______;
                break;
            case 'Choice 4':
                _______;
                break;
            case 'Choice 5':
                _______;
                break;
        }

    const query = 
        'SELECT______'
    connection.query(query, (err, res) => {
        res.forEach(({_____}) => console.table(____));
        runSearch();
    });
});

// Function to view all employees by manager
const viewByManager = () => {
    inquirer
    .prompt({
        name: 'manager',
        // what's the difference between list and rawlist?
        type: 'input',
        // Needs to be relevant to list - manager name is not one I don't think?
        message: 'What is the name of the manager?'
    })
    // reorganize this section to actually include the db info
    .then((answer) => {
        const query = 
            'SELECT______'
        connection.query(query, (err, res) => {
            res.forEach(({_____}) => console.table(____));
            runSearch();
        });
    });
};


// CREATE 
// Function to add an employee
const addEmployee = () => {
    inquirer
    .prompt([
    {
        name: 'firstName',
        // what's the difference between list and rawlist?
        type: 'input',
        // Needs to be relevant to list - manager name is not one I don't think?
        message: "What is the employee's first name?"
    },
    {
        name: 'lastName',
        type: 'input',
        message: "What is the employee's last name?"
    },
    {
        name: 'role',
        type: 'rawlist',
        message: "What is the employee's role?",
        // Figure out how to populate the choices from the employee table
        // OR just have existing job roles listed
        choices: [
            '',
        ]
    },
    {
        name: 'manager',
        type: 'rawlist',
        message: "Who is the employee's manager?",
        // Figure out how to populate the choices from the employee table
        choices: [
            '',
        ]
    },

    ])
    // reorganize this section to actually include the db info
    .then((answer) => {
        const query = 
            'SELECT______'
        connection.query(query, (err, res) => {
            res.forEach(({_____}) => console.table(____));
            runSearch();
        });
    });
};


// DELETE
// Function to view remove an employee
const removeEmployee = () => {
    inquirer
    .prompt([
    {
        name: 'employee',
        // what's the difference between list and rawlist?
        type: 'rawlist',
        // Needs to be relevant to list - manager name is not one I don't think?
        message: "Which employee would you like to remove?",
        // Figure out how to populate the choices from the employee table
        choices: [
            '',
        ]
    ])
    // reorganize this section to actually include the db info
    .then((answer) => {
        const query = 
            'SELECT______'
        connection.query(query, (err, res) => {
            res.forEach(({_____}) => console.table(____));
            runSearch();
        });
    });
}};


// UPDATE
// Function to update an enmployee's role
const updateRole = () => {
    inquirer
    .prompt([
    {
        name: 'employee',
        // what's the difference between list and rawlist?
        type: 'rawlist',
        // Needs to be relevant to list - manager name is not one I don't think?
        message: "Which employee's role would you like to update?",
        // Figure out how to populate the choices from the employee table
        choices: [
            '',
        ]
    },
    {
        name: 'newRole',
        // what's the difference between list and rawlist?
        type: 'rawlist',
        // Needs to be relevant to list - manager name is not one I don't think?
        message: "Which role would you like to set as the selected employee's new role?",
        // Figure out how to populate the choices from the employee table
        choices: [
            '',
        ]
    }])
    // reorganize this section to actually include the db info
    .then((answer) => {
        const query = 
            'SELECT______'
        connection.query(query, (err, res) => {
            res.forEach(({_____}) => console.table(____));
            runSearch();
        });
    });
}};


// Function to update an employee's manager
const updateManager = () => {
    inquirer
    .prompt([
        {
            name: 'employee',
            // what's the difference between list and rawlist?
            type: 'rawlist',
            // Needs to be relevant to list - manager name is not one I don't think?
            message: "Which employee's manager would you like to update?",
            // Figure out how to populate the choices from the employee table
            choices: [
                '',
            ]
        },
        {
            name: 'newManager',
            // what's the difference between list and rawlist?
            type: 'rawlist',
            // Needs to be relevant to list - manager name is not one I don't think?
            message: "Which employss would you like to set as the selected employee's new manager?",
            // Figure out how to populate the choices from the employee table
            choices: [
                '',
            ]
        }])
    // reorganize this section to actually include the db info
    .then((answer) => {
        const query = 
            'SELECT______'
        connection.query(query, (err, res) => {
            res.forEach(({_____}) => console.table(____));
            runSearch();
        });
    });
};