const express = require ("express");
const path = require('path');       
const app = express()  
const fs = require('fs')   
const mongoose = require('mongoose');
// const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/ContactDance', {useNewUrlParser: true, useUnifiedTopology: true});           
const port = 80;   


// define mongoose schema 

const ContactSchema = new mongoose.Schema
({
name: String,
Email: String,
Question: String,
concern: String
  });

  const Contact = mongoose.model('contact', ContactSchema);  


//EXPRESS SPECIFIC CONFIGURATION
app.use('/static',express.static('static'));
app.use(express.urlencoded());  //This will help u to get the details of form 

//ENDPOINTS
app.get('/',(req, res)=> {
    const params = {}
    res.status(200).render('home.pug', params)});// our html demo endpoint

app.get('/contact',(req, res)=> {
    const params = {}
    res.status(400).render('contact.pug', params)});

app.post('/contact',(req, res)=> {
    const myData = new Contact(req.body);
    myData.save().then(()=>{                                           // this is to save the posted data in to items in directory
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("this item has not been saved to database")
    });                           
    })

    //START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port${port}`)
})