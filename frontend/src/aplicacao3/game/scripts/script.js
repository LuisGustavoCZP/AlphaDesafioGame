import { Animations } from "./animations.js";
import { GameFunctions } from "./gamefunctions.js";

const url = "http://vacsina.servegame.com:8000";

$(document).ready(function(){
    let gamePaused = true;
    const soundTremor = new Audio('assets/sons/Retro Impact Water 03.wav');
    const music = new Audio('assets/sons/music1.wav');

    /* Conta as vidas */
    let lives = 3;

    /* conta os pontos */
    let score = 0;
    /* Itens necessários para fazer a poção */
    let itensAsked = [];

    /* define o modo de jogo */
    let gameMode;

    /* Itens que o jogador colocou no caldeirão */
    let cauldron = [];
    
    /* Quantidade de itens necessários para a poção */
    let numberIngredients = 3;
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

    /* Toca a musica de fundo */
    function musicPlay(){
        music.loop = true;
        music.volume = 0.5;
        music.play();
    }

    /* Toca um som do item sendo jogado no caldeirão */
    function droppingSound(){
        const soundDrop = new Audio('assets/sons/Retro Blop StereoUP 04.wav');
        soundDrop.play();
    }

    /* Toca um som quando os itens brilham */
    function shineSound(){
        const soundShine = new Audio('assets/sons/Retro Event UI 01.wav');
        soundShine.play();
    }

    /* Efeito sonoro de quando a poção sai do caudeirão */
    function potionSfx(){
        const createdPotion = new Audio('assets/sons/Retro Charge Magic 11.wav');
        createdPotion.play();
    }

    function wrongSfx(){
        const wrongChoice = new Audio('assets/sons/Retro Negative Short 23.wav');
        wrongChoice.play();
    }

    /* Define o objeto que governa as funções do jogo */
    const gameSettings = new GameFunctions();


    /* Sorteia os itens necessários para a poção */
    function actualLotery(){
        gameSettings.lotery();
    }
    
    /* Adiciona os itens jogados no caldeirão em um array e no final compara se os itens jogados foram os corretos */
    function potionMaking(valor){
        let quantity = cauldron.length;
        cauldron.push(ITENS[valor]);

        if(quantity === numberIngredients - 1){
            animations.removeAnimations();
            soundTremor.play();
            setTimeout(animations.finishedPotion, 50);
            const compareOrder= cauldron.find((v,i) => v !== itensAsked[i]);
            if(compareOrder === undefined){
                score += 500 * numberIngredients;
                $("#score").html(score);
                setTimeout(animations.mageVictory, 1000);
                setTimeout(animations.potionShine, 1000);
                setTimeout(potionSfx, 2000);
                setTimeout(gameSettings.victory , 4500);
                cauldron = [];
                return true;
            }
            else{
                setTimeout(animations.mageDefeat, 1000);
                setTimeout(wrongSfx, 1000);
                gameSettings.lifeCount();
            }
        }
        return false;
    }

    /* Ativa as funções iniciais */
    gameSettings.fillShelves();

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

    /* Ativa o modo de jogo aleatório */
    function randomMode(){
        $("#modo-de-jogo").fadeOut("slow");
        $("#play").fadeIn("slow");
        gameMode = "random";
    }

    /* Ativa o modo de jogo sequencial */
    function sequentialMode(){
        $("#modo-de-jogo").fadeOut("slow");
        $("#play").fadeIn("slow");
        gameMode = "";
    }
    
    /* Define configurações iniciais do jogo */
    $("#play").hide();
    $("#potion").hide();
    $("#random").on("click", randomMode);
    $("#sequential").on("click", sequentialMode);
    $("#play").on("click", gameSettings.gameStart);
    $("#pause").on("click", gameSettings.pauseGame);
});
