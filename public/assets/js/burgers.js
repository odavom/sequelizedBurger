// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
      
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      let burgerName = $("#addBurger").val().trim();
      if(burgerName != "") {
      
      let newBurger = {
        name: burgerName,
        devoured: false
        
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    }
    else{
      alert("Please Enter the Burger Name!");
    }
    });

    $(".devourB").on("click", function(event) {
      
      
      let id = $(this).data("id");
      let isDevoured = {
          devoured: true
      }
      console.log("id for updating" + id);
      // Send the PUT request.
      $.ajax("/api/devourBurger/" + id, {
        type: "PUT",
        data: isDevoured 
      }).then(
        function() {
          console.log("updated");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    $(".deleteB").on("click", function(event) {
      let id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/delBurger/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted Burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
});