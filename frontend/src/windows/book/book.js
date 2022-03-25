/* import { RequestSys } from "./request.js"; */
$(document).ready(() => 
{
    function close () 
    {
        parent.modal.src = "";
        parent.audiosys.play("close");

    }
    $(".modal-background").on("click", (e) => {e.preventDefault(); e.stopPropagation();});
    $("body").on("click", close);

    //console.log(parent.modal);//closeable ();
    $(".close").on("click", close);

    let potionActive;
    $(".this-potion").hide();
    const recipesData = parent.gameuser ? parent.gameuser.book : {"resultBook":[
        { "item":{"name": "poção da velocidade", "icon": "../../images/potions/1.png"}, "ingredients": [{"name": "Maracujá", "icon": "../../images/ingredients/1.png"}, {"name": "Alface", "icon": "../../images/ingredients/3.png"}, {"name": "Tomate", "icon": "../../images/ingredients/4.png"}], "desc": "Mesmo parecendo um escaravelho, esse estranho doce é feito de um açúcar mágico! É ótimo para gerar itens que mexam com os sentimentos!" },
        { "item":{"name": "poção da resistencia", "icon": "../../images/potions/2.png"}, "ingredients": [{"name": "Maracujá", "icon": "../../images/ingredients/1.png"}, {"name": "Alface", "icon": "../../images/ingredients/3.png"}, {"name": "Teia de Aranha", "icon": "../../images/ingredients/5.png"}], "desc": "Mesmo parecendo um escaravelho, esse estranho doce é feito de um açúcar mágico! É ótimo para gerar itens que mexam com os sentimentos!" },
        { "item":{"name": "poção da resistencia", "icon": "../../images/potions/3.png"}, "ingredients": [{"name": "Maracujá", "icon": "../../images/ingredients/1.png"}, {"name": "Alface", "icon": "../../images/ingredients/3.png"}, {"name": "Teia de Aranha", "icon": "../../images/ingredients/5.png"}], "desc": "Mesmo parecendo um escaravelho, esse estranho doce é feito de um açúcar mágico! É ótimo para gerar itens que mexam com os sentimentos!" },
        { "item":{"name": "poção da resistencia", "icon": "../../images/potions/4.png"}, "ingredients": [{"name": "Maracujá", "icon": "../../images/ingredients/1.png"}, {"name": "Alface", "icon": "../../images/ingredients/3.png"}, {"name": "Teia de Aranha", "icon": "../../images/ingredients/5.png"}], "desc": "Mesmo parecendo um escaravelho, esse estranho doce é feito de um açúcar mágico! É ótimo para gerar itens que mexam com os sentimentos!" },
        { "item":{"name": "poção da resistencia", "icon": "../../images/potions/5.png"}, "ingredients": [{"name": "Maracujá", "icon": "../../images/ingredients/1.png"}, {"name": "Alface", "icon": "../../images/ingredients/3.png"}, {"name": "Teia de Aranha", "icon": "../../images/ingredients/5.png"}], "desc": "Mesmo parecendo um escaravelho, esse estranho doce é feito de um açúcar mágico! É ótimo para gerar itens que mexam com os sentimentos!" },
        { "item":{"name": "poção da velocidade", "icon": "../../images/potions/6.png"}, "ingredients": [{"name": "Maracujá", "icon": "../../images/ingredients/1.png"}, {"name": "Alface", "icon": "../../images/ingredients/3.png"}, {"name": "Tomate", "icon": "../../images/ingredients/4.png"}], "desc": "Mesmo parecendo um escaravelho, esse estranho doce é feito de um açúcar mágico! É ótimo para gerar itens que mexam com os sentimentos!" },
        { "item":{"name": "poção da resistencia", "icon": "../../images/potions/7.png"}, "ingredients": [{"name": "Maracujá", "icon": "../../images/ingredients/1.png"}, {"name": "Alface", "icon": "../../images/ingredients/3.png"}, {"name": "Teia de Aranha", "icon": "../../images/ingredients/5.png"}], "desc": "Mesmo parecendo um escaravelho, esse estranho doce é feito de um açúcar mágico! É ótimo para gerar itens que mexam com os sentimentos!" }
    ], "totalRecipes": 50};
    const recipe = recipesData.resultBook;
    console.log(recipe);

    function fillIngredients(){
        const recipeLength = recipe.length;
        let line = Math.ceil(recipeLength/4);
        let count = 4
        for(let j = 1; j < line+1; j++){
            $("#potion-stock").append(`<div id="potion-line${j}" class="potion-line">
            <div class="pot-position">
                <img id="pot${count-3}" class="this-potion">
            </div>
            <div class="pot-position">
                <img id="pot${count-2}" class="this-potion">
            </div>
            <div class="pot-position">
                <img id="pot${count-1}" class="this-potion">
            </div>
            <div class="pot-position">
                <img id="pot${count}" class="this-potion">
            </div>
        </div>`);
            $(".this-potion").hide();
            count += 4;
        }
        for(let i = 0; i < recipeLength; i++){
            $(`#pot${i+1}`).show();
            $(`#pot${i+1}`).attr("src", `/images/${recipe[i].item.icon}`);
            $(`#pot${i+1}`).attr("id", i);
        }
        $("#recipes-un").html(`RECEITAS (${recipeLength}/${recipesData.totalRecipes})`)
    }

    fillIngredients();

    function showInformation(){
        let potion = this.id;
        if(potionActive !== potion){
            potionActive = potion;
            const itemInfo = recipe[potion];
            console.log(recipe);
            $("#ingredients-description").html("");
            let recipeLength = itemInfo.ingredients.length;
            console.log(recipeLength);
            $("#potion-description h3").html(itemInfo.item.name);
            $("#potion-image").attr("src", `/images/${itemInfo.item.icon}`);
            console.log(itemInfo.ingredients);
            for(let i = 0; i < recipeLength; i++){
                const ingredientInfo = itemInfo.ingredients[i];
                console.log(ingredientInfo);
                $("#ingredients-description").append(`<img id="potion-${i}" class="this-potion" src="/images/${ingredientInfo.icon}">`);
            }
            $("#item-descp").html(`${itemInfo.item.desc}`);
        }
    }
    
    $(".this-potion").on("click ",showInformation);

});