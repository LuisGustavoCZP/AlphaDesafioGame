const url = "http://localhost:8000";

$(document).ready(function(){
    let gamePaused = true;
    const soundTremor = new Audio('assets/sons/Retro Impact Water 03.wav');
    const music = new Audio('assets/sons/music1.wav');
    let lives = 3;
    let score = 0;
    /* Itens necessários para fazer a poção */
    let itensAsked = [];

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

    class animations {
        constructor(){};

        mageVictory(){
            $("#mage").removeClass("happyMage");
            $("#mage").addClass("happyMage");
        }
        
        finishedPotion(){
            $("#cauldron").addClass("cauldronShake2");
            $("main").addClass("backgroundShake");
        }

        hideShine(){
            $(".pedido").delay(2000).queue(function(next) {
                $(this).fadeOut();
                next();
            })
            $(`#${itensAsked[0].id}`).delay(2000).queue(function(next) {
                $(`.item`).removeClass('itemShine');
                next();
            })
        }
        
        showShine(){
            $("#pedido").remove();
            for(let i = 0; i < numberIngredients -1; i++){
                $("#client").delay(1000).queue(function (next) {
                    shineSound();
                    $(`.item`).removeClass('itemShine itemShine2');
                    if(i > 0 && itensAsked[i-1].id === itensAsked[i].id){
                        $(`.item`).removeClass('itemShine itemShine2');
                        $(`#${itensAsked[i].id}`).delay(800).addClass('itemShine2');
                    }
                    else{
                        $(`#${itensAsked[i].id}`).delay(800).addClass('itemShine');
                    }
                     next();
                });
            }
            $("#client").delay(1000).queue(function (next) {
                shineSound();
                $(`#${itensAsked[numberIngredients-1].id}`).addClass('itemShine');
                next();
              });
        }

        removeAnimations(){
            $(`.item`).removeClass('itemShine');
            $("#cauldron").removeClass("cauldronShake cauldronShake2");
            $("main").removeClass("backgroundShake");
            $("#mage").removeClass("happyMage");
        }

        changeColor(){
            const classList = $("#water").attr("class");
            $("#mage").addClass("moveMage");
            $("#cauldron").queue(function (next) {
                if(classList === "s1" || classList === "waterBase"){
                    $(this).addClass("cauldronShake");
                    $("#water").removeClass("s1");
                    $("#water").removeClass("waterBase");
                    $("#water").addClass("water1");
                }
                else if(classList === "water1") {
                    $(this).addClass("cauldronShake");
                    $("#water").removeClass("water1");
                    $("#water").addClass("water2");
                }
                else if(classList === "water2"){
                    $(this).addClass("cauldronShake");
                    $("#water").removeClass("water2");
                    $("#water").addClass("waterBase");
                }
                next();
            });
            $("#cauldron").delay(1000).queue(function (next) {
                $(this).removeClass("cauldronShake cauldronShake2");
                $("#mage").removeClass("moveMage");
                next();
            });
        }

    }

    const gameAnimations = new animations();

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

    class gameFunctions{
        constructor(){};

        victory(){
            numberIngredients = numberIngredients +1;
            actualLotery();
            setTimeout(showLotery ,2000);
        };
        
        fillShelves(){
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
        };

        lotery(){
            itensAsked = [];
            let arrayCopia = [...ITENS];
            let numero = arrayCopia.length - 1;
            for(let i = 0; i < numberIngredients; i++){
                numero = arrayCopia.length - 1;
                let sorteado = parseInt(Math.random() * (numero - 0) + 0);
                while(i > 0 && arrayCopia[sorteado] === itensAsked[i-1]){
                    sorteado = parseInt(Math.random() * (numero - 0) + 0);
                }
                itensAsked.push(arrayCopia[sorteado]);
            }
        };

        lifeCount(){
            if(lives > 1){
                $(`#life${lives}`).addClass("lostLife");
                lives = lives -1;
               // alert("Errou!");
                cauldron = [];
                actualLotery();
                setTimeout(showLotery ,1000);
            }
            else{
               // alert("Game Over!");
            }
        }

        gameStart(){
            gamePaused = false;
            $("main").removeClass("blur");
            $("#play").fadeOut("slow");
            musicPlay();
            actualLotery();
            setTimeout(showLotery ,1000);
        };
    
        pauseGame(){
            gamePaused = true;
            clearTimeout(showLotery);
            gameAnimations.removeAnimations();
            $("main").addClass("blur");
            $("#play").fadeIn("slow");
            music.pause();
        };
    }

    const gameSettings = new gameFunctions();


    /* Sorteia os itens necessários para a poção */
    function actualLotery(){
        gameSettings.lotery();
    }
    
    /* Adiciona os itens jogados no caldeirão em um array e no final compara se os itens jogados foram os corretos */
    function potionMaking(valor){
        let quantidade = cauldron.length;
        cauldron.push(ITENS[valor]);
        if(quantidade === numberIngredients - 1){
            gameAnimations.removeAnimations();
            soundTremor.play();
            setTimeout(gameAnimations.finishedPotion, 50);
            
            const anyOrder = cauldron.filter(e => !itensAsked.includes(e));
            const compareOrder= cauldron.find((v,i) => v !== itensAsked[i]);
            if(compareOrder === undefined){
                score += 500 * numberIngredients;
                $("#score").html(score);
                //alert("Parabéns! Combinação perfeita!");
                setTimeout(gameAnimations.mageVictory, 1000);
                setTimeout(gameSettings.victory , 3500);
                cauldron = [];
                return true;
            }
            else if(anyOrder.length === 0){
                score += 250 * numberIngredients;
                $("#score").html(score);
                //alert("Parabéns!");
                setTimeout(gameAnimations.mageVictory, 1000);
                setTimeout(gameSettings.victory, 3500);
                cauldron = [];
                return true;
            }
            else{
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
                gameAnimations.removeAnimations();
                gameAnimations.changeColor();
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
            gameAnimations.hideShine();
            gameAnimations.removeAnimations();
            next();
        })
    }
    
    function showLotery(){
        if(gamePaused){
            return false;
        }
        else{
            $("#pedido").remove();
            gameAnimations.showShine();
    
            $("#client").delay(1000).queue(function (next) {
                $(`#${itensAsked[numberIngredients-1].id}`).addClass('itemShine');
                hideLotery();
                next();
            });
        }
    }

    fetch(`${url}/`)
      .then(
         function (response) {
            if (response.status !== 200) {
               console.log('Looks like there was a problem. Status Code: ' + response.status);
               return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
               console.log(data);
            });
         }
      )
    .catch(function (err) { console.log('Fetch Error :-S', err); }); 

    $("#play").on("click", gameSettings.gameStart);
    $("#pause").on("click", gameSettings.pauseGame);
});
