const express = require('express');
const bodyParser  = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/ngApp')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/*app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });*/
app.use('/api',api);

app.get('*', (req, res) =>{
	res.sendFile(path.join(__dirname, 'dist/ngApp/index.html'));
})

app.listen(3000, function(){
	console.log('server is running on ... '+ 3000);
});
/*var server = require('http').createServer(app);

server.listen(3000, function() {
    console.log('Listening on port ' + 3000);
});*/

/*var server = require('http').createServer(app);
server.listen(4200, function() {
    console.log('Listening on port ' + 4200);
});*/