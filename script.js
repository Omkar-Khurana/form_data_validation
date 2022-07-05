$(document).ready(function () {
  var emailPattern = new RegExp(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/
  );
  var phoneRegex = new RegExp(/\d{3}-\d{3}-\d{4}/);
  var $registerForm = $("#reservation_form");

  $.validator.addMethod(
    "Email",
    function (value, element) {
      return this.optional(element) || emailPattern.test(value);
    },
    "Please enter a valid email address."
  );

  $.validator.addMethod(
    "Phone",
    function (value, element) {
      return this.optional(element) || phoneRegex.test(value);
    },
    "Please enter a valid Phone Number."
  );

  $.validator.addMethod("CheckDOB", function (value, element) {
    var  minDate = Date.parse("01/01/1900");  
     var today=new Date();
     var DOB = Date.parse(value);  
     if((DOB <= today && DOB >= minDate)) {  
         return true;  
     }  
     return false;  
 }, "NotValid");

 $.validator.addMethod("Password", function (value, element) {
  var pass = $("#pass").value();
  var repass = $("#repass").value();
  if(pass==repass){
    return true;
  }
  return false;
}, "NotValid");

  if ($registerForm) {
    $registerForm.validate({
      rules: {
        name: {
          required: true
        },
        date: {
          required: true,
          CheckDOB: true
        },
        email: {
          required: true,
          Email: true,
        },
        phone: {
          required: true,
          Phone: true,
        },
        pass:{
          required: true
        },
        repass:{
          required: true,
          Password: true
        }
      },
      messages: {
        name : "*Required",
        date : {
          required: "*Required",
          CheckDOB : "Invalid DOB"
        },
        email: {
          required: "*Required",
          Email: "Invalid Email"
        },
        phone:{
          required: "*Required",
          Phone: "*Invalid Phone Number"
        },
        pass:{
          required: "*Required"
        },
        repass:{
          required: "*Required",
          Password: "Password not same"
        }
      },
			errorElement : 'span'
    });
    
  }
});
