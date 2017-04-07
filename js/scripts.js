//Back-End Logic:
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.cost = 0;
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

  });
});
