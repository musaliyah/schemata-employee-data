const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql');
const consoleTbl = require('console.table');
const cfonts = require('cfonts');


const db = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: 'teddyfreddy',
    database: 'employee_DB'

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


function app() {
    inquirer.createPromptModule([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'start',
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
        switch(response.start) {
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
                exit();
                break;
            default:
                throw new Error("Unrecognized selection");
        }
    })
}
app();

function viewEmployees() {
    const query = 'select * from employee';
    db.query(query, (err, res) => {
        if (err)
        throw (err);
        console.log(table(toTableFormat(res)));
        start();
    });
}

function addEmployees() {
    db.query('select * from employee', (err, res) => {
        const employees = res.map(employee => {
            return employee.first_name + employee.last_name
        });
    db.query('select * from role', (err, res) => {
        const roles = res.map(role => {
            return role.title;
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
                choice: roles
            },
            {
                type: 'list',
                message: 'Choose the manager of the employee',
                choices: employees
            },

        ]).then((res) => {
            const {
                first_name,
                last_name
            } = res;
        })
    })
    })
}

//I spent way too long trying to decide what cFont layout I wanted to use lol, please know I put my whole heart into this selection :D 


// const questions = () => {
//     inquirer.prompt([
//         {
//             type: "list",
//             message: "What would you like to do?",
//             choices: [
//                 "View All Employees",
//                 "Add Employee",
//                 "Update Employee Role",
//                 "View All Roles",
//                 "Add Role",
//                 "View All Departments",
//                 "Add Department"
//             ]
//             name: "choice",
//         },
//     ]).then((input) => {

//         switch (input.choice){
//             case "View All Employees":
//                 viewEmployees();
//                 break;
            
//             case "View All Employee's By Roles":
//                 viewRoles();
//                 break;

//             case "View All Employee's By Departments":
//                 viewDepartments();
//                 break;

//             case "Add Employee":
//                 addEmployee();
//                 break;
            
//             case "Update Employee":
//                 updateEmployee();
//                 break;

//             case "Add Role":
//                 addRole();
//                 break;

//             case "Add Department": 
//                 addDepartment();
//                 break;
//             case 'Quit':
//                 connection.end();
//                 break;
//                 default:
//                     throw new Error('Error,please try again.')
//         }
//     })
// }

// function viewEmployees() {
//     const query = `SELECT employee.first_name, employee.lastname, role.title, role.salary, department. CONCAT(e.first_name, ' ', e.last_name;`
//     AS Manager FROM employee INNER JOIN role
// }
//View all departments 
//SELECT * FROM department;

//View all employees
//SELECT * FROM employees;

//Create a new departments

//prompt the user for the "name" of the department 

    //THEN run the query 
    //INSERT INTO department (name)
    //VALUES ("Sales");

// Create a new role 

// Get the existing departments from the "department" table

    //Then //prompt user for the title "salary" and "department" for the role
        
        //THEN  Run the query

    // INSERT INTO role (title, salary, department_id)
    // VALUES ("Engineer", 120000, 1)