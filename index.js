const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "Jesse2020!",
    database: "employeeDB",
  });

function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "userInput",
            message: "What would you like to do?",
            choices: [
                "View All Employees?", 
                "View All Employees by Department?",
                "View all Employees by Role?", 
                "Update Employee",
                "Add Employee?",
                "Add Role?",
                "Add Department?",
                "Delete Employee",
                "Delete Department",
                "Delete Role",
                "Quit"
              ]
        }
    ]).then((res) => {
        switch (res.userInput) {
            case "View All Employees?":
            allEmployees();
            break;

            case "View All Employees by Department?":
            employeesByDept();
            break;

            case "View all Employees by Role?":
            employeesByRole();
            break;

            case "Update Employee":
            updateEmployee();
            break;

            case "Add Employee?":
            addEmployee();
            break;

            case "Add Role?":
            addRole();
            break;

            case "Add Department?":
            addDept();
            break;

            case "Delete Employee":
            deleteEmp();
            break;

            case "Delete Department":
            deleteDept();
            break;

            case "Delete Role":
            deleteRole();
            break;

            case "Quit":
            quit();
            break;
        }
    })
}

// function to return all employees
function allEmployees() {
    connection.query('select * from employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    })
}

// function to return employees by dept
function employeesByDept() {
    connection.query('select employee.firstName, employee.lastName, department.name AS Department FROM employee JOIN employeerole ON employee.roleid = employeerole.id JOIN department ON employeerole.departmentid = department.id ORDER BY department.name', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    })
}

// function to return employees by role
function employeesByRole() {
    connection.query('select employee.firstName, employee.lastName, employeerole.title AS Role FROM employee JOIN employeerole ON employee.roleid = employeerole.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    })
}

// function to update a current employee
function updateEmployee() {
        inquirer.prompt([
            {
            name: 'lastName',
            message: 'What is the employees last name?',
            type: 'input'
            },
            {
            name: 'firstName',
            message: 'What is the employees first name?',
            type: 'input'
            },
            {
            name: 'id',
            message: 'What is the employees ID?',
            type: 'input'
            },
            {
            name: 'role',
            message: 'Update employees Role ID (1:HR, 2:Engineering, 3:Accounting, 4:Sales):',
            type: 'input'
            }
        ]).then((res) => {
            connection.query('update employee set ? where ?', [{LastName: res.lastName, FirstName: res.firstName, RoleID: res.role}, {id: res.id}], (err, res) => {
                if (err) throw err;
                allEmployees();
            })

        })
        
}


// function to add employee to database
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter new employees first name:",
        name: "firstName",
      },
      {
        type: "input",
        message: "Enter new employees last name:",
        name: "lastName",
      },
      {
        type: "input",
        message: "Enter new employees roleID (1:HR, 2:Engineering, 3:Accounting, 4:Sales):",
        name: "Role",
      },
      {
        type: "input",
        message: "Enter new employees managerID:",
        name: "managerID",
      },
    ])
    .then((res) => {
      connection.query("insert into employee set ?", [{FirstName: res.firstName, LastName: res.lastName, RoleID: res.Role, ManagerID: res.managerID}], (err, res) => {
        if (err) throw err;
        allEmployees();
      });
    });
}

// function to add role to existing employee
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the title of new role:",
            name: "title"
        },
        {
            type: "input",
            message: "Enter the salary of new role:",
            name: "salary"
        },
        {
            type: "input",
            message: "Enter the department ID of new role:",
            name: "deptid"
        },
    ]).then((res) => {
        connection.query('insert into employeerole set ?', [{Title: res.title, Salary: res.salary, DepartmentID: res.deptid}], (err, res) => {
            if (err) throw err;
            allRoles();
        })
    })
}

// function to add a department to database
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the new department:',
            name: 'dept'
        }
    ]).then((res) => {
        connection.query('insert into department set ?', [{Name: res.dept}], (err, res) => {
        console.table(res)
        startApp();
        });
    })
    
}

// displays all roles after adding a role
function allRoles() {
    connection.query('select * from employeerole', (err, res) => {
        console.table(res);
        startApp();
    })
}

function deleteEmp() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the id of the employee you would like to delete:',
            name: 'id'
        }
    ]).then((res) => {
        connection.query('delete from employee where ?', [{id: res.id}], (err, res) => {
            if (err) throw err;
            console.log('Employee successfully deleted, updated table shown below.');
            allEmployees();
        })
    })
}

function deleteDept() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the department you would like to delete:',
            name: 'name'
        }
    ]).then((res) => {
        connection.query('delete from department where ?', [{name: res.name}], (err, res) => {
            if (err) throw err;
            console.log('Department successfully deleted, update table below')
            allDept();
        })
    })
}

function allDept() {
    connection.query('select * from department', (err, res) => {
        console.table(res);
        startApp();
    })
}

function deleteRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the role you would like to delete:',
            name: 'title'
        }
    ]).then((res) => {
        connection.query('delete from employeerole where ?', [{Title: res.title}], (err, res) => {
            allRoles();
        })
    })
}

function quit() {
    connection.end();
    console.log('Thank you for using our CLI, have a nice day!')
    process.exit();
    
  }


startApp();