// this imports the mysql connection
let connection = require('../config/connection.js');

function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}
// printQuestionMarks(3)

// THis will help to convert object key/value pairs to SQL syntax

function objToSql(ob) {
    let arr = [];
    // loop through keys and push the key/value as a string
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === 'string' && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";            
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}
// objToSql({name: 'lane del grey', sleep: true});

// 
let orm = {
    /* all method creates connection query and selects from table and 
    has cb to pass result into burger.js in model folder that 
    contains methods to modify orm for use with database */
    // SELECT * FROM table;
    all: function(tableInput, cb) {
        let queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            // console.log(result)
            cb(result);
        });
    },
// after this update burger.js
  // INSERT INTO table (col1, col 2, ...) VALUES (val1, val2, ...)
    create: function(table, cols, vals, cb) {
        let queryString = 'INSERT INTO ' + table;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += '); ';

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    
// example of obColVals {burger_name: Plain Burger, devoured: false}
  // UPDATE table SET col1 = val1, col2 = val2, ... WHERE condition;
    update: function(table, objColVals, condition, cb) {
        let queryString = 'UPDATE ' + table;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    delete: function(table, condition, cb) {
        let queryString = 'DELETE FROM ' + table;
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
};


// update: function(tableInput, condition, cb) {
    //     connection.query('UPDATE ' + tableInput + ' SET devoured=true WHERE id='+ condition +';', function(err,result){
    //         if (err) throw err;
    //         cb(result);
    //     });
    // },

    // export for the model burger.js
module.exports = orm;