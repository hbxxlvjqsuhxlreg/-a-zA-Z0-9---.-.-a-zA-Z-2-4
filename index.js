const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('ejs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
var result = 0;

app.get('/',(req,res)=>{
  res.render('index',{result: result})
});

app.post('/calculate',(req,res)=>{
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  var operation = req.body.operation;
  var a = Number(num1);
  var b = Number(num2);
   if(operation === '+'){
     result= a + b;
   }
   if(operation === '-'){
    result= a - b;
  }
  if(operation === '*'){
    result= a * b;
  }
  if(operation === '/'){
    result= a / b;
  }
   res.redirect('/');
})
app.listen(3000, ()=>{
  console.log("Listening to port 3000")
})
#oh no the port
