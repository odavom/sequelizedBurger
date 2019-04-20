
let express = require('express');
let router = express.Router();

// importing to use it's database functions
let burger = require('../models/burger.js');
// made reference to burger.js in models folder and call burger.all passing burger_data
// calling burger.all within burger.js calling orm.all with orm.js fiel because server.js is call all this

router.get('/', function(req, res) {
    burger.all(function(data) {
        let burgerObject = {
            burger: data
        };
        console.log(burgerObject);
        res.render('index', burgerObject)
    });
});

router.post("/api/burgers", function(req, res) {
    console.log(req.body);
    burger.create(["burger_name"], [req.body.name], function(result) {
      
        // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });

router.put('/api/devourBurger/:id', function(req, res) {
    let condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    burger.update(
        {
            devoured: true
        },
        condition,
        function(result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

router.delete('/api/delBurger/:id', function(req, res) {
    let condition = 'id = ' + req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});



// router.get('/', function(req, res) {
//     burger.all(function(burger_data) {
//         console.log(burger_data); 
//         res.render('index', {burger_data}); 
//     });
// });

// router.put('/burgers/update', function(req, res) {
//     burger.update(req.body.burger_id, function(result){
//         console.log(result);
//         res.redirect('/');
//     });
// });

// router.put('/burgers/:id', function(req, res) {
//     let condition = 'id = ' + req.params.id;

//     burger.update({
//         devoured: true
//     }, condition, function(data) {
//         res.redirect('/');
//     });
// });

// this is needed so it can be use by other files particularly the server.js
module.exports = router;