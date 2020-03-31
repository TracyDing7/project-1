/*let commonIngredients = ["tomatoes", "potatoes", "ground beef", "chicken", "turkey", "lettuce", "bread", "rice", "eggs", "cheese", "milk", "butter", "flour", "spinach", "tofu", "mushrooms", "pasta", "onion"];


//function ingredientBtn = 
for (var i = 0; i < commonIngredients.length; i++) {
  $("#btn-div").append(
    `<button class="btn btn-secondary">${commonIngredients[i]}</button>`
  );
}
// when button is clicked take the value of button and send to search for that term
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
        results = ingredientResponse;
        for (var i = 0; i < 5; i++) {
          var id = ingredientResponse[i].id;
          var endPointLinks = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false${apiKey}`;

          
  
          $.ajax({
              url: endPointLinks,
              method: 'GET'
          }).then(function(recipeResponse) {
              console.log(recipeResponse);
      
             var idLink = recipeResponse.sourceUrl;
             //console.log(idLink);
            
              console.log(i);
              $("#recipe-results").append(`<h1><a href="${idLink}" target="_blank">${recipeResponse.title}</a></h1>`, `<img src="${recipeResponse.image}"/>`,`<h2>Ingredients: ${ingredientResponse[i].usedIngredient[i].name}</h2>`);
              $("#recipe-results").append(`Total Cook Time: ${recipeResponse.readyInMinutes} minutes`, `Serves: ${recipeResponse.servings}`); 
             
      
          });

        }
    });
  }
   

  $(document).on("click", ".btn-primary", function(event) {
      event.preventDefault();

     $("#recipe-results").empty(); 
    var term = $("#addIngredient").val().trim();

    console.log(term);

    getRecipeList(term);

  });