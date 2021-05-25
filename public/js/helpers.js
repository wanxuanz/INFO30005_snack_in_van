const thirty_mintues = 1800000
const fifteen_mintues = 900000
var register = function(Handlebars) {
    var helpers = {
        checkTime: function (dateUTC) { 
            var orderDate = new Date(dateUTC)
            var now = new Date()
            var diff = now - orderDate;
            if(diff > thirty_mintues){
                return false
            }else{
                return true
            }
		},
    };
  
    if (Handlebars && typeof Handlebars.registerHelper === "function") {
      for (var prop in helpers) {
          Handlebars.registerHelper(prop, helpers[prop]);
      }
    } else {
        return helpers;
    }
  
  };
  
  // export helpers to be used in our express app
  module.exports.register = register;
  module.exports.helpers = register(null);    