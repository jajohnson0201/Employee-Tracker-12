const mysql = require('mysql2');
const questionInit=require("./index");
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
        VALUES(?);`,data.dep_name)        
}
function addRole(data) {
    console.log(data);
    const param = [data.title,parseInt(data.salary),data.dep]
    console.log(param)
    db.query(`
    INSERT INTO role(title,salary,department_id) 
    VALUES(?,?,?);`,param)    
}
function addEmployee(data) {
    return db.query(`
    INSERT INTO employee(first_name,last_name,manager_id) 
    VALUES(${data.first_name},${data.last_name},${data.role}, ${data.emp_manager});`,
    function (err, results) {
        console.log(results);
    });
}
function updateEmployeeRole(data) {
    return db.query(`
    INSERT INTO role(first_name,last_name,role_id) 
    VALUES(${data.first_name},${data.last_name},${data.role});`,
    function (err, results) {
        console.log(results);
    });
}
 module.exports={addDepartment, addRole, addEmployee, updateEmployeeRole};