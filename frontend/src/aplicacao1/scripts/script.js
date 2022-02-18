const url = "http://localhost:8000";

$(document).ready(function(){
    $("#play").on("click", gameStart);
    $("#pause").on("click", pauseGame);
    const soundTremor = new Audio('assets/sons/Retro Impact Water 03.wav');
    const music = new Audio('assets/sons/music1.wav');
    let lives = 3;
    let score = 0;
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
    /* Itens necessários para fazer a poção */
    let itensAsked = [];

    /* Itens que o jogador colocou no caldeirão */
    let cauldron = [];

    /* Quantidade de itens necessários para a poção */
    let numberIngredients = 3;

    function musicPlay(){
        music.loop = true;
        music.play();
    }

    function droppingSound(){
        const soundDrop = new Audio('assets/sons/Retro Blop StereoUP 04.wav');
        soundDrop.play();
    }
    function shineSound(){
        const soundShine = new Audio('assets/sons/Retro Event UI 01.wav');
        soundShine.play();
    }

    /* Preenche as shelfleiras dinamicamente */
    function fillShelves(){
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
    }

    /* Sorteia os itens necessários para a poção */
    function lotery(){
        itensAsked = [];
        let arrayCopia = [...ITENS];
        let numero = arrayCopia.length - 1;
        for(let i = 0; i < numberIngredients; i++){
            numero = arrayCopia.length - 1;
            let sorteado = parseInt(Math.random() * (numero - 0) + 0);
            itensAsked.push(arrayCopia[sorteado]);
            arrayCopia.splice(sorteado, 1);
        }
    }
    
    /* Adiciona os itens jogados no caldeirão em um array e no final compara se os itens jogados foram os corretos */
    function potionMaking(valor){
        let quantidade = cauldron.length;
        cauldron.push(ITENS[valor]);
        if(quantidade === 2){
            const anyOrder = cauldron.filter(e => !itensAsked.includes(e));
            console.log(anyOrder)
            const compareOrder= cauldron.find((v,i) => v !== itensAsked[i]);
            if(compareOrder === undefined){
                score += 200;
                $("#score").html(score);
                //alert("Parabéns! Combinação perfeita!");
                $("#mage").addClass("happyMage");
                return true;
            }
            else if(anyOrder.length === 0){
                score += 100;
                $("#score").html(score);
                //alert("Parabéns!");
                $("#mage").addClass("happyMage");
                return true;
            }
            else{
                lifeCount();
                return true;
            }
        }
        return false;
    }

    /* Contador de vidas */
    function lifeCount(){
        if(lives > 1){
            $(`#life${lives}`).addClass("lostLife");
            lives = lives -1;
           // alert("Errou!");
            cauldron = [];
            lotery();
            setTimeout(showLotery(),5000);
        }
        else{
           // alert("Game Over!");
        }
        console.log(lives);
    }

    /* Ativa as funções iniciais */
    fillShelves();
    function gameStart(){
        $("main").removeClass("blur");
        $("#play").fadeOut("slow");
        musicPlay();
        lotery();
        setTimeout(showLotery(),5000);
    }

    function pauseGame(){
        $("main").addClass("blur");
        $("#play").fadeIn("slow");
        music.pause();
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
                changeColor();
            }
    });
    
    /* Muda a cor da água */
    function changeColor(){
        $("main").removeClass("backgroundShake");
        const classList = $("#water").attr("class");
        $("#mage").addClass("moveMage");
        droppingSound();
        console.log(classList);
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
            else{
                soundTremor.play();
                $(this).addClass("cauldronShake2");
                $("main").addClass("backgroundShake");
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

    /* Esconde os ingredientes necessários após eles serem mostrados ao jogador */
    function hideLotery(){
        console.log("entrou");
        $(".pedido").delay(2000).queue(function(next) {
            $(this).fadeOut();
            next();
        })
        $(`#${itensAsked[0].id}`).delay(2000).queue(function(next) {
            $(this).removeClass('itemShine');
            $(`#${itensAsked[1].id}`).removeClass('itemShine');
            $(`#${itensAsked[2].id}`).removeClass('itemShine');
            next();
        })
    }
    
    function showLotery(){
        $("#pedido").remove();
        $("#client").delay(1000).queue(function (next) {
           // $(this).append(`<img src="${itensAsked[0].src}" id="pedido-1" class="pedido">`);
            $(`#${itensAsked[0].id}`).addClass('itemShine');
            shineSound();
            next();
        });
        $("#client").delay(1000).queue(function (next) {
           // $(this).append(`<img src="${itensAsked[1].src}" id="pedido-2" class="pedido">`);
            $(`#${itensAsked[1].id}`).addClass('itemShine');
            shineSound();
            next();
        });
        $("#client").delay(1000).queue(function (next) {
          //  $(this).append(`<img src="${itensAsked[2].src}" id="pedido-3" class="pedido">`);
            $(`#${itensAsked[2].id}`).addClass('itemShine');
            shineSound();
            hideLotery();
            next();
        });
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

});
