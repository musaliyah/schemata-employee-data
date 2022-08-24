const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const consoleTbl = require('console.table');

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function questions() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                ""
            ]
        }
    ])
}
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