$(document).ready(function(){

    let pontuacao = 0;
    const ITENS = [
        {"src": `assets/escolhidos/1.png`, "value": "0"},
        {"src": `assets/escolhidos/2.png`, "value": "1"},
        {"src": `assets/escolhidos/3.png`, "value": "2"},
        {"src": `assets/escolhidos/4.png`, "value": "3"},
        {"src": `assets/escolhidos/5.png`, "value": "4"},
        {"src": `assets/escolhidos/6.png`, "value": "5"},
        {"src": `assets/escolhidos/7.png`, "value": "6"}, 
        {"src": `assets/escolhidos/8.png`, "value": "7"},
        {"src": `assets/escolhidos/18.png`, "value": "8"}
    ];
    /* Itens necessários para fazer a poção */
    let itensPedido = [];

    /* Itens que o jogador colocou no caldeirão */
    let caldeirao = [];

    /* Quantidade de itens necessários para a poção */
    let quantPedidos = 3;

    /* Preenche as prateleiras dinamicamente */
    function encherPrateleiras(){
        for(let i = 0; i < 9; i++){
            if(i < 3){
                $("#itens-1").append(`<img src="${ITENS[i].src}" value="${ITENS[i].value}" class="item">`)
            }
            else if(i < 6){
                $("#itens-2").append(`<img src="${ITENS[i].src}" value="${ITENS[i].value}" class="item">`)
            }
            else{
                $("#itens-3").append(`<img src="${ITENS[i].src}" value="${ITENS[i].value}" class="item">`)
            }
        }
    }

    /* Sorteia os itens necessários para a poção */
    function sorteio(){
        itensPedido = [];
        let arrayCopia = [...ITENS];
        let numero = arrayCopia.length - 1;
        for(let i = 0; i < quantPedidos; i++){
            numero = arrayCopia.length - 1;
            let sorteado = parseInt(Math.random() * (numero - 0) + 0);
            itensPedido.push(arrayCopia[sorteado]);
            arrayCopia.splice(sorteado, 1);
        }
    }
    
    /* Adiciona os itens jogados no caldeirão em um array e no final compara se os itens jogados foram os corretos */
    function pocao(valor){
        let quantidade = caldeirao.length;
        caldeirao.push(ITENS[valor]);
        if(quantidade === 2){
            const compare = caldeirao.find((v,i) => v !== itensPedido[i])
            if(compare === undefined){
                pontuacao += 10;
                $("#pontuacao").html(pontuacao);
                alert("Parabéns!");
                return true;
            }
            else{
                alert("Errou!");
                caldeirao = [];
                sorteio();
                setTimeout(mostrar(),5000);
                return true;
            }
        }
        return false;
    }

    /* Ativa as funções iniciais */
    encherPrateleiras();
    sorteio();
    setTimeout(mostrar(),5000);

    /* Define que objetos com a classe item podem ser arrastados */
    $( ".item" ).draggable({
        revert: 'invalid',
        helper: 'clone'
    });

    /* Define que objetos da classe item podem ser colocados dentro do objeto com id Interface */
     $( "#caudeirao" ).droppable({
        accept: `.item`,
        drop: function( event, ui ) {
            $( this )
                pocao(ui.draggable.attr("value"));
                changeColor();
            }
    });
    
    /* Muda a cor da água */
    function changeColor(){
        $("#agua").switchClass( "s1", "s3", 500, "easeInOutQuad" );
        $('#caudeirao').animate(
            { deg: 2 },
            {
                duration: 100,
                step: function(now) {
                    $(this).css({ transform: 'rotate(' + now + 'deg)' });
                    setTimeout(changeColor2, 200);
                }
                
            }
        );
    }
    function changeColor2(){
        $("#agua").switchClass( "s3", "s1", 500, "easeInOutQuad" );
        $('#caudeirao').animate(
            { deg: -2 },
            {
                duration: 100,
                step: function(now) {
                    $(this).css({ transform: 'rotate(' + 0 + 'deg)' });
                }   
            }
            
        );
    }

    /* Esconde os ingredientes necessários após eles serem mostrados ao jogador */
    function esconder(){
        console.log("entrou");
        $(".pedido").delay(2000).fadeOut();
    }
    
    function mostrar(){
        $("#pedido").remove();
        $("#cliente").delay(500).queue(function (next) {
            $(this).append(`<img src="${itensPedido[0].src}" id="pedido-1" class="pedido">`);
            next();
        });
        $("#cliente").delay(500).queue(function (next) {
            $(this).append(`<img src="${itensPedido[1].src}" id="pedido-2" class="pedido">`);
            next();
        });
        $("#cliente").delay(500).queue(function (next) {
            $(this).append(`<img src="${itensPedido[2].src}" id="pedido-3" class="pedido">`);
            esconder();
            next();
        });
    }


});
