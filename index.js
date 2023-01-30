const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // MySQL password
        password: 'chicken',
        database: 'dept_db'
    },
);
const { addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./sqlADD');
const cTable = require('console.table');
let roles = [];
let employees = [];
let departments = [];



function dataInit() {
    db.query(`SELECT title FROM roles;`, function (err, results) {
        roles = results.map(r => r.title);
    });
    db.query(`SELECT first_name, last_name FROM employee;`, function (err, results) {
        employees = results.map(r => `${r.first_name} ${r.last_name}`);
    });
    db.query(`SELECT name FROM department;`, function (err, results) {
        departments = results.map(d => d.name);
    });
}
dataInit();


function questionInit() {
    const questionInit = [
        {
            type: 'list',
            message: '',
            choices: ["View all Departments", "View all Roles",
                "View all Employees", "Add a Department", "Add a Role",
                "Add an Employee", "Update Employee Role"],
            default: "View all Departments",
            name: 'selection',
        }];
    inquirer
        .prompt(questionInit).then((initData) => {
            if (initData.selection === "View all Departments") {
                logDepartmentResults(initData.selection);
            } else if (initData.selection === "View all Roles") {
                logRoleResults(initData.selection);
            } else if (initData.selection === "View all Employees") {
                logEmployeeResults(initData.selection);
            } else if (initData.selection === "Add a Department") {
                addDepartmentPrompt(initData.selection);
            } else if (initData.selection === "Add a Role") {
                addRolePrompt(initData.selection);
            } else if (initData.selection === "Add an Employee") {
                addEmployeePrompt(initData.selection);
            } else if (initData.selection === "Update Employee Role") {
                updateEmployeeRolePrompt(initData.selection);
            }
        });
}
questionInit();

function logRoleResults() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table("Roles", results);
        questionInit();
    });
}
function logEmployeeResults() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table("Employees", results);
        questionInit();
    });
}
function logDepartmentResults() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table("Departments", results);
        questionInit();
    });
}
function addDepartmentPrompt() {
    const addDepartmentQ = [{
        type: "input",
        message: "Enter Department Name:",
        name: "dep_name"
    }];
    inquirer.prompt(addDepartmentQ).then((data) => {
        addDepartment(data);
        questionInit();
    });
}
function addRolePrompt() {
    db.query(`SELECT name, id FROM department;`, function (err, results) {
        departments = results.map(d => d.name)
    });
    const addRoleQ = [{
        type: "input",
        message: "Enter Role Title:",
        name: "title"
    }, {
        type: "input",
        message: "Enter Role Salary:",
        name: "salary"
    }, {
        type: "list",
        message: "Select The Department:",
        choices: departments,
        name: "dep"
    }];
    inquirer.prompt(addRoleQ).then((data) => {
        addRole(data);
        questionInit();
    });
}
function addEmployeePrompt() {
    db.query(`SELECT title FROM roles;`, function (err, results) {
        roles = results.map(r => r.title)
    });
    const addEmployeeQ = [{
        type: "input",
        message: "Enter First Name:",
        name: "first_name"
    }, {
        type: "input",
        message: "Enter Last Name:",
        name: "last_name"
    }, {
        type: "list",
        message: "Select Role:",
        choices: roles,
        name: "role"
    }, {
        type: "list",
        message: "Select Employee Manager:",
        choices: ["IT", "Small-Packaging", "Large-Production"],
        name: "emp_manager"
    }];
    inquirer.prompt(addEmployeeQ).then((data) => {
        addEmployee(data);
        questionInit();
    });
}
function updateEmployeeRolePrompt() {
    db.query(`SELECT title FROM roles;`, function (err, results) {
        roles = results.map(r => r.title);
    });
    const updateEmployeeRoleQ = [{
        type: "input",
        message: "Enter Employee First Name:",
        name: "first_name"
    }, {
        type: "input",
        message: "Enter Employee Last Name:",
        name: "last_name"
    }, {
        type: "list",
        message: "Choose a new Role:",
        choices: roles,
        name: "role"
    }];
    inquirer.prompt(updateEmployeeRoleQ).then((data) => {
        console.log("updateEmp", data);
        updateEmployeeRole(data);
        questionInit();
    });
}

module.exports = {questionInit, updateEmployeeRolePrompt};