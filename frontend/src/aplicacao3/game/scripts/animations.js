/* Define o governante das animações do jogo*/
class Animations {
    constructor()
    {
        
    }

    /* Animação do mago ao acertar a poção */
    mageVictory(){
        $("#mage").removeClass("happyMage");
        $("#mage").addClass("happyMage");
    }

    /* Animação do mago ao errar a poção */
    mageDefeat(){
        $("#mage").removeClass("fallingMage");
        $("#mage").addClass("fallingMage");
    }
    
    /* Animação do caudeirão quando a poção é feita */
    finishedPotion(){
        $("#cauldron").addClass("cauldronShake2");
        $("main").addClass("backgroundShake");
    }

    /* Poção sobe do caudeirão caso a sequencia de itens esteja certa */
    potionShine(){
        $("#potion").show();
        $("#potion").addClass("potionRise");
    }

    /* retira o brilho dos ingredientes */
    hideShine(itensAsked){
        $(".pedido").delay(2000).queue(function(next) {
            $(this).fadeOut();
            next();
        })

        const f = (next) => {$(`.item`).removeClass('itemShine');/* next(); */};

        setTimeout(()=>{f();}, 2000)
        /* $(`#${itensAsked[0].id}`).delay(2000).queue(function(next) {
            
        }) */
    }


    
    /* Faz os ingredientes escolhidos brilharem */
    showShine(audio, itensAsked){
        $("#pedido").remove();
        for(let i = 0; i < itensAsked.length; i++){
            $("#client").delay(1000).queue(function (next) {
                audio.shineSound();
                $(`.item`).removeClass('itemShine itemShine2');
                if(i > 1 && itensAsked[i-2].id === itensAsked[i].id){
                    console.log("repetido" + `${itensAsked[i].id}`);
                    $(`.item`).removeClass('itemShine itemShine2');
                    $(`#${itensAsked[i].id}`).delay(800).addClass('itemShine2');
                }
                else{
                    console.log("nao repetido" + `${itensAsked[i].id}`);
                    //$(`.item`).removeClass('itemShine itemShine2');
                    $(`#${itensAsked[i].id}`).delay(1000).addClass('itemShine');
                }
                 next();
            });
        }
        $(`.item`).removeClass('itemShine itemShine2');
    }

    /* retira as animações que ainda estão ativas */
    removeAnimations(){
        $(`.item`).removeClass('itemShine');
        $("#cauldron").removeClass("cauldronShake cauldronShake2");
        $("main").removeClass("backgroundShake");
        $("#mage").removeClass("happyMage fallingMage");
        $("#potion").removeClass("potionRise");
        $("#potion").hide();
    }

    /* muda a cor da água do caudeirão */
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

export { Animations };