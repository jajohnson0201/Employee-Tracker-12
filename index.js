const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // MySQL password
        password: '',
        database: 'dept_db'
    },
    console.log(`Connected to the dept_db database.`)
);
const {addDepartment, addRole, addEmployee, updateEmployeeRole} = require('./server');


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
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
    });
}
function logEmployeeResults() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
    });
}
function logDepartmentResults() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
    });
}
function addDepartmentPrompt(selection) {
    const addDepartmentQ = [{
        type: "input",
        message: "Enter Department Name:",
        name: "dep-name"
    }];
    inquirer.prompt(addDepartmentQ).then((data) => {
        addDepartment(data)
        questionInit();
    })
}
function addRolePrompt(selection) {
    const addRoleQ = [{
        type: "input",
        message: "Enter Role Title:",
        name: "title"
    }, {
        type:"input",
        message:"Enter Role Salary:",
        name:"salary"
    }, {
        type:"list",
        message:"Select The Department:",
        choices: [],
        name:"dep"
    }]
    inquirer.prompt(addRoleQ).then((data) => {
        addRole();
        questionInit();
    })
}
function addEmployeePrompt(selection) {
    const addEmployeeQ = [{
        type: "input",
        message: "Enter First Name:",
        name: "fname"
    }, {
        type:"input",
        message:"Enter Last Name:",
        name:"lname"
    }, {
        type:"list",
        message:"Select Role:",
        choices: [],
        name:"role"
    }, {
        type:"list",
        message:"Select Employee Manager:",
        choices: [],
        name:""
    }]
    inquirer.prompt(addEmployeeQ).then((data) => {
        addEmployee(data);
        questionInit();
    })
}
function updateEmployeeRolePrompt(selection) {
    const updateEmployeeRoleQ = [{
        type: "input",
        message: "Enter Employee First Name:",
        name: "Firstname"
    },{
        type: "input",
        message: "Enter Employee Last Name:",
        name: "Lastname"
    },{
        type:  "list",
        message: "Choose a Role:",
        choices: [],
        name: "role"
    }]
    inquirer.prompt(updateEmployeeRoleQ).then((data) => {
        updateEmployeeRole(data);
        questionInit();
    })
}
