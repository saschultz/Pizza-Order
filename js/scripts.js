//Back-End Logic:
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.total = 0;
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
//Front-End Logic:
$(document).ready(function() {
  $("#pizza-order").submit(function(e) {
    e.preventDefault();
    var toppingsArray = [];
    var inputSize = $("input:radio[name=size]:checked").val();
    $("input:checkbox[name=toppings]:checked").each(function(){
      var inputToppings = $(this).val();
      toppingsArray.push(inputToppings);
    });
    var newPizza = new Pizza(inputSize, toppingsArray);
    newPizza.calculateCost();
    if (newPizza.total > 0) {
      $("#cost").text("Thanks for your Order! Your total comes to $" + newPizza.total);
    } else {
      $("#cost").text("Your total comes to $" + newPizza.total + " because you didn't select any options. Please select a crust and toppings so we can build your pizza!");
    }

    // $("#cost").text("Thanks for your Order! Your total comes to $" + this.total + "because you didn't select any options.");
  });
});
