const mysql = require('mysql');
const express= require('express');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'appuser',
    password: 'appuser123',
    database: 'EmployeeDB',
    multipleStatements: true,
    insecureAuth : true

});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection succeded');
    else
        console.log('DB connection failed \n Error: ' + JSON.stringify(err,undefined,2));
});

app.listen(3000, ()=>console.log('Express server is running in port number: 3000'));

//Get all employees
app.get('/employees', (req,res)=> {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            Console.log(err);
    })
});

//Get an employees
app.get('/employees/:id', (req,res)=> {
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?',[req.params.id]
    , (err, rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            Console.log(err);
    })
});

//Delete an employees
app.delete('/employees/:id', (req,res)=> {
    mysqlConnection.query('Delete FROM Employee WHERE EmpID = ?',[req.params.id]
    , (err, rows,fields)=>{
        if(!err)
            res.send('Delete record sucessfully.');
        else
            Console.log(err);
    })
});

//Insert an employees
app.post('/employees', (req,res)=> {
    let emp = req.body;
    var sql = '';
    sql += 'SET @EmpId = ?;';
    sql += 'SET @Name = ?;';
    sql += 'SET @EmpCode = ?;';
    sql += 'SET @Salary = ?;';
    sql += 'CALL EmployeeAddOrEdit (@EmpId, @Name, @EmpCode, @Salary)';
    mysqlConnection.query(sql,[emp.EmpId, emp.Name, emp.EmpCode, emp.Salary]
    , (err, rows,fields)=>{
        if(!err)
         rows.forEach(element=>{
             if(element.constructor == Array)
             {
                 res.send('Inserted new employee id :' + element[0].EmpId);
             }

         });
        else
            Console.log(err);
    })
});

//Edit an employees
app.put('/employees', (req,res)=> {
    let emp = req.body;
    var sql = '';
    sql += 'SET @EmpId = ?;';
    sql += 'SET @Name = ?;';
    sql += 'SET @EmpCode = ?;';
    sql += 'SET @Salary = ?;';
    sql += 'CALL EmployeeAddOrEdit (@EmpId, @Name, @EmpCode, @Salary)';
    mysqlConnection.query(sql,[emp.EmpId, emp.Name, emp.EmpCode, emp.Salary]
    , (err, rows,fields)=>{
        if(!err){
            res.send('Updated successfully.');
        }
        else
            Console.log(err);
    })
});