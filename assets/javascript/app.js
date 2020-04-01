$(document).ready(function () {

    //DRINK API call and display - triggers on selection of alcohol base 
    $(".alcohol").on("click", function () {
        console.log("alcohol selected");

        $("#drink-display").empty();

        var queryUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
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
                var drinkId = response.drinks[i].idDrink;
                console.log(drinkId);
                console.log(drinkName);

                var drinkUrl = "https://www.thecocktaildb.com/drink/" + drinkId;
                $("#drink-display").append(`<a class="drink-name" target="_blank" href="${drinkUrl}">${drinkName}</a>`);

                $("#drink-display").append(`<img class="drink-image" src="${response.drinks[i].strDrinkThumb}">`);
            }
        })
    })
})