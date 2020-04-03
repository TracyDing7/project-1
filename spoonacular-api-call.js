let commonIngredients = ["tomatoes", "potatoes", "ground beef", "chicken", "turkey", "rice", "eggs", "cheese", "milk", "pasta", "onion"];
let ingredientsChecked = [];

//function ingredientBox = 
for (var i = 0; i < commonIngredients.length; i++) {
  var createCheckbox = (`<div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="inlineCheckbox${i}" value="${commonIngredients[i]}"> <label class="form-check-label" for="inlineCheckbox${i}">${commonIngredients[i]}</label></div>`);

  $("#btn-div").append(createCheckbox);  
}

$('input[type="checkbox"]').click(function(){
  if($(this).is(":checked")){
  console.log($(this).val());
  ingredientsChecked.push($(this).val());

  }
  else if($(this).is(":not(:checked)")){
  ingredientsChecked.pop($(this).val());
  }
}); 



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

            var cardInfo = (`<div class="card"><img class="card-img-top" src="${res.image}" alt="${res.title}"/><div class="card-body"><h5 class="card-title">${res.title}</h5><p>Total Cook Time: ${res.readyInMinutes} minutes Serves: ${res.servings}</p><a href="${res.sourceUrl}" target="_blank" class="btn btn-secondary">Submit</a></div></div>`);

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
    //ingredientsChecked.push(term);

    if ()
    getRecipeList(term);

  });