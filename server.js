// dependencies
let express = require('express');
// let methodOverride = require('method-override')
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');

// variables
let PORT = process.env.PORT || 9003;
let app = express();
let routes = require('./controllers/burgers_controller.js');
// give server acces to routes

// serve static content for the app 
app.use(express.static(__dirname + '/public'));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 
// app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// need to put this before you parse the json
app.use('/', routes);

app.listen(PORT, function() {
    console.log('Server listening on http://localhost:' + PORT);
})