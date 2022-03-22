import { RequestSys } from "../scripts/request.js";

let idBtn ;
let login = false;
let username;
let password;
$(document).ready(function() {


$("main").on("click", (e) => {
    const btn = e.target.id; //btn-XXXX
    idBtn = btn.split("-")[1]; //Only XXXX
    if(btn === "btn-play"){
        if (login){
            alert("Olá " + username);
            //Go to the game
            window.location.replace("../game");
        }else {
            $(`#playModal`).css("display","block");
        }
    } else if(btn === "btn-ranking"){
        // const ranking = [{name: "Lucas", points: 320}, {name:"Julia", points: 330}, {name: "Carlos", points: 200}]
         insertRanking();
         $(`#rankingModal`).css("display","block");
     } else if(btn === `btn-${idBtn}`){
        $(`#${idBtn}Modal`).css("display","block");
    }
   
});

$(".close").on("click", function() {
    $(`#${idBtn}Modal`).css("display","none");
});



let loginRegister = true;
//login e senha
$("#lbl-login-register").on("click", () =>{
   if(loginRegister){
        $("#title-login-register").html("Cadastro");
        $("#lbl-login-register").html("Fazer Login");
        loginRegister = false;
   }else{
        $("#title-login-register").html("Login");
        $("#lbl-login-register").html("Crie uma conta");
        loginRegister = true;
   }
  
});

//btn to Play the game
$("#btn-login").on("click", () => {
    username = $("#username").val();
    password = $("#password").val();

    if(!loginRegister){
        if(username.length >= 3 || password.length >= 3){
            $(`#playModal`).css("display","none");
        
            callFetchNewUser(username,password);
           /* if(status == 1 ){//already exists 
                loginUser(username, password);
            } else if(status == 0){ //New user created
                loginUser(username, password);
                //console.log(status)
                // login = true;
                //window.location.replace("https://dunas-lopiin.github.io/jogo/prototipo/jogo/");
            } else {
                console.log(status);
            }*/
        } else {
            alert("O nome precisa ser mais de 2 caracteres!");
        }
    } else {
        callFetchLogin(username, password);
    }
});


// Ranking Table
async function insertRanking(){
    let ranking = [];
    const response = await fetch(`${RequestSys.URL()}ranking/5`, {
        method: 'GET'})
        .then((resp) => resp.json())
        .then(function (data) {
            ranking = data;
            console.log(data)
            
        })
        .catch(function (error) {
            //console.log('RequestSys failed', error);
            console.log(error);
        });
   
    $("table").remove();

    $(".ranking-table").append(`<table></table>`);
    
    $("table").append(` <tr id="title">
                            <th>Nome</th>
                            <th>Pontos</th>
                        </tr>`);
    ranking.forEach((element,index) => {
        $("table").append(` <tr id="place-${index+1}">
                                <td>${element.name}</td>
                                <td>${element.highscore}</td>
                            </tr>`);
        
    });
}



});
async function callFetchNewUser(user, pass,){
    const response = await fetch(`${RequestSys.URL()}newuser`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: `{
                "user": "${user}",
                "pass": "${pass}" 
          }`})
        .then((resp) => resp.json())
        .then(function (data) {
            const status = data;
            console.log(data)
            if(status == 1 ){//already exists 
                callFetchLogin(username, password);
            } else if(status == 0){ //New user created
                callFetchLogin(username, password);
                //console.log(status)
                // login = true;
                //window.location.replace("https://dunas-lopiin.github.io/jogo/prototipo/jogo/");
            }/* else {
                console.log(status);
            }*/
    
        })
        .catch(function (error) {
            //console.log('RequestSys failed', error);
            console.log(error);
        });
}



async function callFetchLogin(user, pass){
    const response = await fetch(`${RequestSys.URL()}login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: `{
                "user": "${user}",
                "pass": "${pass}" 
          }`})
        .then((resp) => resp.json())
        .then(function (data) {
            const status = data;
            console.log(data)
            if(status == 1 || status == 2 ){
                alert("Login ou Senha invalidos!");
            } 
            else/*  if(status == 0) */
            {
                login = true;
                document.cookie = `userData=${data.userData}; SameSite=None; Secure;path=/`; //;domain=localhost:8080
                window.location.replace("../game");
            }/*  else {
                console.log(status);
            } */
    
        })
        .catch(function (error) {
            //console.log('RequestSys failed', error);
            console.log(error);
        });
}

/*function loginUser(username, password){
    callFetch(username, password, "login");
    //console.log("Meu status: " + status)
   
}*/