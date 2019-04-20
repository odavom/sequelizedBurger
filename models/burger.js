// require orm and contains methods to modify orm with burgers db

let orm = require('../config/orm.js')
// the object burger will call back all the ORMs
let burger = {
    // calling orm.all and inserting burgers as table and running
    // function of res ass callback which will be sent into burgers_controller file
    all: function(cb) {
        orm.all('burgers', function(res) {
            cb(res);
        });
    },
// after this update burgers_controller
    // the variables cols and vals are array
    create: function(cols, vals, cb) {
        orm.create('burgers', cols, vals, function(res) {
            cb(res);
        })
    },
    update: function(objColVals, condition, cb) {
        orm.update('burgers', objColVals, condition, function(res) {
            cb(res);
        })
    },
    delete: function(condition, cb) {
        orm.delete('burgers', condition, function(res) {
            cb(res);
        });
    },
};


// export database functions for the controller
module.exports = burger;