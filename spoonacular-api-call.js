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
  
    $.ajax(req).then(function(response) {
        console.log(response);
        for (var i = 0; i < 5; i++) {
          var id = response[i].id;
          var endPointLinks = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false${apiKey}`;
          console.log(endPointLinks);
  
          $.ajax({
              url: endPointLinks,
              method: 'GET'
          }).then(function(response) {
              console.log(response);
      
             var idLink = response.sourceUrl;
             console.log(idLink);
             $("#recipe-results").append(`<h1><a href="${idLink}" target="_blank">${response.title}</a></h1>`, `<img src="${response.image}"/>`,`<h2>Ingredients: </h2>`);
              $("#recipe-results").append(`Total Cook Time: ${response.readyInMinutes} minutes`, `Serves: ${response.servings}`);
      
          });

        }
    });
  }
   

  $(document).on("click", ".btn-primary", function() {
      event.preventDefault();

     $("#recipe-results").empty(); 
    var term = $("#addIngredient").val().trim();

    console.log(term);

    getRecipeList(term);

  });