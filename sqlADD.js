const mysql = require('mysql2');
const {questionInit, updateEmployeeRolePrompt} = require("./index");
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // MySQL password
        password: 'chicken',
        database: 'dept_db'
    },
);

function addDepartment(data) {
    db.query(` 
    INSERT INTO department(name) 
    VALUES(?);`, data.dep_name);
    questionInit();
}
function addRole(data) {
    const param = [data.title, parseInt(data.salary), data.dep];
    db.query(`
    INSERT INTO role(title,salary,department_id) 
    VALUES(?,?,?);`, param);
    questionInit();
}
function addEmployee(data) {
    let man = '';
    if (data.emp_manager === "IT"){
        man = data.emp_manager;
    } else if (data.emp_manager === "Small-Packaging"){
        man = data.emp_manager;
    } else if (data.emp_manager === "Large-Production"){
        man = data.emp_manager;
    }
    const param = [data.first_name, data.last_name, data.role, man];
    db.query(`
    INSERT INTO employee(first_name,last_name,role_id,manager_id) 
    VALUES(?,?,?,?);`, param);
    questionInit();
}
function updateEmployeeRole(data) {
    let roles = [];
    let ids = [];
    let first = [];
    let last = [];
    let empRole = [];
    let role = '';
    let TorF = '';
    db.query(`SELECT title, id FROM roles;`, function (err, results) {
        roles = results.map(r => r.title);
        ids = results.map(e => e.id);
    });
    db.query(`SELECT first_name, last_name FROM, role_id employee;`, function (err, results) {
        first = results.map(r => r.first_name);
        last = results.map(e => e.last_name);
        empRole = results.map(a => a.role_id);
    });
    for(const i = 0; i > first.length; i++){
        if(data.first_name === first[i]){
            TorF = true ; 
            role = empRole[i];
        }
    }
    for(const i = 0; i > last.length; i++){
        if(data.last_name === last[i]){
            TorF = true ; 
        }
    }
    const param = [role,data.first_name];
    if(TorF){
    db.query(`
    UPDATE employee SET role_id = ? WHERE first_name = ?`, param);
    console.log("Complete!");
} else {
    console.log("Choose a valid employee!");
    updateEmployeeRolePrompt();
}
    questionInit();
}
module.exports = { addDepartment, addRole, addEmployee, updateEmployeeRole };