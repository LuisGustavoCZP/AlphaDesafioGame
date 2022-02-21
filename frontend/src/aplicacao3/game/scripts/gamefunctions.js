import { Request } from "../../scripts/request.js";

/* Define as funções básicas do jogo */
class GameFunctions{
    constructor(){};

    /* Acontece quando o jogador acerta a sequencia de ingredientes */
    victory(){
        animations.removeAnimations();
        $("#potion").attr("src", `./assets/escolhidos/pocoes/${numberIngredients}.png`);
        numberIngredients = numberIngredients +1;
        actualLotery();
        setTimeout(showLotery ,2000);
    };
    
    /* Preenche as prateleiras de itens */
    fillShelves(){
        
        Request.get("stock", 
        data => 
        {
            for(let i = 0; i < 9; i++){
                if(i < 3){
                    $("#itens-1").append(`<img src="${ITENS[i].src}" id="${ITENS[i].id}" class="item">`)
                }
                else if(i < 6){
                    $("#itens-2").append(`<img src="${ITENS[i].src}" id="${ITENS[i].id}" class="item">`)
                }
                else{
                    $("#itens-3").append(`<img src="${ITENS[i].src}" id="${ITENS[i].id}" class="item">`)
                }
            }
        },
        error => 
        {
            console.log("Redirecionando para o login");
            window.location.replace(`../menu`);
        },
        document.cookie);
    };

    /* Sorteia os ingredientes que deverão se jogados no caudeirão
        Caso o IF não esteja comentado os ingredientes serão sorteados aleatóriamentes
    */
    lotery(){
        if(gameMode === "random"){
            itensAsked = [];
        }
        let arrayCopia = [...ITENS];
        let numero = arrayCopia.length - 1;
        for(let i = itensAsked.length; i < numberIngredients; i++){
            numero = arrayCopia.length - 1;
            let sorteado = parseInt(Math.random() * (numero - 0) + 0);
            while(i > 0 && arrayCopia[sorteado] === itensAsked[i-1]){
                sorteado = parseInt(Math.random() * (numero - 0) + 0);
            }
            itensAsked.push(arrayCopia[sorteado]);
        }
    };

    /* Contagem de vida */
    lifeCount(){
        if(lives > 1){
            animations.removeAnimations();
            $(`#life${lives}`).addClass("lostLife");
            lives = lives -1;
            cauldron = [];
            actualLotery();
            setTimeout(showLotery ,3500);
        }
        else{
            animations.removeAnimations();
            $(`#life${lives}`).addClass("lostLife");
            lives = lives -1;
            alert("GAME OVER");
        }
    }

    /* Começa o jogo */
    gameStart(){
        gamePaused = false;
        $("main").removeClass("blur");
        $("#play").fadeOut("slow");
        musicPlay();
        actualLotery();
        setTimeout(showLotery ,1000);
    };

    /* Pausa o jogo */
    pauseGame(){
        gamePaused = true;
        clearTimeout(showLotery);
        animations.removeAnimations();
        $("main").addClass("blur");
        $("#play").fadeIn("slow");
        music.pause();
    };
}

export { GameFunctions };