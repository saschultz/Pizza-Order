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
  if (this.size === "small") { //Branching establishes base price for pizza based on size
    this.total = 8;
  } else if (this.size === "medium") {
    this.total = 10;
  } else if (this.size === "large") {
    this.total = 12;
  }
  for(var i=0; i<=this.toppings.length; i++) { //Loop to check each element of the toppings array and alerter total price based off the topping's value in index.html
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
  $("#delivery").click(function() { //Below are actions that take place when "Add Address For Delivery" is clicked
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
  $("form#pizza-order").submit(function(e) { //Below are actions for when "Place Order" button is submitted
    e.preventDefault();
    var toppingsArray = []; //Array to push all checked boxes for toppings to
    var inputSize = $("input:radio[name=size]:checked").val();
    $("input:checkbox[name=toppings]:checked").each(function(){ //Retrieves value from all check boxes that are selected and pushes to empty toppings array
      var inputToppings = $(this).val();
      toppingsArray.push(inputToppings);
    });
    var inputName = $("input#name").val();
    var newPizza = new Pizza(inputName, inputSize, toppingsArray); //Creates new instance of the Pizza constructor and passes the user inputs as the arguments
    newPizza.calculateCost(); //Calls the function that calculates the cost of the pizza based off the properties in the Pizza constructor

    $(".delivery-form").each(function() { //Below are actions that happen only when adding an address for delivery
      var newPizza = new Pizza(inputName, inputSize, toppingsArray); //Allows access to new Pizza instance inside function
      var inputStreet = $(this).find("input.new-street").val(); //Retrieves the values of the appended form
      var inputCity = $(this).find("input.new-city").val();
      var inputState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputStreet, inputCity, inputState); //Creates new instance of the Address constructor and passes the user input values as parameters to function
      newAddress.fullAddress(); //Calls the fullAddress function
      newPizza.address.push(newAddress); //Pushes the new instance of Address to the array address in the Pizza constructor
      $("#delivery-return").empty(); //Empties address return before displaying delivery address
      $("#delivery-return").append("Delivery address: " + newAddress.fullAddress()); //Appends the new instance of address after it passes through the fullAddress function to return user inputs to user
    });
    $("#cost").text("Thanks, " + newPizza.name + "! " + "Your order has been received. " + "Your total will be $" + newPizza.total); //Displays the total cost of the new instance of the pizza order with the order name to the user when they click "Place Order" button
  });
});
