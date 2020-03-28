$(document).ready(function () {

    var queryUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

//change onclick from $("#gin").on("click" to : 
    $(".alcohol").on("click", function () {
        console.log("alcohol selected");

        var alcohol = $(this).attr("value");
        console.log(alcohol);

        $.ajax({
            url: queryUrl + alcohol,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.drinks[0]);
            for (let i = 0; i < 5; i++) {
                var drinkName = response.drinks[i].strDrink;
                console.log(drinkName);
                $("#drink-display").append(`<p class="drink-name">Drink Name: ${drinkName}</p>`);

                $("#drink-display").append(`<img class="drink-image" src="${response.drinks[i].strDrinkThumb}">`);
            }
        })

    })



})