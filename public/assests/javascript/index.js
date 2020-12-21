$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
          $(".header").css("background" , "black");
        }
  
        else{
            $(".header").css("background" , "transparent");  	
        }
    })
  })

 function validate_form(){
    var mytextarea = document.querySelector('#mytextarea');
    var mywarning = document.querySelector('#warningLogin');
      
    var valid = true;
    if(mytextarea.value === ""){
        mywarning.innerHTML = 'Please Provide The Email-Address and Message for us';
        valid = false;
    }
    return valid;
  }