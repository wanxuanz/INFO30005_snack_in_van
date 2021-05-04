const mongoose = require("mongoose")

// import author model
const Customer = mongoose.model("customers")

// const getOneUser = async (req, res) => {    
//     var postData = {
//          username: req.body.username,
//          password: req.body.password
//      };
//      const user = await User.findOne( {"username": postData.username, "password":postData.password} ).lean()
//      console.log(user)
//      if (user === null) {   // no author found in database
//         res.status(404)
//         return res.send("user not found").lean()
//     }
//     return res.send("登陆成功")
// };    


// const getOneUser = async (req, res) => {  
//     var postData = {
//         username: req.body.username,
//         password: req.body.password
//     };
//     try {
//         const oneUser = await User.findOne({"username": postData.username, "password":postData.password})
//         console.log(postData.username)
//         if (oneUser === null) {   // no author found in database
//             res.status(404)
//             return res.send("User not found").lean()
//         }
//         return res.send(oneAuthor)  // author was found
//     } catch (err) {     // error occurred
//         res.status(400)
//         return res.send("Database query failed")
//     }
// };
     



const getOneCustomer = async (req, res) => {    
    
     const oneCustomer = await Customer.findOne({"email":req.body.email, "password":req.body.password})
     console.log(Customer.findOne({"email":req.body.email,"password":req.body.password}))
     if (oneCustomer === null) {   // no author found in database
        res.status(404)
        return res.send("Customer not found")
    }
    
    return res.render('customer',{"thiscustomer": oneCustomer.toJSON()})
};
   

const addOneCustomer = async (req, res) => {
     var postData = {
         email: req.body.email,
         password: req.body.password,
         firstName: req.body.first_name,
         lastName:req.body.last_name
     };
    const customer = new Customer(postData) // construct a new customer object from body of POST
    try {
        let result = await customer.save() // save new customer object to database
        console.log(result)
        return res.render('customer',{"thiscustomer": customer.toJSON()}) // return saved object to sender
    
    } catch (err) { // error detected
        res.status(400)
        return res.send("Database insert failed")
    }
}
  
//  userRouter.get('/userList', function (req, res) {
//     var userList = User.find({}, function (err, data) {
//         if (err) throw  err;
//         res.send(data)
//     });
// });

module.exports = {
  getOneCustomer,addOneCustomer
  }