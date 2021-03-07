insert into department (name)
values ("Human Resources"), ("Engineering"), ("Accounting"), ("Sales");

insert into employeeRole (Title, Salary, DepartmentID)
values ("Manager", 80000.00, 1), ("Engineer", 65000.00, 2), ("Accountant", 60000.00, 3), ("Sales Rep", 50000.00, 4);

insert into employee (FirstName, LastName, RoleID, ManagerID)
values ("Billy", "Smith", 1, 20), ("Dave", "Davidson", 2, 45), ("Marshall", "Mathers", 3, 34), ("Chris", "Cornell", 4, 76),
