$(document).ready(function() {
  //FRANK'S RECIPE API JS
  function getRecipeList(term) {
    var endPoint = "https://api.spoonacular.com/recipes/findByIngredients?";
    var apiKey = `&apiKey=${SPOONACULAR_API}`;
    var searchTerms = `&ingredients=${term}&number=5`;
    var queryURL = endPoint + apiKey + searchTerms;
    console.log(queryURL);
    var req = {
      url: queryURL,
      method: "GET"
    };

    var results;

    $.ajax(req).then(function(ingredientResponse) {
      console.log(ingredientResponse);
      ingredientResponse.forEach(function(val, i) {
        $.ajax({
          url: `https://api.spoonacular.com/recipes/${val.id}/information?includeNutrition=false${apiKey}`,
          method: "GET"
        }).then(function(res) {
          console.log("the value of i is " + i);
          console.log(res);

          var cardInfo = `<div class="card" style="width: 18rem;"><img class="card-img-top" src="${res.image}" alt="${res.title}"/><div class="card-body"><h5 class="card-title">${res.title}</h5><p>Total Cook Time: ${res.readyInMinutes} minutes Serves: ${res.servings}</p><a href="${res.sourceUrl}" target="_blank" class="btn btn-secondary">Let's Cook!</a></div></div>`;

          $("#recipe-results").append(`${cardInfo}`);
        });
      });
    }).fail(function(error){
        console.log("First AJAX call failed: " + error.code);
    });
  }

  $(document).on("click", ".btn-primary", function(event) {
    event.preventDefault();

    $("#recipe-results").empty();
    var term = $("#addIngredient")
      .val()
      .trim();

    console.log(term);

    getRecipeList(term);
  });

  //DRINK API call and display - triggers on selection of alcohol base
  $(".alcohol").on("click", function() {
    console.log("alcohol selected");

    $("#drink-display").empty();

    var queryUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
    var alcohol = $(this).attr("value");
    console.log(alcohol);

    $.ajax({
      url: queryUrl + alcohol,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.drinks[0]);
      for (let i = 0; i < 5; i++) {
        var drinkName = response.drinks[i].strDrink;
        var drinkId = response.drinks[i].idDrink;
        var drinkImg = response.drinks[i].strDrinkThumb;
        var drinkUrl = "https://www.thecocktaildb.com/drink/" + drinkId;
        var drinkCard = `<div class="card" style="width: 18rem;"><img class="card-img-top" src="${drinkImg}" alt="${drinkName}"/><div class="card-body"><a href="${drinkUrl}" target="_blank"><h5 class="card-title">${drinkName}</h5></a></div></div>`;
        $("#drink-display").append(`${drinkCard}`);
      }
    });
  });
});
