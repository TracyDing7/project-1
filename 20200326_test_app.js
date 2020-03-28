$(document).ready(function () {
    //test sending calls


    //create ajax event listener that initiates the call call with the single ingredient lookup
    //return name, thumbnail

    var queryUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

    $("#gin").on("click", function () {
        console.log("gin selected");
        //hard coded for now
        //work on getting a nice display and then figure out how best to dry out this code

        //so to try out the code what I want to do is
        //capture var alcohol
        //get the alcohol value from the button clicked
        //drop this variable in the ajax call for url

        $.ajax({
            url: queryUrl + "gin",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.drinks[0]);
            for (let i = 0; i < 4; i++) {
                $("#drink-display").append(`<img src="${response.drinks[i].strDrinkThumb}">`);
                var drinkName = response.drinks[i].strDrink;
                console.log(drinkName);
                $("#drink-display").append(`<p class="drink-name">Drink Name: ${drinkName}</p>`);

            }
        })

    })



})