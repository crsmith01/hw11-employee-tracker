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

NEED TO GO BACK AND ADD DIFFERENT FUNCTIONS AS PER THE README


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
                // Added Add Department and Add Role
                'Add Department',
                'Add Role',
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
                
                case 'Add Department':
                    addDepartment();
                    break;

                case 'Add Role':
                    addRole();
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
const viewEmployees = async () => {
    const allEmployeeTable = await db.query (
        'SELECT_______'
    );
    console.table(allEmployeeTable);
    runSearch();








    //     'SELECT * FROM employees'
    //     // Will probably actually be a much larger query to get the info I want across the 3 different tables and to show up with console.table 
    // connection.query(query, (err, res) => {
    //     // If there is a response, show all employees in the console.
    //     if (res) {
    //         console.log('n\ View of All Employees n\')
    //         // https://www.npmjs.com/package/console.table - 
    //         res.forEach(({res}) => console.table(____));
    //     // Otherwise, if there is an error, console.log that error
    //     } else {
    //         console.log(`Oops! There seems to be a problem: ${err}.`)
    //     }
    //     runSearch();
    // });
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
            'Production',
            'Research and Development',
            'Marketing',
            'Human Resources',
            'Accounting',
            'Legal'
        ],
    })
    // reorganize this section to actually include the db info
    .then((answer) => {
        switch (answer.department) {
            case 'Production':
                _______;
                break;
            case 'Research and Development':
                _______;
                break;
            case 'Marketing':
                _______;
                break;
            case 'Human Resources':
                _______;
                break;
            case 'Accounting':
                _______;
                break;
            case 'Legal':
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
    .then((answer) => {
        connection.query(
            'INSERT INTO employees SET ?',
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer._____,
                manager_id: answer.______
            },
            (err) => {
                if (err) throw err;
                console.log('Your new department has successfully been added!')
                runSearch();
            }
        });
    });
};


// Function to add a new department
const addDepartment = () => {
    inquirer
    .prompt({
        name: 'newDepartment',
        type: 'input',
        message: "What is the name of the new Department?"
    })
    // something about id
    .then((answer) => {
        connection.query(
            'INSERT INTO departments SET ?',
            {
                name: answer.newDepartment
            },
            (err) => {
                if (err) throw err;
                console.log('Your new department has successfully been added!')
                runSearch();
            }
        );
    });
};


// Function to add a new role
const addRole = () => {
    inquirer
    .prompt([
        {
            name: 'newRoleTitle',
            type: 'input',
            message: "What is the name of the new Role?"
        },
        {
            name: 'newRoleSalary',
            type: 'input',
            message: "What is the salary of this new Role?"
        },
        // Is it fair to ask this? Or should I leave it out, or find a way around it (does it belong to an existing deparmtent or a new one??
        // {
        //     name: 'newRoleDepartmentID',
        //     type: 'input',
        //     message: "What is the ID of the new Role's department?"
        // }
    ])
    // reorganize this section to actually include the db info
    .then((answer) => {
        connection.query(
            'INSERT INTO roles SET ?',
            {
                title: answer.newRoleTitle,
                salary: answer.newRoleSalary,
                // department_id: answer.newRoleDepartmentID
            }
        (err) => {
            if (err) throw err;
            console.log('Your new Role has successfully been added!')
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