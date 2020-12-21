

$('.dropdown-menu li').on('click', function() {
    var getValue = $(this).text();
    $('.dropdown-select').text(getValue);
  });

  function validate_form(){
    
   var valid = true;
   var nameLaptop = document.querySelector('.name-laptop');
   var nameImage = document.querySelector('#uploaded-image');
   var nameLink = document.querySelector('.name-link');
   var price = document.querySelector('.price');
   var warningText = document.querySelector('#warning-text');

    if(nameLaptop.value === "" || nameImage.files.length === 0  || nameLink.value ==="" || price.value ==="" || isNaN(price.value) === true){
             warningText.innerHTML = "Please fill all Input Values and Give the Proper Image";
             valid= false;
    }
    console.log(valid);
   return valid;
}


