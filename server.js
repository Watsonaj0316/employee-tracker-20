import inquirer from 'inquirer';
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nbayoungboy10!',
  database: 'employee_tracker_db'
});

// Function to start the application
async function start() {
  console.log('Welcome to the Employee Management System!');

  // Main menu options
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  });

  // Perform actions based on user input
  switch (action) {
    case 'View all departments':
      viewDepartment();
      break;
    case 'View all roles':
      viewRoles();
      break;
    case 'View all employees':
      viewEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }
}


// Function to view all departments
async function viewDepartment() {
  const department = await db.execute('SELECT * FROM department');
  console.table(department[0]);
  start();
}

// Function to view all roles
async function viewRoles() {
  const roles = await db.execute('SELECT * FROM roles');
  console.table(roles[0]);
  start();
}

// Function to view all employees
async function viewEmployees() {
  const employees = await db.execute('SELECT * FROM employees');
  console.table(employees[0]);
  start();
}

// Function to add a department
async function addDepartment() {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department:'
  });
  await db.execute('INSERT INTO department (name) VALUES (?)', [name]);
  console.log('Department added successfully!');
  start();
}

// Function to add a role
async function addRole() {
  // You may need to fetch department names for the user to select from
  const department = await db.execute('SELECT id, name FROM department');
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:'
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for the role:',
      choices: department[0].map(department => ({
        name: department.name,
        value: department.id
      }))
    }
  ]);
  await db.execute('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  console.log('Role added successfully!');
  start();
}

// Function to add an employee
async function addEmployee() {
  // You may need to fetch role titles and employee names for the user to select from
  const roles = await db.execute('SELECT id, title FROM roles');
  const employees = await db.execute('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees');
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role for the employee:',
      choices: roles[0].map(role => ({
        name: role.title,
        value: role.id
      }))
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select the manager for the employee:',
      choices: [{ name: 'None', value: null }, ...employees[0].map(employee => ({
        name: employee.name,
        value: employee.id
      }))]
    }
  ]);
  await db.execute('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  console.log('Employee added successfully!');
  start();
}

// Function to update an employee role
async function updateEmployeeRole() {
  // You may need to fetch employee names and role titles for the user to select from
  const employees = await db.execute('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees');
  const roles = await db.execute('SELECT id, title FROM roles');
  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to update:',
      choices: employees[0].map(employee => ({
        name: employee.name,
        value: employee.id
      }))
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the new role for the employee:',
      choices: roles[0].map(role => ({
        name: role.title,
        value: role.id
      }))
    }
  ]);
  await db.execute('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  console.log('Employee role updated successfully!');
  start();
}

// Start the application
start();

      