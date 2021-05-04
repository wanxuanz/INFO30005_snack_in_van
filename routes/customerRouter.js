 // routes/index.js
 var express = require('express');
 var customerRouter = express.Router();

 const customerController = require('../controllers/customerController.js')
 /* /根路径 跳转至login.html */
 customerRouter.get('/login', function(req, res, next) {
   res.render('login')
    //res.sendfile('./views/login.html'); 
 });

  
 customerRouter.post('/login', (req, res) => customerController.getOneCustomer(req, res))
 

 customerRouter.get('/register', function (req, res) {
     res.render('register');
 });

customerRouter.post('/register', (req, res) => customerController.addOneCustomer(req, res))

  
 module.exports = customerRouter;