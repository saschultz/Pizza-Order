//Back-End Logic:
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.cost = 0;
}
Pizza.prototype.calculateCost = function() {
  if (this.size === "small") {
    this.cost = "$8";
  } else if (this.size === "medium") {
    this.cost = "$10";
  } else if (this.size === "large") {
    this.cost = "$12";
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
    $("#cost").text(newPizza.cost);
  });
});
