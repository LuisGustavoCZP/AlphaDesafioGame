let idBtn ;
let login = false;
let username;

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
        
            const status = callFetch(username,password, "newuser");
            if(status == 1 ){//already exists 
                loginUser(username, password);
            } else if(status == 0){ //New user created
                loginUser(username, password);
                //console.log(status)
                // login = true;
                //window.location.replace("https://dunas-lopiin.github.io/jogo/prototipo/jogo/");
            } else {
                console.log(status);
            }
        } else {
            alert("O nome precisa ser mais de 2 caracteres!");
        }
    } else {
        loginUser(username, password);
    }
       
});

async function callFetch(user, pass, route){
    const response = await fetch(`http://vacsina.servegame.com:8000/${route}`, {
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
            } else if(status == 0){
                login = true;
                window.location.replace("../game");
            } else {
                console.log(status);
            }
    
        })
        .catch(function (error) {
            //console.log('Request failed', error);
            console.log(error);
        });
}

function loginUser(username, password){
    callFetch(username,password, "login");
    //console.log("Meu status: " + status)
   
}