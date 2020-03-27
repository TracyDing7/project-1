$(document).ready(function() {
    //test sending calls


    //create ajax event listener that initiates the call call with the single ingredient lookup
    //return name, thumbnail

    var queryUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

    $("#gin").on("click", function(){
        console.log("gin selected");
        //hard coded for now

        $.ajax({
            url: queryUrl + "gin",
            method: "GET"
        }) .then(function(response){
            console.log(response);
            console.log(response.drinks[0]);
            for (let i = 0; i < 4; i++){
                $("#drink-display").append(`<img src="${response.drinks[i].strDrinkThumb}">`);
            }
        })

    })



})