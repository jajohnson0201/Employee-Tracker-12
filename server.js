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

function addDepartment(data) {
    db.query(
        `USE dept_db 
        INSERT INTO department(name) 
        VALUES(${data.name});`,
        function (err, results) {
            console.log(results);
        });
}
function addRole(data) {
    db.query(`USE dept_db 
    INSERT INTO role(title,salary,department_id) 
    VALUES(${data.title},${data.salary},${data.department_id});`,
    function (err, results) {
        console.log(results);
    });
}
function addEmployee(data) {
    db.query(
    `USE dept_db 
    INSERT INTO employee(first_name,last_name,manager_id) 
    VALUES(${data.title},${data.salary},${data.department_id});`,
    function (err, results) {
        console.log(results);
    });
}
function updateEmployeeRole(data) {
    db.query(`USE dept_db 
    INSERT INTO role(first_name,last_name,role_id) 
    VALUES(${data.first_name},${data.last_name},${data.role_id});`,
    function (err, results) {
        console.log(results);
    });
}
 module.exports={addDepartment, addRole, addEmployee, updateEmployeeRole};