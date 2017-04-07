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
    // newPizza.costToppings();
    console.log(newPizza.toppings);
    $("#cost").text("Order Total: $" + newPizza.total);
  });
});
