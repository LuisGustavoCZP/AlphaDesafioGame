import { RequestSys } from "../../scripts/request.js";
import { SoundSys } from "./soundsys.js";
import { Animations } from "./animations.js";

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
    time;
    timeControl;
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

        /* tempo inicial do timer */
        this.time = 10;

        /* controla o tempo */
        this.timeControl = "";

    };

    get isPaused ()
    {
        return this.gamePaused;
    }

    get gameMode ()
    {
        return this.gameMode;
    }

    gameTimer(){
        this.time -= 1;
        $("#time-left").html(this.time);
        if(this.time < 0){
            $("#time-left").html("0");
            alert("tempo acabou");
            clearInterval(this.timeControl);
            /* window.location.replace(`../gameover`); */
        }
    }

    /* Acontece quando o jogador acerta a sequencia de ingredientes */
    victory(){
        this.cauldron = [];
        //console.log(this.cauldron);
        this.animations.removeAnimations();
        const numberIngredients = this.itensAsked.length;
        $("#potion").attr("src", `./assets/pocoes/${numberIngredients}.png`);

        this.fillShelves();
        setTimeout(() =>{
            this.lotery();
        } ,1000);
    };
    
    /* Preenche as prateleiras de itens */
    fillShelves(){
        RequestSys.get("stock", 
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

    /* Sorteia os ingredientes que deverão se jogados no caudeirão */
    lotery (){
        RequestSys.get(this.gameMode, 
        {params:document.cookie.replace("userData=", "")},
        data => 
        {
            this.itensAsked = data.recipe;
            //console.log(this.itensAsked);
            setTimeout(() => {this.showLotery()}, 1000);
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
            }, 3000);
        }
        else{
            this.animations.removeAnimations();
            $(`#life${this.lives}`).addClass("lostLife");
            this.lives = this.lives -1;
            
            setTimeout(()=>{
                window.location.replace(`../gameover`);
            }, 2500); 
        }
    }

    /* Esconde os ingredientes necessários após eles serem mostrados ao jogador */
    hideLotery(){
        $(".pedido").delay(2000).queue(function(next) {
            $(this).fadeOut();
            next();
        })

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

        }
    }

    showInDelay (next) {

        this.hideLotery();
        //next();
    }

    hideInDelay (next) {
        this.animations.hideShine();
        this.animations.removeAnimations();
        //next();
    }


    /* Organiza o array que será enviado para o backend */
    pluck(list, propertyName) {
        return list.map(function(i) {
          return parseInt(i[propertyName]);
        });
      }

    /* Adiciona os itens jogados no caldeirão em um array e no final envia o array para
    o backend, que compara se os itens jogados foram os corretos */
    potionMaking(valor, ITENS){
        let numberIngredients = this.itensAsked.length;
        let quantity = this.cauldron.length;
        this.cauldron.push(ITENS[valor]);
        if(quantity === numberIngredients - 1){
            let fullCauldron = this.pluck(this.cauldron, "id");
            this.animations.removeAnimations();
            setTimeout(() =>{this.audio.tremor()}, 50);
            setTimeout(() =>{this.animations.finishedPotion()}, 50);
            RequestSys.post("recipe", 
            fullCauldron,
            data => 
            {
                this.crafing(data);
            },
            error => 
            {
                console.log("Redirecionando para o login");
                window.location.replace(`../menu`);
            },
            document.cookie.replace("userData=", ""));
            this.cauldron = [];
        }
        return false;
    }

    /* Gerencia as animações da criação de poção */
    crafing(data){
        
        if(data !== 1){
            $("#score").html(data.points);
            setTimeout(() => {this.animations.mageVictory()}, 1000);
            setTimeout(() => {this.animations.potionShine()}, 1000);
            setTimeout(() => {this.audio.potionSfx()}, 2000);
            setTimeout(() => {this.victory()} , 3500);
            return true;
        }
        else{
            setTimeout(() => {this.animations.mageDefeat()}, 700);
            setTimeout(() => {this.audio.wrongSfx()}, 1000);
            setTimeout(() => {this.lifeCount()}, 2300);
        }
    }

    /* Devolve as vidas ao jogador e volta ele para a primeira fase */
    resetGame(){
        RequestSys.post("reset", 
        {},
        data => 
        {
            this.lives = data.lives;
            $("#score").html(data.points);
            //console.log(data);
        },
        error => 
        {
            console.log("Erro: " + error);
        },
        {params:document.cookie.replace("userData=", "")}
    );

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

    /* Pega as informações iniciais do jogador */
    getStartInfo(){
        RequestSys.get("user", 
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
                window.location.replace(`../menu`);

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
        this.timeControl = setInterval(() =>{this.gameTimer()}, 1000);
    };

    /* Pausa o jogo */
    pauseGame(){
        this.gamePaused = true;
        this.animations.removeAnimations();
        $("main").addClass("blur");
        $("#play").fadeIn("slow");
        this.audio.music.pause();
        clearInterval(this.timeControl);
    };
}

export { SoundSys, Animations, GameFunctions };