const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
const cfonts = require('cfonts');




const connection = mysql.createConnection({
    host: 'localhost',
    // ref: https://kinsta.com/knowledgebase/mysql-port/
    port: '3306',
    user: 'root',
    password: 'teddyfreddy',
    database: 'employee_DB'

});

// askbcs tutor (Mia) 
connection.connect((err) => {
    if(err)
        throw(err);
        
});
//https://www.npmjs.com/package/cfonts
cfonts.say('Schemata,|my|Employee|Data!', {
    font: 'slick',
    align: 'center',
    colors: ['#F2D2BD', '#93C572'],
    background: '#4A0404',
    letterSpacing: 1,
    lineHeight: 1, 
    space: true,
    maxLength: '0',
}); 
 //________________________________________________________ (delete later)

function app() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: [
                "View All Employees", 
                "Add Employee", 
                "Update Employee Role",
                "View All Roles", 
                "Add Role", 
                "View All Departments", 
                "Add Department", 
                "Exit Application"
            ]
        }
    ]).then((response) => {
        switch(response.menu) {
            case "View All Employees":
                viewEmployees();
                break;
            case "Add Employee":
                addEmployees();
                break;
            case "Update Employee Role":
                updateEmployees();
                break;
            case "View All Roles":
                viewAllRoles();
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
            case "Exit Application":
                connection.end();
                break;
            default:
                connection.end();
                break;
        }
    })
}
app();



function addEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        const employeeData = res.map(employee => {
            return employee.first_name + '' + employee.last_name;
        });
    connection.query('SELECT * FROM roles', (err, res) => {
        const roleData = res.map(roles => {
            return roles.title, roles.id;
            
        });
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter employee first name: '
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter employee last name: '
            },
            {
                type: 'list',
                message: 'Choose employee role: ',
                name: 'role_id',
                choices: roleData
            },
            {
                type: 'list',
                message: 'Choose the manager of the employee',
                name: 'manager_id',
                choices: employeeData
            },

        ]).then((res) => {
            
            connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',[res.first_name, res.last_name, res.role_id, res.manager], (res) => {console.table(res)})
            console.table(res);
            app();
        })
    })
    })
}

function addDepartment (){
    inquirer.prompt({
        type: 'input',
        name: 'depName',
        message: 'What is the name of the new department? '
    }).then((answer) => 
    {
        
        connection.query(`INSERT INTO department (names) VALUES (?)`, answer.depName, (err, res) => 
        {
            if (err) {
                console.log(err);
            }
            viewDepartments();

        });
    })
}

function addRole() {
    connection.query('SELECT * FROM department', (err, res) => {
            if (err)
                throw err;
            const departmentsData = res.map(department => { return department.id, department.name});
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the title of the new role? '
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of this new role?', 
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department is this role in? ',
                    choices: departmentsData 
                }
            ]).then ((result) => {
                connection.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [result.name, result.salary, result.department], (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(res)
                    viewAllRoles();
                });
            })
        }
    )
}

function viewEmployees() {
    const query = 'select * from employee';
    connection.query(query, (err, res) => {
        if (err)
            throw (err);
            console.table(res);
        // console.log(table(toTableFormat(res)));
        app();
    });
}

function viewAllRoles() {
    const query = 'SELECT * FROM roles';
    connection.query(query, (err, res) => {
        if(err) 
            throw err;
        // console.log(table(toTableFormat(res)));
        console.table(res);
        app();
    });
}

function viewDepartments (){
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err)
            throw err;
            console.table(res);
        // console.log(table(toTableFormat(res)));
        app();
    });
};

function updateEmployees() {
    connection.query('SELECT * FROM employee', function (err, res) {
        const employeeData = res.map(employee => {
            return {name: employee.first_name + '' + employee.last_name}
        });
        connection.query('SELECT * FROM roles', (err, res) => {
            const roles = res.map(roles => {
                return roles.title;
            });
            inquirer.prompt([
                {
                    type:'list',
                    name: 'employee',
                    message: 'Select employee to update their role: ',
                    choices: employeeData
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'Assign new role to the employee: ',
                    choices: roles
                }
            ]).then(answer => {
                const id = res.filter(employee => {
                    return employee.first_name + '' + employee.last_name === answer.employee;
            
            
                })[0]
                connection.query(
                    'UPDATE employees SET role_id = ? WHERE id = ?', [roles, id], (err, result) => {app();
                    console.log('New role assigned to employee!')
                    viewEmployees();
                }
                )
            })
        })
    })
};










// function toTableFormat(arr) {
//     const header = Object.keys(arr[0]);
//     const rows = arr.map(obj => Object.values(obj));
//     return [header, ...rows];
// }