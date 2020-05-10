
const express=require("express");
const bodyParser=require("body-parser");
const request = require("request");
const mongoose = require("mongoose");

const app=express();
mongoose.connect("mongodb://localhost/userdetail");
app.use(bodyParser.urlencoded({extended:true}));

let port=8000;

const  userschema = new mongoose.Schema({
  uname:String,
  umail:String,
  ucont:Number
});

const user = mongoose.model("user", userschema);

app.post('/users/:id/update_username',(req,res) =>{
  user.findOneAndUpdate({uname: req.body.usertobeupdated},{ $set: {uname:req.body.userafterupdate}}, (err,updateone) =>{
    if(err){
      console.log("error occured while deleting");
    }
    else{
      res.redirect('/users');
    }
  });
});



app.post('/users/:id/update_usermail',(req,res) =>{
  user.findOneAndUpdate({umail: req.body.usertobeupdated},{ $set: {umail:req.body.userafterupdate}}, (err,updateone) =>{
    if(err){
      console.log("error occured while deleting");
    }
    else{
      res.redirect('/users');
    }
  });
});



app.post('/users/:id/update_contact',(req,res) =>{
  user.findOneAndUpdate({ucont: req.body.usertobeupdated},{ $set: {ucont:req.body.userafterupdate}}, (err,updateone) =>{
    if(err){
      console.log("error occured while deleting");
    }
    else{
      res.redirect('/users');
    }
  });
});



app.post('/users/:id/user_delete',(req,res) =>{
  user.findOneAndDelete({uname:req.body.deleteuser},(err,deleteone) =>{
    if(err)
    {
      console.log("error occured while deleting");
    }
    else{
      res.redirect('/users');
    }
  });
});



app.get('/',(req,res) =>{
  res.render("home.ejs");
});



app.get('/users',(req,res) =>{
  user.find({},(err,arrayname) =>{
    if(err)
    {
      console.log("error occured while showing");
    }
    else
    {
      res.render("usershow.ejs",{arrayname:arrayname})
    }
  })
});



app.get('/users/new',(req,res) =>{
  res.render("signup.ejs");
});



app.post('/users/new',(req,res) =>{
  user.create({
    uname:req.body.uname,
    umail:req.body.umail,
    ucont:req.body.ucont
  },function(err, newone){
    if(err)
    {
      console.log("error occured while adding");
    }
    else
    {
      res.redirect("/users");
    }
  });
});



app.listen(port, () =>{
  console.log('Server is running at port' + port);
});
