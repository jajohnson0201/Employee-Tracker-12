const mysql = require('mysql2');
const { brotliDecompress } = require('zlib');
const { updateEmployeeRolePrompt } = require("./index");
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // MySQL password
        password: 'chicken',
        database: 'dept_db'
    },
);
// adds a department to the database.
function addDepartment(data) {
    db.query(` 
    INSERT INTO department(name) 
    VALUES(?);`, data.dep_name);
    console.log("Department Added!");
}
// adds a role to the database.
function addRole(data) {
    let dep = 0;
    if (data.dep === "IT") {
        dep = 1;
    } else if (data.dep === "Small-Packaging") {
        dep = 2;
    } else {
        dep = 3;
    }
    const param = [data.title, parseFloat(data.salary), dep];
    db.query(`
    INSERT INTO roles (title,salary,department_id) 
    VALUES(?,?,?);`, param);
}
// adds an employee to the database.
async function addEmployee(data) {
    let role;
    const results = await db.promise().query(`SELECT id, title FROM roles;`
    );
    console.log(results[0]);
    const dbResults = results[0];
    console.log(dbResults.length);
    for (let i = 0; i < dbResults.length; i++) {
        if (data.role === dbResults[i].title) {
            role = dbResults[i].id;
        }
    }
    console.log(role);
    console.log(data);
    let man = '';
    if (data.emp_manager === 'IT') {
        man = 1;
    } else if (data.emp_manager === "Small-Packaging") {
        man = 2;
    } else if (data.emp_manager === "Large-Production") {
        man = 3;
    }
    const param = [data.first_name, data.last_name, role, man];
    console.log(param);
    try {
        db.query(`
    INSERT INTO employee(first_name,last_name,role_id,manager_id) 
    VALUES(?,?,?,?);`, param);
    } catch (err) {
        console.log(err);
    }
}
// adjusts role to employee on the database.
async function updateEmployeeRole(data) {
    let first = [];
    let last = [];
    let empRole = [];
    let role = '';
    let TorF = false;
    const results = await db.promise().query(`SELECT title, id FROM roles;`);
    console.log(results[0]);
    const dbResults = results[0];
    db.query(`SELECT first_name, last_name FROM employee;`, function (err, results) {
        first = results.map(r => r.first_name);
        last = results.map(e => e.last_name);
        empRole = results.map(a => a.role_id);
    });
    for (let i = 0; i < dbResults.length; i++) {
        if (data.role === dbResults[i].title) {
            role = dbResults[i].id;
            TorF = true;
        }
    }
    const param = [role, data.first_name];
    try {
        db.query(`
        UPDATE employee SET role_id = ? WHERE first_name = ?`, param);
    } catch (err) { console.log(err); }
}

module.exports = { addDepartment, addRole, addEmployee, updateEmployeeRole };