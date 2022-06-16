var express = require('express');
var app = express();
var route=require('./controller/route.js');//route
app.use(route);
app.set('view engine','ejs');
app.set('views','views');
app.listen(3000,()=>{
  console.log("Server is successfully at 3000");
});