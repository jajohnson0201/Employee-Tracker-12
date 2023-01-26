const inquirer = require('inquirer');
const fs = require('fs');

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
                departmentVPrompt(initData.selection);
            } else if (initData.selection === "View all Roles") {
                rolesVPrompt(initData.selection);
            } else if (initData.selection === "View all Employees") {
                employeesVPrompt(initData.selection);
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


function departmentVPrompt(selection) {
    const departmentVQ = [{
        type: "input",
        message: "",

    }]
    inquirer.prompt().then(() => {

        questionInit();
    })
}
function rolesVPrompt(selection) {
    inquirer.prompt().then(() => {

        questionInit();
    })
}
function employeesVPrompt(selection) {
    inquirer.prompt().then(() => {

        questionInit();
    })
}
function addDepartmentPrompt(selection) {
    const addDepartmentQ = [{
        type: "input",
        message: "Enter Department Name:",
        name: "dep-name"
    }];
    inquirer.prompt(addDepartmentQ).then(() => {

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
    inquirer.prompt(addRoleQ).then(() => {

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
    inquirer.prompt(addEmployeeQ).then(() => {

        questionInit();
    })
}
function updateEmployeeRolePrompt(selection) {
    const updateEmployeeRoleQ = [{
        type: "input",
        message: "Enter Employee:",
        name: "emp-name"
    },{
        type:  "list",
        message: "Choose a Role:",
        choices: [],
        name: "role"
    }]
    inquirer.prompt(updateEmployeeRoleQ).then(() => {

        questionInit();
    })
}
