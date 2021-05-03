// const mongoose = require("/mongoose")
// const Food = require("../models/food")
// // import customer model
// const Customer = mongoose.model("Customer")


function substraction(str){
            
  var element = document.getElementById(str);
  var text = element.textContent;
  var number =  Number(text);
  number -=  1;
  console.log("guck")
    save_quantity(number)
        // const customer = Customer.findOne({"customerId": '1001'}).lean()
        // console.log(customer)
        // customer.cart[0].quantity = number;
  if(number <= 0){
      number = 0
  }
  element.innerHTML = number
} 

function addition(str){
  var element = document.getElementById(str);
  var text = element.textContent;
  var number = Number(text);
  number += 1;
  element.innerHTML = number
}

function save_quantity(number){
  console.log("guck")
  console.log(number)
}
