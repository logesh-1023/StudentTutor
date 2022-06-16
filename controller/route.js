var express = require('express'); 
var route = express();
route.use(express.urlencoded({extended: false}));
var connection=require('../model/db.js');// sql
var bcrypt=require('bcryptjs');
route.use(express.static('public')); //css
var tutoremail;
route.get('/signup',function(req,res){
    res.render('signup');
  }); 
route.get('/',function(req,res){
  a=0,b=0;
   res.render('login',{msg:""});
});
route.get('/dashboardadmin',function(req,res){
    res.render('dashboardadmin',{ms:""});
});
route.get('/remove',function(req,res){
  res.render('remove',{ms:""});
});
route.post('/requesttutor',function(req,res){
  var stu=req.body.tname;
  var em=req.body.sname;
  var pa=req.body.lname;
  connection.query("select * from student where email=(?)",[tutoremail],(err,ress)=>{
    var name=ress[0].name;
    var ph=ress[0].phone_no;
    connection.query("insert into noti values((?),(?),(?),(?),(?),(?))",[name,tutoremail,ph,stu,pa,em],(err,re)=>{
      if(err) throw err;
      let s1="Select * from subjects";
      connection.query(s1,(err,r)=>{
      res.render('dashboard',{msg:r});
    })
  })
})
});
route.post('/removesub',function(req,res){
  var sub=req.body.sub;
    connection.query("delete from subjects where email=(?) and subjects=(?)",[tutoremail,sub],(err,results)=>{
      if (err) throw (err) 
      else{
        res.render('remove',{r:"removed successfully"});
      }
    })
});
route.get('/noti',function(req,res){
  connection.query("select * from tutor where email=(?)",[tutoremail],(err,ress)=>{
    tutorname=ress[0].name;
    connection.query("select sname,semail,tsub from noti where tname=(?)",[tutorname],(err,results)=>{
    
      if (err) throw (err)
      else
      {
        res.render('noti',{r:results});
      }
    })
})
});
route.post('/validatelogin',function(req,res){
  var stu=req.body.but;
  var em=req.body.email;
  var pa=req.body.pass;
  if(stu==0)
  {
    connection.query("select email from student where email=(?)",[em],(err,results)=>{
      if (err) throw (err)
      else if(results.length>0){
        connection.query("select * from student where email=(?)",[em],async function(err,results1){
          let x=await bcrypt.compare(pa,results1[0].password);
          Boolean(x);
          if (err) throw (err)
          else if(results1.length>0 && x){
            let s1="Select * from subjects";
            connection.query(s1,(err,r)=>{
              tutoremail=em;
                    res.render('dashboard',{msg:r});
            });
          }
          else{
            res.render('login',{msg:"Wrong email and password"});
          }
        })
      }
      else{
        res.render('login',{msg:"The email is not found"});
      }
    })
  }
  else if(stu==1)
  {
    connection.query("select email from tutor where email=(?)",[em],(err,results)=>{
      if (err) throw (err)
      else if(results.length>0){
        connection.query("select * from tutor where email=(?)",[em],async function(err,results1){
          let x=await bcrypt.compare(pa,results1[0].password);
          Boolean(x);
          if (err) throw (err)
          else if(results1.length>0 && x){
            tutoremail=em;
                res.render('dashboardadmin',{ms:""});
          }
          else{
            res.render('login',{msg:"Wrong email and password"});
          }
        })
      }
      else{
        res.render('login',{msg:"The email is not found"});
      }
    })
  }
})
route.post('/submit',async function(req,res){
    var fn=req.body.fname;
    var ln=req.body.lname;
    var email=req.body.email;
    var pn=req.body.phone;
    var pa=await bcrypt.hash(req.body.pass,10);
    var stu=req.body.but;
    if(stu=='0')
    {
      connection.query("insert into student values((?),(?),(?),(?),(?))",[fn,ln,email,pn,pa],(err,results)=>{
        if (err) throw (err)
        else{
          //console.log(results);
          res.render('login',{msg:"details are inserted successfully"});
        }
      });
    }
    else if(stu=='1')
    {
      connection.query("insert into tutor values((?),(?),(?),(?),(?))",[fn,ln,email,pn,pa],(err,results)=>{
        if (err) throw (err)
        else{
          //console.log(results);
          res.render('login',{msg:"details are inserted successfully"});
        }
      });
  
    }
});
  route.post('/validatedashadmin',function(req,res){

      var bi=req.body.bid;
      connection.query("select name,location from tutor where email=(?)",[tutoremail],(err,ress)=>{
        var name=ress[0].name;
        var location=ress[0].location;
            connection.query("insert into subjects values((?),(?),(?),(?))",[name,location,tutoremail,bi],(err,results)=>{
              if (err) throw (err)
              else{
                
                res.render('dashboardadmin',{ms:"Details are inserted"});
              }
            })
          })
      });
module.exports=route;