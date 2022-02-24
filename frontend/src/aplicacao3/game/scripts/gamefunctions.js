import { Request } from "../../scripts/request.js";
import { SoundSys } from "../scripts/soundsys.js";
import { Animations } from "../scripts/animations.js";

/* Define as funções básicas do jogo */
class GameFunctions{
    gamePaused;
    gameMode;
    audio;
    animations;
    lives;
    score;
    itensAsked;
    cauldron;
    constructor()
    {
        /* Diz se o jogo está pausado */
        this.gamePaused = true;

        /* define o modo de jogo */
        this.gameMode = "";

        /* define o controlador de audio */
        this.audio = new SoundSys ();
        //console.log(this.audio);

        /* Define o objeto que governa as animações */
        this.animations = new Animations();

        /* Conta as vidas */
        this.lives = 3;

        /* conta os pontos */
        this.score = 0;
        /* Itens necessários para fazer a poção */
        this.itensAsked = [];

        /* Itens que o jogador colocou no caldeirão */
        this.cauldron = [];

    };

    get isPaused ()
    {
        return this.gamePaused;
    }

    get gameMode ()
    {
        return this.gameMode;
    }

    /* Acontece quando o jogador acerta a sequencia de ingredientes */
    victory(){
        this.cauldron = [];
        console.log(this.cauldron);
        this.animations.removeAnimations();
        const numberIngredients = this.itensAsked.length;
        $("#potion").attr("src", `./assets/pocoes/${numberIngredients}.png`);
        /* actualLotery(); */
        this.fillShelves();
        setTimeout(() =>{
            this.lotery();
        } ,2000);
    };
    
    /* Preenche as prateleiras de itens */
    fillShelves(){
        Request.get("stock", 
        {params:document.cookie.replace("userData=", "")},
        data => 
        {
            const stock = data.stock;
            for(let i = 0; i < stock.length; i++){
                if(i < 3){
                    $(`#${i+20}`).attr("src", `${stock[i].icon}`);
                    $(`#${i+20}`).attr("id", `${stock[i].id}`);
                    /* $("#itens-1").append(`<img src="${stock[i].icon}" id="${stock[i].id}" class="item">`) */
                }
                else if(i < 6){
                    $(`#${i+20}`).attr("src", `${stock[i].icon}`);
                    $(`#${i+20}`).attr("id", `${stock[i].id}`);
                }
                else{
                    $(`#${i+20}`).attr("src", `${stock[i].icon}`);
                    $(`#${i+20}`).attr("id", `${stock[i].id}`);
                }
            }
        },
        error => 
        {
            console.log("Redirecionando para o login");
            window.location.replace(`../menu`);
        });
    };

    /* Sorteia os ingredientes que deverão se jogados no caudeirão
        Caso o IF não esteja comentado os ingredientes serão sorteados aleatóriamentes
    */
    lotery (){
        Request.get(this.gameMode, 
        {params:document.cookie.replace("userData=", "")},
        data => 
        {
            this.itensAsked = data.recipe;
            
            setTimeout(() => {this.showLotery()}, 1000);
            //.push(arrayCopia[sorteado]);
        },
        error => 
        {
            console.log("Redirecionando para o login");
            window.location.replace(`../menu`);
        });
    }

    /* Contagem de vida */
    lifeCount(){
        this.cauldron = [];
        if(this.lives > 1){
            this.animations.removeAnimations();
            $(`#life${this.lives}`).addClass("lostLife");
            this.lives = this.lives -1;
            this.cauldron = [];
            
            setTimeout(()=>{
                this.lotery();
                this.fillShelves();
            },3000);
        }
        else{
            this.animations.removeAnimations();
            $(`#life${this.lives}`).addClass("lostLife");
            this.lives = this.lives -1;
            
            setTimeout(()=>{
                window.location.replace(`../gameover`);
            }, 4000); 
        }
    }

    /* Esconde os ingredientes necessários após eles serem mostrados ao jogador */
    hideLotery(){
        $(".pedido").delay(2000).queue(function(next) {
            $(this).fadeOut();
            next();
        })
        /* $(`#${itensAsked[0].id}`).delay(2000).queue(function(next) {
            
        }) */
        setTimeout(() => {this.hideInDelay();}, 2000);
    }

