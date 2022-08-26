const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const consoleTbl = require('console.table');
const cfonts = require('cfonts');


const db = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: 'teddyfreddy',
    database: 'employee_DB'

});
// askbcs tutor (Mia) 
db.connect(function (err) {
    if (err) throw err;
    app();
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
    inquirer.prompt([
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
        switch(response.app) {
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
                db.end();
                break;
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
                choice: role
            },
            {
                type: 'list',
                message: 'Choose the manager of the employee',
                choices: employee
            },

        ]).then((res) => {
            const {first_name, last_name} = res;
            const role_id = role.filter(role => {
                return role.title === role;
            }) [0];
            const manager = res.filter(employee => {
                return employee.first_name + employee.last_name === res.manager;
            }) [0];
            const manager_id = manager ? manager.id : null;
            db.query('add employee', 
            {
                first_name,
                last_name,
                role_id, 
                manager_id
            },
            (err, result) => {
                if (err)
                throw err;
            }

            )
            app();
        })
    })
    })
}



