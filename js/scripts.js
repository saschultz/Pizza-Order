//Back-End Logic:
function Pizza(name, size, toppings) {
  this.name = name;
  this.size = size;
  this.toppings = toppings;
  this.address = [];
  this.total = 0;
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

Pizza.prototype.calculateCost = function() {
  if (this.size === "small") {
    this.total = 8;
  } else if (this.size === "medium") {
    this.total = 10;
  } else if (this.size === "large") {
    this.total = 12;
  }
  for(var i=0; i<=this.toppings.length; i++) {
    if (this.toppings[i] === "daiya") {
      this.total += 1;
    } else if (this.toppings[i] === "sauce") {
      this.total += 2;
    } else if (this.toppings[i] === "protein") {
      this.total += 2;
    } else if (this.toppings[i] === "extra-toppings") {
      this.total += 1;
    }
  }
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}
//Front-End Logic:
$(document).ready(function() {

  $("#delivery").click(function() {
    $("#delivery-form").show();
    $("#delivery-form").append('<div class="delivery-form">' +
                              '<h5>Enter the delivery address:</h5>' +
                             '<div class="form-group">' +
                               '<label for="new-street">Street</label>' +
                               '<input type="text" class="form-control new-street" required>' +
                             '</div>' +
                             '<div class="form-group">' +
                               '<label for="new-city">City</label>' +
                               '<input type="text" class="form-control new-city" required>' +
                             '</div>' +
                             '<div class="form-group">' +
                               '<label for="new-state">State</label>' +
                               '<input type="text" class="form-control new-state" required>' +
                             '</div>' +
                           '</div>');
      $("#delivery, p").hide();
    });

  $("form#pizza-order").submit(function(e) {
    e.preventDefault();

    var toppingsArray = [];
    var inputSize = $("input:radio[name=size]:checked").val();
    $("input:checkbox[name=toppings]:checked").each(function(){
      var inputToppings = $(this).val();
      toppingsArray.push(inputToppings);
    });
    var inputName = $("input#name").val();

    var newPizza = new Pizza(inputName, inputSize, toppingsArray);
    newPizza.calculateCost();

    $(".delivery-form").each(function() {

      var newPizza = new Pizza(inputName, inputSize, toppingsArray);
      var inputStreet = $(this).find("input.new-street").val();
      var inputCity = $(this).find("input.new-city").val();
      var inputState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputStreet, inputCity, inputState)
      newAddress.fullAddress();
      newPizza.address.push(newAddress)
      $("#delivery-return").append("Delivery address: " + newAddress.fullAddress())
    });

    $("#cost").text("Thanks, " + newPizza.name + "! " + "Your order has been received. " + "Your total will be $" + newPizza.total);
  });
});