    /* Faz os ingredientes brilharem */
    showLotery(){
        if(this.gamePaused){
            return false;
        }
        else{
            $("#pedido").remove();
            this.animations.showShine(this.audio, this.itensAsked);

            setTimeout(() => {this.showInDelay();}, 1000);
            /* $("#client").delay(1000).queue(function (next) {
                this.execDelay(next);
            }); */
        }
    }

    showInDelay (next) {
        //$(`#${this.itensAsked[this.itensAsked.length-1].id}`).addClass('itemShine');
        this.hideLotery();
        //next();
    }

    hideInDelay (next) {
        this.animations.hideShine();
        this.animations.removeAnimations();
        //next();
    }

    pluck(list, propertyName) {
        return list.map(function(i) {
          return parseInt(i[propertyName]);
        });
      }

    /* Adiciona os itens jogados no caldeirão em um array e no final compara se os itens jogados foram os corretos */
    potionMaking(valor, ITENS){
        let numberIngredients = this.itensAsked.length;
        let quantity = this.cauldron.length;
        this.cauldron.push(ITENS[valor]);
        if(quantity === numberIngredients - 1){
            let fullCauldron = this.pluck(this.cauldron, "id");
            this.animations.removeAnimations();
            setTimeout(() =>{this.audio.tremor()}, 50);
            setTimeout(() =>{this.animations.finishedPotion()}, 50);
            Request.post("recipe", 
            fullCauldron,
            data => 
            {
                this.crafing(data);
            },
            error => 
            {
                console.log("Redirecionando para o login");
                //window.location.replace(`../menu`);
            },
            document.cookie.replace("userData=", ""));
            this.cauldron = [];
        }
        return false;
    }

    crafing(data){
        
        if(data !== 1){
            $("#score").html(data.points);
            setTimeout(() => {this.animations.mageVictory()}, 1000);
            setTimeout(() => {this.animations.potionShine()}, 1000);
            setTimeout(() => {this.audio.potionSfx()}, 2000);
            setTimeout(() => {this.victory()} , 4500);
            return true;
        }
        else{
            setTimeout(() => {this.animations.mageDefeat()}, 1000);
            setTimeout(() => {this.audio.wrongSfx()}, 1000);
            this.lifeCount();
        }
    }

    resetGame(){
        Request.post("reset", 
        {},
        data => 
        {
            this.lives = data.lives;
            $("#score").html(data.points);
            console.log(data);
        },
        error => 
        {
            console.log("Erro: " + error);
           // window.location.replace(`../menu`);
        },
        {params:document.cookie.replace("userData=", "")}
    );

    //window.location.replace(`../game`);
    }

    /* Ativa o modo de jogo aleatório */
    randomMode(){
        $("#modo-de-jogo").fadeOut("slow");
        $("#play").fadeIn("slow");
        this.gameMode = "recipe";
    }

    /* Ativa o modo de jogo sequencial */
    sequentialMode(){
        $("#modo-de-jogo").fadeOut("slow");
        $("#play").fadeIn("slow");
        this.gameMode = "item";
    }

    getStartInfo(){
        Request.get("user", 
            {params:document.cookie.replace("userData=", "")},
            data => 
            {
                
                this.lives = data.lives;
                if(this.lives <= 0){
                    this.resetGame();
                }
                else if(this.lives < 3){
                    for(let i = this.lives; i < 3; i++){
                        $(`#life${i+1}`).addClass("lostLife"); 
                    }
                }
                $("#score").html(data.points);

            },
            error => 
            {
                console.log("Redirecionando para o login");
                //window.location.replace(`../menu`);
            });
        this.audio.musicPlay();
        setTimeout(()=>{
            this.lotery();
        },500);
    }

    /* Começa o jogo */
    gameStart(){
        this.gamePaused = false;
        $("main").removeClass("blur");
        $("#play").fadeOut("slow");
        this.getStartInfo();
    };

    /* Pausa o jogo */
    pauseGame(){
        this.gamePaused = true;
        this.animations.removeAnimations();
        $("main").addClass("blur");
        $("#play").fadeIn("slow");
        this.audio.music.pause();
    };
}

export { SoundSys, Animations, GameFunctions };