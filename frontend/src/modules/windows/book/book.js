$(document).ready(() => 
{
    let recipe = parent.gameuser.book;/* [
        { "item":{"name": "poção da velocidade", "icon": "assets/potions/1.png"}, "ingredients": [{"name": "Maracujá", "icon": "assets/ingredients/1.png"}, {"name": "Alface", "icon": "assets/ingredients/3.png"}, {"name": "Tomate", "icon": "assets/ingredients/4.png"}] },
        { "item":{"name": "poção da resistencia", "icon": "assets/potions/2.png"}, "ingredients": [{"name": "Maracujá", "icon": "assets/ingredients/1.png"}, {"name": "Alface", "icon": "assets/ingredients/3.png"}, {"name": "Teia de Aranha", "icon": "assets/ingredients/5.png"}] }
    ]; */
    const totalOfPages = parseInt(recipe.length/2);
    let thisPage = 1;
    console.log(recipe[0].ingredients[0].icon);
    
    function fillPages(){
        if(thisPage === 1){
            fillIngredients(1, 1);
            fillIngredients(1, 2);
            fillIngredients(2, 3);
            fillIngredients(2, 4);
        }
    }

    function fillIngredients(page, number){
        const potionLength = recipe[number-1].ingredients.length;
        console.log(potionLength);
        $(`#ing-${number}`).html("");
        $(`#potion${number}-page${page} h2`).html(recipe[number-1].item.name);
        $(`#pot-${number}`).attr("src", `../../../images/${recipe[number-1].item.icon}`);
        for(let i = 0; i < potionLength; i++){
            $(`#ing-${number}`).append(`<img class="ingredients" src="../../../images/${recipe[number-1].ingredients[i].icon}">`)
        }
    }

    fillPages(recipe);

    //btn to Play the game
    $("#btn-login").on("click", () => {
        username = $("#username").val();
        // password = $("#password").val();
  
        if(username.length >= 3 ){
            //$(`#Modal`).css("display","none");
            /* callFetchLogin(username); */
            /* console.log(parent.coiso); */
            console.log(parent.gameuser.book);
            
            //parent.user.login(username);
        } else {
            alert("O nome precisa ser mais de 2 caracteres!");
        }
    
    });

    $(".close").on("click", function() 
    {
        console.log("Close");
        parent.modal.src = "";
        //$(`#Modal`).css("display","none");
    });

});