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

        var id = response[0].id;
        var endPointLinks = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false${apiKey}`;
        console.log(endPointLinks);

        $.ajax({
            url: endPointLinks,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
    
           var idLink = response.sourceUrl;
           console.log(idLink);
            $("#recipe-results").append(`Prep Time: ${response.preparationMinutes}`, `Total Cooking Time: ${response.cookingMinutes}`);
    
        });

      $("#recipe-results").append(`<h1>${response[0].title}</h1>`, `<img src="${response[0].image}"/>`, `<h2>"Ingredients You Need: "${response[0].missedIngredients[0].name}</h2>`);
    });
  }

 /* function getRecipeLink(id) {
    var endPointLinks = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`

    var queryURL = endPointLinks + apiKey;

    var req = {
        url: queryURL,
        method: 'GET'
    };

    $.ajax(req).then(function(response) {
        console.log(response);
        console.log(response[0].id);
        var id = response[0].id;

        var idLink = response[0].sourceUrl;
        $("#recipe-results").append(`Prep Time: ${response[0].preparationMinutes}`, `Total Cooking Time: ${response[0].cookingMinutes}`);

    });


    }*/
    

  $(document).on("click", ".btn-primary", function() {
      event.preventDefault();
    var term = $("#addIngredient").val().trim();

    console.log(term);

    getRecipeList(term);

  });