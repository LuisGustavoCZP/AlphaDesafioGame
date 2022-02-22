import { Animations } from "../scripts/animations.js";
import { GameFunctions } from "../scripts/gamefunctions.js";

const url = "http://vacsina.servegame.com:8000";

$(document).ready(function(){

    const ITENS = [
        {"src": `assets/escolhidos/1.png`, "id": "0"},
        {"src": `assets/escolhidos/2.png`, "id": "1"},
        {"src": `assets/escolhidos/3.png`, "id": "2"},
        {"src": `assets/escolhidos/4.png`, "id": "3"},
        {"src": `assets/escolhidos/5.png`, "id": "4"},
        {"src": `assets/escolhidos/10.png`, "id": "5"},
        {"src": `assets/escolhidos/15.png`, "id": "6"}, 
        {"src": `assets/escolhidos/8.png`, "id": "7"},
        {"src": `assets/escolhidos/18.png`, "id": "8"}
    ];

    /* Define o objeto que governa as animações */
    const animations = new Animations();

    /* Define o objeto que governa as funções do jogo */
    const gameSettings = new GameFunctions();

    /* Ativa as funções iniciais */
    gameSettings.fillShelves();

    /* Sorteia os itens necessários para a poção */
    function actualLotery(){
        gameSettings.lotery();
    }

    /* Define que objetos com a classe item podem ser arrastados */
    $( ".item" ).draggable({
        revert: 'invalid',
        helper: 'clone'
    });

    /* Define que objetos da classe item podem ser colocados dentro do objeto com id Interface */
     $( "#cauldron" ).droppable({
        accept: `.item`,
        drop: function( event, ui ) {
            $( this )
                potionMaking(ui.draggable.attr("id"));
                animations.removeAnimations();
                animations.changeColor();
                droppingSound();
            }
    });
    

    /* Esconde os ingredientes necessários após eles serem mostrados ao jogador */
    function hideLotery(){
        $(".pedido").delay(2000).queue(function(next) {
            $(this).fadeOut();
            next();
        })
        $(`#${itensAsked[0].id}`).delay(2000).queue(function(next) {
            animations.hideShine();
            animations.removeAnimations();
            next();
        })
    }
    
    /* Faz os ingredientes brilharem */
    function showLotery(){
        if(gamePaused){
            return false;
        }
        else{
            $("#pedido").remove();
            animations.showShine();
    
            $("#client").delay(1000).queue(function (next) {
                $(`#${itensAsked[numberIngredients-1].id}`).addClass('itemShine');
                hideLotery();
                next();
            });
        }
    }

    /* Define configurações iniciais do jogo */
    $("#play").hide();
    $("#potion").hide();
    $("#random").on("click", gameSettings.randomMode);
    $("#sequential").on("click", gameSettings.sequentialMode);
    $("#play").on("click", () => { gameSettings.gameStart() });
    $("#pause").on("click", () => { gameSettings.pauseGame() });
});
