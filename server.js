const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const consoleTbl = require('console.table');
const CFonts = require('cfonts')

const db = mysql.createConnection({
    host: 'localhost'
// })
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