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
inquirer.prompt()
}
function rolesVPrompt(selection) {

}
function employeesVPrompt(selection) {

}
function addRolePrompt(selection) {

}
function addEmployeePrompt(selection) {

}
function updateEmployeeRolePrompt(selection) {

}
