$(document).ready(function() {
  // Getting a reference to the input field where user adds a new burger
  let $newItemInput = $("textarea.new-item");
  // Our new burgers will go inside the burgerContainer
  let $burgerContainer = $(".burger-container");
  // Adding event listeners for deleting, editing, and adding burgers
  $(document).on("click", "button.delete", deleteBurger);
  $(document).on("submit", insertBurger);

  // Our initial burgers array
  let burgers = [];

  // Getting burgers from database when page loads
  getBurgers();

  // This function resets the burgers displayed with new burgers from the database
  function initializeRows() {
    $burgerContainer.empty();
    let rowsToAdd = [];
    for (let i = 0; i < burgers.length; i++) {
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    $burgerContainer.prepend(rowsToAdd);
  }

  // This function grabs burgers from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  // This function deletes a burger when the user clicks the delete button
  function deleteBurger(event) {
    event.stopPropagation();
    let id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    }).then(getBurgers);
  }

  // This function inserts a new burger into our database and then updates the view
  function insertBurger(event) {
    event.preventDefault();
    let burger = $newItemInput.val().trim();
    console.log(burger);
    $.post("/api/burgers", burger, getBurgers);
    $newItemInput.val("");
  }

  // This function constructs a burger-item row
  function createNewRow(burger) {
    let $newInputRow = $(
      [
        "<li class='list-group-item burger-item'>",
        "<span>",
        burger.burgername,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        // "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>Devour!</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", burger.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("burger", burger);
    if (burger.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }
});
