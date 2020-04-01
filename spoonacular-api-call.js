/*let commonIngredients = ["tomatoes", "potatoes", "ground beef", "chicken", "turkey", "lettuce", "bread", "rice", "eggs", "cheese", "milk", "butter", "flour", "spinach", "tofu", "mushrooms", "pasta", "onion"];


//function ingredientBtn = 
for (var i = 0; i < commonIngredients.length; i++) {
  $("#btn-div").append(
    `<button class="btn btn-secondary">${commonIngredients[i]}</button>`
  );
}

$(document).on("click", ".btn-secondary", function() {
  var ingredient = $(this).val();
  console.log($(this).val());
});
*/


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
            method: 'GET'
          }).then(function(res) {
            console.log("the value of i is " + i);
            console.log(res);

            var cardInfo = (`<div class="card" style="width: 18rem;"><img class="card-img-top" src="${res.image}" alt="${res.title}"/><div class="card-body"><h5 class="card-title">${res.title}</h5><p>Total Cook Time: ${res.readyInMinutes} minutes Serves: ${res.servings}</p><a href="${res.sourceUrl}" target="_blank" class="btn btn-secondary">Submit</a></div></div>`);

            $("#recipe-results").append(`${cardInfo}`);
          });
       });

      
    });
  }
   

  $(document).on("click", ".btn-primary", function(event) {
      event.preventDefault();

     $("#recipe-results").empty(); 
    var term = $("#addIngredient").val().trim();

    console.log(term);

    getRecipeList(term);

  });